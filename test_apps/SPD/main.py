"""SPD entry point.

Runs the pipeline over the model in data/ and writes results to outputs/:

    trace     (re)generate the cross-project trace            -> outputs/trace.json
    derive    derive a random project and its subgraph G_P    -> outputs/derived_project.json
    forecast  forecast + selection + contracts for a project  -> outputs/forecast_selection.json
    bundle    bundle model + trace for the viewer             -> presentation/model_bundle.js
    all       trace, then forecast, then bundle (default)

Usage:
    python main.py [trace|derive|forecast|bundle|all] [seed]
"""

import sys
from pathlib import Path

# business/ holds the logic; put it on the path so its modules import each other
sys.path.insert(0, str(Path(__file__).resolve().parent / "business"))

import generate_trace
import derive_project
import forecast_select
import bundle


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "all"
    # let the sub-scripts read their own optional [seed] arg
    sys.argv = [sys.argv[0]] + sys.argv[2:]

    if command == "trace":
        generate_trace.main()
    elif command == "derive":
        derive_project.main()
    elif command == "forecast":
        forecast_select.main()
    elif command == "bundle":
        bundle.main()
    elif command == "all":
        generate_trace.main()
        forecast_select.main()
        bundle.main()
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
