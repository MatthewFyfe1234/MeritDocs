"""The mapping mu: each spec node to the steps it necessitates."""

from dataclasses import dataclass


@dataclass
class Mapping:
    """mu : N -> 2^N_s, deterministic: a given node always necessitates the same steps."""
    steps: dict                                  # each node's id to the set of ids of steps it necessitates


# --------------------------------------------------------------------------------------------------


def read_mapping(tree):
    """Builds mu from the nested JSON form of the master specification, each node listing its steps, an
       empty set where it lists none."""
    steps = {}

    def add(item):
        steps[item["id"]] = set(item.get("steps", []))
        for child in item.get("children", []):
            add(child)

    add(tree)
    return Mapping(steps)
