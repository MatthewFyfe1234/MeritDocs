"""The master specification T = (N, A), its nodes' descriptors, and a project's selection P."""

from dataclasses import dataclass, field


@dataclass
class Descriptor:
    """An attribute attached to a node, numerical or categorical. Its value is bound on an instance."""
    name: str
    kind: str                                    # "numerical" or "categorical"


@dataclass
class Node:
    """An element or feature of what a project can deliver: one node of N."""
    id: str
    name: str
    descriptors: list = field(default_factory=list)  # D = (d_1, ..., d_k)


@dataclass
class MasterSpecification:
    """T = (N, A): a rooted tree of nodes N joined by parent-child relations A."""
    root: str
    nodes: dict                                  # N, each node by its id
    relations: set                               # A, each as (parent id, child id)


@dataclass
class Instance:
    """A node instance x-hat: one selection of node x, with its descriptors bound to values."""
    id: str
    node: str                                    # x
    parent: str | None                           # the instance it sits under; None for the root's
    values: dict                                 # {descriptor name: value}


@dataclass
class Selection:
    """T-hat: a tree of node instances, each under an instance of its node's parent, up to a single
       instance of the root."""
    root: str
    instances: dict                              # each instance by its id


# --------------------------------------------------------------------------------------------------


def read_master_specification(tree):
    """Builds T from its nested JSON form, each node {id, name, descriptors, children}, each descriptor
       {name, kind}.

       Other fields a dataset's JSON may carry, such as a node's steps (the mapping), are left to their
       own definitions."""
    nodes, relations = {}, set()

    def add(item, parent):
        if item["id"] in nodes:
            raise ValueError(f"node {item['id']!r} appears twice: T must be a tree")
        descriptors = [Descriptor(d["name"], d["kind"]) for d in item.get("descriptors", [])]
        if any(d.kind not in ("numerical", "categorical") for d in descriptors):
            raise ValueError(f"node {item['id']!r}: a descriptor is numerical or categorical")
        nodes[item["id"]] = Node(item["id"], item["name"], descriptors)
        if parent is not None:
            relations.add((parent, item["id"]))
        for child in item.get("children", []):
            add(child, item["id"])

    add(tree, None)
    return MasterSpecification(tree["id"], nodes, relations)


def read_selection(tree, T):
    """Builds T-hat from its nested JSON form, each instance {id, node, values, children}, against T.

       The top instance must be of T's root, and each instance's node a child in T of its parent
       instance's node. Every descriptor of an instance's node must be bound, a numerical one to a
       number, and no other."""
    parent_of = {c: p for p, c in T.relations}
    instances = {}

    def add(item, parent):
        i, x = item["id"], item["node"]
        if i in instances:
            raise ValueError(f"instance {i!r} appears twice")
        if x not in T.nodes:
            raise ValueError(f"instance {i!r}: {x!r} is not a node of T")
        expected = instances[parent].node if parent is not None else None
        if parent_of.get(x) != expected:
            raise ValueError(f"instance {i!r}: {x!r} must sit under an instance of its node's parent")
        values = item.get("values", {})
        names = {d.name for d in T.nodes[x].descriptors}
        if set(values) != names:
            raise ValueError(f"instance {i!r}: must bind exactly the descriptors {sorted(names)}")
        for d in T.nodes[x].descriptors:
            if d.kind == "numerical" and not isinstance(values[d.name], (int, float)):
                raise ValueError(f"instance {i!r}: descriptor {d.name!r} is numerical")
        instances[i] = Instance(i, x, parent, values)
        for child in item.get("children", []):
            add(child, i)

    add(tree, None)
    return Selection(tree["id"], instances)
