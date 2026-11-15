"""The master specification T = (N, A), its nodes' descriptors, and a project's selection T-hat."""

from dataclasses import dataclass, field


@dataclass
class Descriptor:
    """An attribute attached to a node, numerical or categorical. Its value is bound on an instance."""
    name: str
    kind: str                                    # "numerical" or "categorical"
    range: list | None = None                    # [low, high] a new selection's value must lie in, if set
                                                 # (numerical only)


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
    """T-hat: a forest of node instances, each of its trees an instance of a subtree of T containing its
       root, in which a node may be instanced any number of times."""
    roots: list                                  # the id of each tree's instance of T's root
    instances: dict                              # each instance by its id


# --------------------------------------------------------------------------------------------------


def read_master_specification(tree):
    """Builds T from its nested JSON form, each node {id, name, descriptors, children}, each descriptor
       {name, kind, range}, range optional.

       Other fields a dataset's JSON may carry, such as a node's steps (the mapping), are left to their
       own definitions."""
    nodes, relations = {}, set()

    def add(item, parent):
        descriptors = [Descriptor(d["name"], d["kind"], d.get("range")) for d in item.get("descriptors", [])]
        nodes[item["id"]] = Node(item["id"], item["name"], descriptors)
        if parent is not None:
            relations.add((parent, item["id"]))
        for child in item.get("children", []):
            add(child, item["id"])

    add(tree, None)
    return MasterSpecification(tree["id"], nodes, relations)


def trees(forest):
    """The trees of a selection's JSON form: a list of trees, or a single tree on its own."""
    return forest if isinstance(forest, list) else [forest]


def unbound(S, T):
    """The instances of S whose node's descriptors are not all bound to values. A selection is complete,
       and can be offered, once there are none."""
    return [x for x in S.instances.values() if set(x.values) != {d.name for d in T.nodes[x.node].descriptors}]


def read_selection(forest):
    """Builds T-hat from its nested JSON form, a list of trees (or a single tree), each instance {id,
       node, values, children}."""
    instances = {}

    def add(item, parent):
        i = item["id"]
        instances[i] = Instance(i, item["node"], parent, item.get("values", {}))
        for child in item.get("children", []):
            add(child, i)

    for tree in trees(forest):
        add(tree, None)
    return Selection([tree["id"] for tree in trees(forest)], instances)
