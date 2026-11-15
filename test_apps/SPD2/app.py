"""SPD2 entry point: serves presentation/ and the model API.

    /api/datasets                  the datasets, as [{id, name, credit}]
    /api/model?id=<id>             one dataset's model
    /api/overview?id=<id>          the dialog's opening events: the dataset's state before any run
    /api/derivation?id=<id>&i=<i>  project i's process, derived from its selection, with its carried arcs
    /api/delivery?id=<id>&i=<i>    project i's process and delivery so far: its records, who executed
                                   each job, when each step started and finished, and, while in
                                   progress, who holds each contract
    /api/experience?id=<id>        each agent's experience so far at each step, {agent: {step: {measure:
                                   amount}}}, measured as eligibility reads it
    /api/running?id=<id>           the project in progress, if any
    /api/draw?id=<id>&i=<i>        a random selection the world draws for new project i, for Autoplay
    /api/measures?id=<id>          how the forecasts held, project by project, and the eligible pools
    /api/evaluation?id=<id>        the forecasting test over the recorded projects: each held out and
                                   forecast from the others, by the model and by a whole-project baseline
    /api/story?id=<id>             the story of the projects run: the series in brief, then each project
    /api/project?id=<id>&i=<i>&r=<r>   project i of a dataset, read at the r-percentile (default 0.8)
    /api/replay?id=<id>&i=<i>&r=<r>    past project i as a run to play back from its records, against its
                                   forecast at r, with each agent's experience without it; nothing is written
    POST /api/build?id=<id>        a project's selection as it stands, new or grown while in progress:
                                   its derivation, offer and state, and the steps it adds too late
    POST /api/step?id=<id>         executes the project's next wave of steps, starting it if new
    POST /api/play?id=<id>         executes every step the project has left, to delivery
    POST /api/delete?id=<id>&i=<i> removes project i, its selection, its records and its run

    Step and play return who took each contract, the delivery so far, the steps executed now and
    whether the project is delivered; an extension that adds steps too late is refused with 409 and
    those steps, {late}.

Usage:
    py app.py [port]       then open http://localhost:8000
"""

import json
import os
import subprocess
import sys
import threading
import time
from dataclasses import fields, is_dataclass
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

import business
from simulation import run
from business.structure.derivation import carried, leaving
from simulation.builder import change
from simulation.events import text
from simulation.evaluation import evaluation
from simulation.measures import measures
from simulation.overview import overview
from simulation.replay import replay
from simulation.story import story

PRESENTATION = Path(__file__).resolve().parent / "presentation"


def plain(obj):
    """The model's objects as plain JSON: classes as their fields, sets as sorted lists. Leaves out what
       JSON cannot hold, such as the operators' functions."""
    if is_dataclass(obj):
        return {f.name: plain(getattr(obj, f.name)) for f in fields(obj) if not callable(getattr(obj, f.name))}
    if isinstance(obj, dict):
        return {str(k): plain(v) for k, v in obj.items()}
    if isinstance(obj, (set, frozenset)):
        return [plain(x) for x in sorted(obj, key=str)]
    if isinstance(obj, (list, tuple)):
        return [plain(x) for x in obj]
    return obj


def model_json(dataset):
    """A dataset's model for the page, each arc with its basis where the dataset's file gives one: "data"
       where the source links the steps, "reasoned" where an importer added the arc. The model does not
       read it; it is the data's provenance, for the page to show."""
    M = plain(business.load_model(dataset))
    path = business.dataset_dir(dataset) / "master_process.json"
    arcs = business.read(path)["arcs"]
    for arc, given in zip(M["G"]["arcs"], arcs):
        if "basis" in given:
            arc["basis"] = given["basis"]
    return M


def events_json(log):
    """A run's events for the dialog, each with its message filled in."""
    return [{"kind": e.kind, "text": text(e), "refs": e.refs, "params": plain(e.params)} for e in log]


def process_json(process, G):
    """A project's process, with the arcs carrying its products between its steps and those leaving the
       process, each by its index in G's arcs."""
    index = lambda arcs: [k for k, a in enumerate(G.arcs) if id(a) in {id(b) for b in arcs}]
    return {**plain(process), "carried": index(carried(process, G)), "leaving": index(leaving(process, G))}


def built(dataset, process, offered, log):
    """A project as built or run: its process, its offer (None until complete) and its events."""
    offer = None if offered is None else {
        "forecasts": plain(offered.forecasts), "values": plain(offered.value),
        "contracts": plain(offered.contracts), "eligible": plain(offered.eligible)}
    G = business.load_model(dataset)["G"]
    return {"process": process_json(process, G), "offer": offer, "events": events_json(log)}


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        url = urlsplit(self.path)
        query = {k: v[0] for k, v in parse_qs(url.query).items()}
        try:
            if url.path == "/api/datasets":
                self.send_json(business.list_datasets())
            elif url.path == "/api/model":
                self.send_json(model_json(query.get("id", "")))
            elif url.path == "/api/overview":
                dataset = query.get("id", "")
                log = overview(business.load_model(dataset), business.dataset_info(dataset))
                self.send_json(events_json(log))
            elif url.path == "/api/derivation":
                dataset = query.get("id", "")
                process = business.load_derivation(dataset, query.get("i", ""))
                self.send_json(process_json(process, business.load_model(dataset)["G"]))
            elif url.path == "/api/delivery":
                dataset = query.get("id", "")
                M = business.load_model(dataset)
                i = query.get("i", "")
                self.send_json({"process": process_json(business.load_derivation(dataset, i), M["G"]),
                                "delivery": plain(business.delivered(M, i)),
                                "taken": run.holders(dataset, i)})
            elif url.path == "/api/experience":
                self.send_json(business.experience(business.load_model(query.get("id", ""))))
            elif url.path == "/api/measures":
                self.send_json(measures(query.get("id", "")))
            elif url.path == "/api/evaluation":
                self.send_json(evaluation(query.get("id", "")))
            elif url.path == "/api/story":
                self.send_json(story(query.get("id", "")))
            elif url.path == "/api/draw":
                self.send_json(run.draw(query.get("id", ""), query.get("i", "")))
            elif url.path == "/api/running":
                self.send_json({"project": run.in_progress(query.get("id", ""))})
            elif url.path == "/api/replay":
                dataset = query.get("id", "")
                process, offered, taken, agents, delivered, executed, log, before = replay(
                    dataset, query.get("i", ""), float(query.get("r", 0.8)))
                self.send_json({**built(dataset, process, offered, log), "taken": taken, "agents": agents,
                                "delivery": plain(delivered), "executed": executed, "done": True,
                                "experience": before})
            elif url.path == "/api/project":
                r = float(query.get("r", 0.8))
                self.send_json(plain(business.load_project(query.get("id", ""), query.get("i", ""), r)))
            else:
                super().do_GET()
        except KeyError as missing:
            self.send_error(404, f"not found: {missing}")
        except ValueError as problem:
            self.send_error(422, str(problem))

    def do_POST(self):
        url = urlsplit(self.path)
        query = {k: v[0] for k, v in parse_qs(url.query).items()}
        body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        try:
            dataset = query.get("id", "")
            if url.path == "/api/build":
                # A new project's selection as it now stands: {selection, project, r}
                M = business.load_model(dataset)
                selection, project = body["selection"], body["project"]
                self.send_json({**built(dataset, *change(M, selection, project, float(body.get("r", 0.8)))),
                                "late": run.late_steps(M, dataset, selection, project)})
            elif url.path == "/api/delete":
                run.delete(dataset, query.get("i", ""))
                self.send_json({})
            elif url.path in ("/api/step", "/api/play"):
                # Executes the project's next wave, or all it has left: {selection, project, r, open},
                # open keeping it in progress for a selection still to grow
                process, offered, taken, delivered, executed, done, log = run.advance(
                    dataset, body["selection"], body["project"], float(body.get("r", 0.8)),
                    to_end=url.path == "/api/play", keep_open=bool(body.get("open")))
                self.send_json({**built(dataset, process, offered, log),
                                "taken": {j: t.agent for j, t in taken.items()},
                                "delivery": plain(delivered), "executed": executed, "done": done})
            else:
                self.send_error(404, "no such endpoint")
        except run.Late as refused:
            self.send_json({"late": refused.steps, "message": str(refused)}, status=409)
        except KeyError as missing:
            self.send_error(404, f"not found: {missing}")
        except ValueError as problem:
            self.send_error(422, str(problem))

    def end_headers(self):
        # The page's files are checked with the server on every load, so an edit shows without a hard reload
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def send_json(self, obj, status=200):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def restart_on_change(server):
    """Restarts the server when any of its Python files change, so it never serves stale code: frees
       the port, starts a fresh copy, and exits."""
    root = Path(__file__).resolve().parent
    stamp = lambda: {p: p.stat().st_mtime for p in root.rglob("*.py")}
    before = stamp()
    while True:
        time.sleep(1)
        if stamp() != before:
            print("Python files changed: restarting")
            server.server_close()
            subprocess.Popen([sys.executable, *sys.argv])
            os._exit(0)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("", port), partial(Handler, directory=str(PRESENTATION)))
    threading.Thread(target=restart_on_change, args=(server,), daemon=True).start()
    print(f"SPD2 running at http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
