"""The dialog's messages, one template per kind of event, in plain words. Each {name} is filled from the
   event's parameters. The dialog shows the current state only: the dataset's when no project is shown,
   the project's while one is selected or run. A run's events, in order, will make up its story."""

MESSAGES = {
    # The state with no project shown: the dataset's (a heading, then its lines)
    "dataset":        "{name}",
    "idle":           "No project shown.",
    "master":         "Master: {nodes}, {descriptors} · {steps} in {jobs} · {products} · metrics {metrics}",
    "resources":      "Agents: {agents} · tools: {tools} · materials: {materials}",
    "inputs":         "Floors: {floors} · credited: {credited} · given forecasts: {given}",
    "trace":          "Trace: {records} records from {projects} projects",
    "empty trace":    "Trace: empty",

    # The state of a project being selected, or run (a heading, then its lines)
    "project":        "Project {project} · being selected",
    "played":         "Project {project} · run",
    "replayed":       "Project {project} · replayed from its records, forecast from the other projects",
    "nodes":          "Nodes: {nodes}",
    "steps":          "Steps: {steps}",
    "forecast":       "Forecast at r {r}: {values}",
    "awaiting values": "Forecast waits for the descriptor values of {nodes}",

    # A run, its events in order making up its story (drafts, used when runs are built)
    "offered":        "{job}'s contract is offered to {eligible}.",
    "taken":          "{agent} takes {job}'s contract.",
    "handed over":    "{job}'s contract passes from {before} to {after}: {before} is not eligible at the steps added.",
    "took over":      "{after} takes over {job} from {before}, as recorded.",
    "executed":       "{agent} executes {step}.",
    "recorded":       "{step}: {metric} {actual}, against {forecast} forecast.",
    "delivered":      "Project {project} is delivered: {metric} {actual}, against {forecast} forecast.",
    "credited":       "{agent} gains experience at {step}.",
    "extended":       "The selection grows: {node} is added, adding {steps}.",
}
