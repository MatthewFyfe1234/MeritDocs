"""A run's events, in order: each a change in the project's state, with the message the dialog shows. The
   state at any point is the events so far."""

from dataclasses import dataclass, field

from simulation.messages import MESSAGES


@dataclass
class Event:
    """One change in a project's state."""
    kind: str                                    # one of MESSAGES
    params: dict                                 # the values its message needs
    refs: list = field(default_factory=list)     # the steps, jobs, agents or nodes it involves


# --------------------------------------------------------------------------------------------------


def emit(log, kind, refs=(), **params):
    """Appends an event to a run's log."""
    log.append(Event(kind, params, list(refs)))


def text(event):
    """The event's message, its template filled from its parameters."""
    return MESSAGES[event.kind].format(**event.params)
