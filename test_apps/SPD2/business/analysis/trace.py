"""The trace: execution records (i, s, t, a, g, w, m, y)."""

from dataclasses import dataclass

UNRECORDED = None                                # the paper's bottom: a field that went unrecorded


@dataclass
class Record:
    """One execution record: one metric's value at a step executed in a project."""
    project: str                                 # i
    step: str                                    # s
    time: str | None                             # t
    agents: set | None                           # a, the agents that executed it
    tools: set | None                            # g, the tools they drew on
    materials: set | None                        # w, the materials they drew on
    metric: str                                  # m
    value: object                                # y


# --------------------------------------------------------------------------------------------------


def read_trace(data):
    """Builds the trace from its JSON form, [{project, step, time, agents, tools, materials, metric,
       value}].

       Project, step, metric and value are always recorded; any other field may be null (UNRECORDED),
       as distinct from an empty list, which records that none were used. Kept as a list: two
       identical records are two records."""
    ids = lambda r, field: UNRECORDED if r.get(field) is None else set(r[field])
    return [Record(r["project"], r["step"], r.get("time"), ids(r, "agents"), ids(r, "tools"),
                   ids(r, "materials"), r["metric"], r["value"]) for r in data]
