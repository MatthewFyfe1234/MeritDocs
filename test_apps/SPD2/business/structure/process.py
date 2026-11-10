"""The master process G = (N_s, A_sp), its products, and the job grouping J."""

from dataclasses import dataclass

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
    """A measured quantity m shared across the master process, numerical or categorical. Its values y
       are recorded in the trace, against the step executed."""
    name: str
    kind: str                                    # "numerical" or "categorical"


@dataclass(frozen=True)
class Arc:
    """One arc e of A_sp: carries a product from src(e) to tgt(e), either possibly OUTSIDE."""
    product: str
    src: str | None
    tgt: str | None


@dataclass
class MasterProcess:
    """G = (N_s, A_sp): an acyclic directed graph of steps N_s and the step products A_sp between them."""
    steps: dict                                  # N_s, each step by its id
    arcs: set                                    # A_sp
    metrics: dict                                # the metrics, each by its name
    jobs: dict                                   # N_j, each job by its id


# --------------------------------------------------------------------------------------------------


def read_master_process(data):
    """Builds G from its JSON form, {jobs: [{id, name}], steps: [{id, name, job}], arcs: [{product, src,
       tgt}], metrics: [{name, kind}]}, with src or tgt null for OUTSIDE."""
    jobs = {item["id"]: Job(item["id"], item["name"]) for item in data["jobs"]}

    steps = {}
    for item in data["steps"]:
        if item["id"] in steps:
            raise ValueError(f"step {item['id']!r} appears twice")
        if item["job"] not in jobs:
            raise ValueError(f"step {item['id']!r}: {item['job']!r} is not a job")
        steps[item["id"]] = Step(item["id"], item["name"], item["job"])

    metrics = {}
    for item in data.get("metrics", []):
        if item["kind"] not in ("numerical", "categorical"):
            raise ValueError(f"metric {item['name']!r}: a metric is numerical or categorical")
        metrics[item["name"]] = Metric(item["name"], item["kind"])

    arcs = {Arc(a["product"], a["src"], a["tgt"]) for a in data["arcs"]}
    for e in arcs:
        if e.src is OUTSIDE and e.tgt is OUTSIDE:
            raise ValueError(f"product {e.product!r} runs from outside to outside")
        for end in (e.src, e.tgt):
            if end is not OUTSIDE and end not in steps:
                raise ValueError(f"product {e.product!r}: {end!r} is not a step")

    # Acyclic: repeatedly remove steps with no arc arriving from a remaining step
    remaining = set(steps)
    while remaining:
        free = {s for s in remaining if not any(e.tgt == s and e.src in remaining for e in arcs)}
        if not free:
            raise ValueError(f"G must be acyclic: a cycle runs through {sorted(remaining)}")
        remaining -= free

    return MasterProcess(steps, arcs, metrics, jobs)
