"""The mapping mu: each spec node to the steps it necessitates."""

from dataclasses import dataclass


@dataclass
class Mapping:
    """mu : N -> 2^N_s, deterministic: a given node always necessitates the same steps."""
    steps: dict                                  # each node's id to the set of ids of steps it necessitates


# --------------------------------------------------------------------------------------------------


def read_mapping(tree, T, G):
    """Builds mu from the nested JSON form of the master specification, each node listing its steps.

       T is the master specification and G the master process. Every node of T gets a set, empty where
       it lists none; every step named must be in G."""
    steps = {}

    def add(item):
        steps[item["id"]] = set(item.get("steps", []))
        for child in item.get("children", []):
            add(child)

    add(tree)
    for n, ss in steps.items():
        for s in ss - set(G.steps):
            raise ValueError(f"node {n!r}: {s!r} is not a step")
    if set(steps) != set(T.nodes):
        raise ValueError("the mapping must cover exactly the nodes of T")
    return Mapping(steps)
