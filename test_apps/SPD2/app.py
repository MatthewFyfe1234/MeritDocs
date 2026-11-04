"""SPD2 entry point: serves presentation/ and the model API.

    /api/datasets          the datasets, as [{id, name}]
    /api/model?id=<id>     one dataset's model

Usage:
    python app.py [port]      then open http://localhost:8000
"""

import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

import business

PRESENTATION = Path(__file__).resolve().parent / "presentation"


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        url = urlsplit(self.path)
        if url.path == "/api/datasets":
            self.send_json(business.list_datasets())
        elif url.path == "/api/model":
            try:
                self.send_json(business.load_model(parse_qs(url.query).get("id", [""])[0]))
            except KeyError:
                self.send_error(404, "no such dataset")
        else:
            super().do_GET()

    def send_json(self, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("", port), partial(Handler, directory=str(PRESENTATION)))
    print(f"SPD2 running at http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
