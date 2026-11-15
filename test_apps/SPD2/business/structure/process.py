"""The master process G = (N_s, A_sp), its products, and the job grouping J."""

import ast
from dataclasses import dataclass
from types import SimpleNamespace

OUTSIDE = None                                   # the star: source or target outside the process


@dataclass
class Step:
    """A possible step of delivery: one step s of N_s."""
    id: str
    name: str
    job: str                                     # J(s), the id of its job


@dataclass
class Job:
    """The steps one trade or role performs, its skillset: one job of N_j."""
    id: str
    name: str


@dataclass
class Metric:
    """A measured quantity m shared across the master process, numerical or categorical. A step's values
       y are recorded in the trace, against the step executed, and a product's are given by a function
       of descriptors."""
    name: str
    kind: str                                    # "numerical" or "categorical"
    steps: set | None = None                     # the steps it is measured at, None for every step
    depends: str | None = None                   # the metric it depends on during execution, whose value
                                                 # at the step joins the descriptors in its fit, as a fall
                                                 # in blood pressure on the dose given


@dataclass
class Arc:
    """One arc e of A_sp: carries a product from src(e) to tgt(e), either possibly OUTSIDE."""
    product: str
    src: str | None
    tgt: str | None
    formulas: dict                               # {metric name: the function of descriptors giving y_m(e)}


@dataclass
class MasterProcess:
    """G = (N_s, A_sp): an acyclic directed graph of steps N_s and the step products A_sp between them."""
    steps: dict                                  # N_s, each step by its id
    arcs: list                                   # A_sp
    metrics: dict                                # the metrics, each by its name
    jobs: dict                                   # N_j, each job by its id


# --------------------------------------------------------------------------------------------------


def read_master_process(data):
    """Builds G from its JSON form, {jobs: [{id, name}], steps: [{id, name, job}], arcs: [{product, src,
       tgt, formulas}], metrics: [{name, kind, steps, depends}]}, with src or tgt null for OUTSIDE, and
       formulas, a metric's steps and what it depends on optional."""
    jobs = {item["id"]: Job(item["id"], item["name"]) for item in data["jobs"]}
    steps = {item["id"]: Step(item["id"], item["name"], item["job"]) for item in data["steps"]}
    metrics = {item["name"]: Metric(item["name"], item["kind"],
                                    set(item["steps"]) if "steps" in item else None, item.get("depends"))
               for item in data.get("metrics", [])}
    arcs = [Arc(a["product"], a["src"], a["tgt"], a.get("formulas", {})) for a in data["arcs"]]
    return MasterProcess(steps, arcs, metrics, jobs)


# A formula is arithmetic over descriptors, each named alone, d, where only one node at the step has a
# descriptor of that name, or with its node, x.d. These functions combine a list of values, a single
# value counting as a list of one
as_list = lambda v: v if isinstance(v, list) else [v]
FUNCTIONS = {"max": lambda v: max(as_list(v)), "min": lambda v: min(as_list(v)),
             "sum": lambda v: sum(as_list(v)), "len": lambda v: len(as_list(v))}


def formula_names(formula):
    """The descriptors a formula reads, each as (node id, descriptor name): one named alone, d, as
       (None, d), and one named with its node, x.d, as (x, d)."""
    tree = ast.parse(formula, mode="eval")
    qualified = [n for n in ast.walk(tree) if isinstance(n, ast.Attribute)]
    nodes = {id(n.value) for n in qualified}
    return ({(n.value.id, n.attr) for n in qualified}
            | {(None, n.id) for n in ast.walk(tree)
               if isinstance(n, ast.Name) and n.id not in FUNCTIONS and id(n) not in nodes})


def evaluate(formula, D):
    """A formula evaluated at descriptor values D, {(node id, descriptor name): list of values}, a
       value for each instance that binds it, a single value given alone. None where a descriptor it
       reads is not bound in D. The formula is taken to be only arithmetic, as checks.check_formula
       ensures on loading."""
    values = {}
    for x, d in formula_names(formula):
        found = [v for (y, name), v in D.items() if name == d and x in (None, y)]
        if len(found) != 1:
            return None
        value = found[0][0] if len(found[0]) == 1 else found[0]
        if x is None:
            values[d] = value
        else:
            setattr(values.setdefault(x, SimpleNamespace()), d, value)
    return eval(formula, {"__builtins__": {}, **FUNCTIONS}, values)
