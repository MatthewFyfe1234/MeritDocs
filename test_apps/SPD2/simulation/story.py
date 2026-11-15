"""The story of the projects the simulation has run, in plain words: the series in brief, saying what the
   measures show, then an account of each project in the order run, from what the ledger noted of it
   (its forecasts and events) and what the trace recorded."""

import business
from simulation.measures import measures
from simulation.run import ledger


def figure(y):
    """A value as the story gives it: two decimal places at most."""
    return f"{round(y, 2):g}"


def percent(x):
    return f"{round(100 * x)}%"


def agents_list(names):
    return names[0] if len(names) == 1 else ", ".join(names[:-1]) + " and " + names[-1]


def story(dataset_id):
    """The story, {summary: [sentences], projects: [{project, lines: [sentences]}]}, latest last."""
    M = business.load_model(dataset_id)
    G, T = M["G"], M["T"]
    found = measures(dataset_id)
    book = ledger(dataset_id)
    job = lambda j: G.jobs[j].name
    told, previous = [], None
    for row in found["projects"]:
        i, entry = row["project"], book[row["project"]]
        lines = []

        # What was selected, and what was forecast for it
        chosen = []
        for x in M["selections"][i].instances.values():
            values = ", ".join(f"{d} = {figure(v)}" for d, v in x.values.items())
            chosen.append(T.nodes[x.node].name + (f" ({values})" if values else ""))
        lines.append(f"{i} selected {', '.join(chosen)}.")
        forecast = "; ".join(f"{m} {figure(v['r'])} at r {row['r']}, {figure(v['median'])} at the median"
                             for m, v in entry["value"].items() if v.get("r") is not None)
        if forecast:
            lines.append(f"Its forecast: {forecast}.")

        # Contracts and extensions, in the order they happened, those of a kind together
        taken, grew = [], []
        def flush():
            if taken:
                lines.append(agents_list(taken) + ".")
                taken.clear()
            if grew:
                lines.append(f"The selection then grew, adding {agents_list(grew)}.")
                grew.clear()
        for e in entry["events"]:
            p = e["params"]
            if e["kind"] == "taken":
                if grew:
                    flush()
                taken.append(f"{p['agent']} took {p['job']}'s contract")
            elif e["kind"] == "extended":
                if taken:
                    flush()
                grew.append(f"{p['node']} ({p['steps']})")
            elif e["kind"] == "handed over":
                flush()
                lines.append(f"{p['job']}'s contract passed from {p['before']} to {p['after']}, "
                             f"{p['before']} not being eligible at the steps added.")
        flush()

        # How the steps went against their forecasts
        if row["steps"]:
            if row["over"]:
                named = agents_list([f"{o['step']} ({o['metric']} {figure(o['actual'])} against "
                                     f"{figure(o['forecast'])})" for o in row["over"]])
                lines.append(f"Of its {row['steps']} steps, {row['overruns']} exceeded the forecast at r: {named}.")
            else:
                lines.append(f"None of its {row['steps']} steps exceeded the forecast at r.")
        for m, v in row["value"].items():
            if v.get("r") is not None:
                within = "within" if v["actual"] <= v["r"] else "over"
                lines.append(f"It was delivered at {m} {figure(v['actual'])}, {within} its forecast of "
                             f"{figure(v['r'])}.")

        # What the agents gained
        gains = []
        for agent, steps in business.delivered(M, i).gained.items():
            totals = {}
            for amounts in steps.values():
                for m, v in amounts.items():
                    totals[m] = totals.get(m, 0) + v
            n = totals.pop("executions", 0)
            parts = [f"{n} step" + ("" if n == 1 else "s")] + [
                f"{figure(v)} in {T.nodes[m.split('.')[0]].name}'s {m.split('.')[1]}" for m, v in totals.items() if v]
            gains.append(f"{M['agents'][agent].name} {' and '.join(parts)}")
        if gains:
            lines.append("Experience gained: " + "; ".join(gains) + ".")

        # The eligible pools, where they changed since the project before
        if previous is not None:
            for j, pool in row["pools"].items():
                before = previous["pools"].get(j)
                if before is not None and set(pool) != set(before):
                    grew = "grew" if len(pool) > len(before) else "shrank" if len(pool) < len(before) else "changed"
                    lines.append(f"{job(j)}'s eligible pool {grew}, from {agents_list(before)} to "
                                 f"{agents_list(pool) if pool else 'no one'}.")
        previous = row
        told.append({"project": i, "lines": lines})
    return {"summary": in_brief(found["summary"], job), "projects": told}


def in_brief(s, job):
    """The series in brief: what the measures show, in plain sentences."""
    if s is None:
        return ["No project has been run yet. Play one, or Autoplay, and its story begins here."]
    lines = []
    many = "project" if s["projects"] == 1 else "projects"
    if s["steps"]:
        how = {"calibrated": "so the forecasts are well calibrated",
               "optimistic": "too many, so the forecasts are optimistic",
               "cautious": "too few, so the forecasts are cautious"}[s["verdict"]]
        lines.append(f"Over the {s['projects']} {many} run, {s['overruns']} of {s['steps']} steps "
                     f"({percent(s['share'])}) exceeded their forecast at r, against the {percent(s['target'])} "
                     f"that r allows: {how}. Over this many steps, chance alone could move the share by "
                     f"about {percent(s['slack'])} either way.")
    if s["projects"] >= 2 and s["error_first"] is not None and s["error_last"] is not None:
        a, b, k = s["error_first"], s["error_last"], s["window"]
        trend = "fell" if b < a * 0.9 else "rose" if b > a * 1.1 else "held steady"
        first, last = ("first project", "last") if k == 1 else (f"first {k} projects", f"last {k}")
        lines.append(f"A step's typical miss against its median forecast {trend} as the trace grew: "
                     f"{percent(a)} over the {first}, {percent(b)} over the {last}.")
    changed = [f"{job(j)}'s from {s['pool_first'][j]} to {s['pool_last'][j]}"
               for j in s["pool_first"] if s["pool_first"][j] != s["pool_last"][j]]
    if changed:
        lines.append("The eligible pools changed as agents gained experience: " + "; ".join(changed) + ".")
    elif s["projects"] >= 2:
        lines.append("No job's eligible pool changed over the series.")
    return lines
