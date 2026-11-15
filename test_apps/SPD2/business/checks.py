"""The conditions the model places on a dataset, checked once on its JSON before it is read, so that the
   model's own files can take their data as given.

   Each check raises ValueError naming what failed. check_dataset runs them all, in the order the parts
   depend on one another."""

import ast
from collections import Counter

from business.structure.process import FUNCTIONS, OUTSIDE, formula_names, read_master_process
from business.structure.specification import read_master_specification, trees

KINDS = ("numerical", "categorical")                 # the kinds of descriptor and metric
ARITHMETIC = (ast.Expression, ast.BinOp, ast.UnaryOp, ast.Load, ast.Name, ast.Attribute, ast.Constant,
              ast.Call, ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow, ast.USub, ast.UAdd)


def require(condition, message):
    """Raises ValueError with the message unless the condition holds."""
    if not condition:
        raise ValueError(message)


def once_each(ids, what):
    """Each id appears once."""
    for x, n in Counter(ids).items():
        require(n == 1, f"{what} {x!r} appears {n} times")


def nested(tree):
    """Every item of a nested JSON tree, the top one first."""
    yield tree
    for child in tree.get("children", []):
        yield from nested(child)


def check_master_specification(tree):
    """T is a tree, each node appearing once, and each descriptor is numerical or categorical, a range,
       where set, on a numerical one, from a lower number to a higher."""
    once_each([item["id"] for item in nested(tree)], "node")
    for item in nested(tree):
        for d in item.get("descriptors", []):
            where = f"node {item['id']!r}, descriptor {d['name']!r}"
            require(d["kind"] in KINDS, f"{where}: must be one of {KINDS}")
            if "range" in d:
                low_high = d["range"]
                require(d["kind"] == "numerical", f"{where}: only a numerical descriptor has a range")
                require(isinstance(low_high, list) and len(low_high) == 2
                        and all(isinstance(v, (int, float)) for v in low_high) and low_high[0] <= low_high[1],
                        f"{where}: a range is [low, high]")


def check_master_process(data):
    """Every step's job is a job, every metric is numerical or categorical, measured at steps, and
       depends, if on anything, on another numerical metric, every arc runs between steps, OUTSIDE at no
       more than one end, every formula gives a metric and is only arithmetic, and G is acyclic."""
    jobs, steps = {j["id"] for j in data["jobs"]}, {s["id"] for s in data["steps"]}
    metrics = {m["name"] for m in data.get("metrics", [])}
    once_each([s["id"] for s in data["steps"]], "step")
    for s in data["steps"]:
        require(s["job"] in jobs, f"step {s['id']!r}: {s['job']!r} is not a job")
    kinds = {m["name"]: m["kind"] for m in data.get("metrics", [])}
    for m in data.get("metrics", []):
        require(m["kind"] in KINDS, f"metric {m['name']!r}: must be one of {KINDS}")
        for s in m.get("steps", []):
            require(s in steps, f"metric {m['name']!r}: {s!r} is not a step")
        if "depends" in m:
            require(kinds.get(m["depends"]) == "numerical" and m["depends"] != m["name"],
                    f"metric {m['name']!r}: depends on {m['depends']!r}, which must be another numerical metric")
    for a in data["arcs"]:
        require(a["src"] is not OUTSIDE or a["tgt"] is not OUTSIDE,
                f"product {a['product']!r} runs from outside to outside")
        for end in (a["src"], a["tgt"]):
            require(end is OUTSIDE or end in steps, f"product {a['product']!r}: {end!r} is not a step")
        for m, formula in a.get("formulas", {}).items():
            require(m in metrics, f"product {a['product']!r}: {m!r} is not a metric")
            check_formula(formula)

    # Acyclic: repeatedly remove steps with no arc arriving from a remaining step
    remaining = set(steps)
    while remaining:
        free = {s for s in remaining if not any(a["tgt"] == s and a["src"] in remaining for a in data["arcs"])}
        require(free, f"G must be acyclic: a cycle runs through {sorted(remaining)}")
        remaining -= free


def check_formula(formula):
    """A formula is only arithmetic on numbers and descriptors, each named alone, d, or with its node,
       x.d, calling only FUNCTIONS."""
    for node in ast.walk(ast.parse(formula, mode="eval")):
        require(isinstance(node, ARITHMETIC), f"formula {formula!r}: only arithmetic is allowed")
        if isinstance(node, ast.Attribute):
            require(isinstance(node.value, ast.Name), f"formula {formula!r}: a descriptor is named d or x.d")
        if isinstance(node, ast.Call):
            require(isinstance(node.func, ast.Name) and node.func.id in FUNCTIONS and not node.keywords,
                    f"formula {formula!r}: only {sorted(FUNCTIONS)} may be called")
        if isinstance(node, ast.Constant):
            require(isinstance(node.value, (int, float)) and not isinstance(node.value, bool),
                    f"formula {formula!r}: {node.value!r} is not a number")


def check_reads(formula, s, tree, T, where):
    """A formula at step s reads only descriptors on the nodes that necessitate s and on their
       ancestors, one named alone being on exactly one of those nodes, and one named with its node on
       that node."""
    steps = {item["id"]: set(item.get("steps", [])) for item in nested(tree)}
    parent = {child: p for p, child in T.relations}
    nodes = {x for x, ss in steps.items() if s in ss}
    for x in list(nodes):
        while x in parent:
            x = parent[x]
            nodes.add(x)
    available = {(x, d.name) for x in nodes for d in T.nodes[x].descriptors}
    for x, d in formula_names(formula):
        found = [y for y, name in available if name == d and x in (None, y)]
        require(found, f"{where}: no descriptor {d if x is None else x + '.' + d!r} at step {s!r}")
        require(len(found) == 1, f"{where}: {d!r} is on {sorted(found)} at step {s!r}; name its node, x.{d}")


def check_mapping(tree, T, G):
    """Every step a node lists is a step of G, and a product's formula reads only descriptors at its
       source step, or its target for a product from outside (see check_reads)."""
    steps = {item["id"]: set(item.get("steps", [])) for item in nested(tree)}
    for x, ss in steps.items():
        require(ss <= set(G.steps), f"node {x!r}: {sorted(ss - set(G.steps))} are not steps")
    for e in G.arcs:
        s = e.tgt if e.src is OUTSIDE else e.src
        for m, formula in e.formulas.items():
            check_reads(formula, s, tree, T, f"product {e.product!r}, metric {m!r}")


def check_selection(forest, T):
    """T-hat is a forest: each tree's top instance is of T's root, each instance appears once and sits
       under an instance of its node's parent, and binds exactly its node's descriptors, a numerical one
       to a number. forest is a list of trees, or a single tree."""
    parent_of = {c: p for p, c in T.relations}
    once_each([item["id"] for tree in trees(forest) for item in nested(tree)], "instance")

    def walk(item, parent_node):
        i, x = item["id"], item["node"]
        require(x in T.nodes, f"instance {i!r}: {x!r} is not a node of T")
        require(parent_of.get(x) == parent_node, f"instance {i!r}: {x!r} must sit under an instance of its node's parent")
        values = item.get("values", {})
        names = {d.name for d in T.nodes[x].descriptors}
        require(set(values) == names, f"instance {i!r}: must bind exactly the descriptors {sorted(names)}")
        for d in T.nodes[x].descriptors:
            if d.kind == "numerical":
                require(isinstance(values[d.name], (int, float)), f"instance {i!r}: {d.name!r} is numerical")
        for child in item.get("children", []):
            walk(child, x)

    for tree in trees(forest):
        walk(tree, None)


def check_extension(before, after):
    """An extension only adds: the grown selection, after, keeps every instance of the selection before
       it, with the same node, parent and values. Both are in the nested JSON form."""
    def instances(tree):
        found = {}
        def walk(item, parent):
            found[item["id"]] = (item["node"], parent, item.get("values", {}))
            for child in item.get("children", []):
                walk(child, item["id"])
        walk(tree, None)
        return found
    grown = instances(after)
    for i, kept in instances(before).items():
        require(grown.get(i) == kept, f"instance {i!r}: an extension only adds, so it cannot be removed or changed")


def check_ranges(tree, T):
    """A new selection binds each numerical descriptor within its range, where one is set. A selection is
       taken to be coherent, the constraints enforcing this belonging to an implementation, so past
       projects are not held to it. tree is the selection in its nested JSON form."""
    for item in nested(tree):
        for d in T.nodes[item["node"]].descriptors:
            value = item.get("values", {}).get(d.name)
            if d.range is not None and isinstance(value, (int, float)):
                low, high = d.range
                require(low <= value <= high,
                        f"{T.nodes[item['node']].name}'s {d.name} must lie between {low} and {high}")


def check_resources(data, G):
    """Each agent's qualifications are jobs of G, so that Q(a) is a subset of N_j."""
    for a in data.get("agents", []):
        unknown = set(a.get("qualifications", [])) - set(G.jobs)
        require(not unknown, f"agent {a['id']!r}: {sorted(unknown)} are not jobs")


def check_trace(data, G, resources):
    """Every record names its project, step, metric and value, the step and metric are G's, a
       numerical metric's value is a number, and the agents, tools and materials it names exist."""
    known = {field: {x["id"] for x in resources.get(field, [])} for field in ("agents", "tools", "materials")}
    for r in data:
        require(None not in (r.get("project"), r.get("step"), r.get("metric"), r.get("value")),
                f"record {r}: project, step, metric and value are always recorded")
        require(r["step"] in G.steps, f"record {r}: {r['step']!r} is not a step")
        require(r["metric"] in G.metrics, f"record {r}: {r['metric']!r} is not a metric")
        if G.metrics[r["metric"]].kind == "numerical":
            require(isinstance(r["value"], (int, float)), f"record {r}: {r['metric']!r} is numerical")
        for field, ids in known.items():
            unknown = set(r.get(field) or []) - ids
            require(not unknown, f"record {r}: {sorted(unknown)} are not among the {field}")


def check_floors(data, T):
    """Each floor lambda_x is set on a node of T in one of its numerical descriptors, with a numerical
       value. data gives each floored node's {descriptor, floor} by its id."""
    for x, f in data.items():
        require(x in T.nodes, f"floor on {x!r}: not a node of T")
        kinds = {d.name: d.kind for d in T.nodes[x].descriptors}
        require(kinds.get(f["descriptor"]) == "numerical",
                f"floor on {x!r}: {f['descriptor']!r} is not a numerical descriptor of the node")
        require(isinstance(f["floor"], (int, float)), f"floor on {x!r}: the floor is a number")


def check_credited(data, G, resources):
    """Experience credited by hand names agents and steps that exist, with numerical amounts."""
    agents = {a["id"] for a in resources.get("agents", [])}
    for a, steps in data.items():
        require(a in agents, f"credited experience: {a!r} is not an agent")
        for s, n in steps.items():
            require(s in G.steps, f"credited experience of {a!r}: {s!r} is not a step")
            require(isinstance(n, (int, float)), f"credited experience of {a!r} at {s!r}: not a number")


def check_given(data, tree, T, G):
    """Given forecasts name steps and numerical metrics of G, each a number or a formula reading only
       descriptors at its step (see check_reads)."""
    for s, metrics in data.items():
        require(s in G.steps, f"given forecast: {s!r} is not a step")
        for m, y in metrics.items():
            require(m in G.metrics and G.metrics[m].kind == "numerical",
                    f"given forecast at {s!r}: {m!r} is not a numerical metric")
            if isinstance(y, str):
                check_formula(y)
                check_reads(y, s, tree, T, f"given forecast at {s!r} for {m!r}")
            else:
                require(isinstance(y, (int, float)), f"given forecast at {s!r} for {m!r}: a number or a formula")


def check_dataset(parts):
    """Runs every check on a dataset's JSON parts, {master_specification, master_process, resources,
       selections, trace, floors, credited, given}, reading each part as its checks pass, since later
       checks need it."""
    check_master_specification(parts["master_specification"])
    T = read_master_specification(parts["master_specification"])
    check_master_process(parts["master_process"])
    G = read_master_process(parts["master_process"])
    check_mapping(parts["master_specification"], T, G)
    for forest in parts.get("selections", {}).values():
        check_selection(forest, T)
    check_resources(parts.get("resources", {}), G)
    check_trace(parts.get("trace", []), G, parts.get("resources", {}))
    check_floors(parts.get("floors", {}), T)
    check_credited(parts.get("credited", {}), G, parts.get("resources", {}))
    check_given(parts.get("given", {}), parts["master_specification"], T, G)
