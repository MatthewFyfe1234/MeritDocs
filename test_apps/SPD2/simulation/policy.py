"""Self-selection: who takes a contract among the agents it is offered to. The model offers C(j) to every
   agent in Elig(j) and leaves the choice to them, so the simulation supplies it."""


def self_select(eligible, rng, holding=()):
    """The agent that takes a contract: one of those eligible for it, picked at random from rng, those not
       already holding another of the project's contracts first, or None where none is eligible and the
       contract cannot be taken."""
    free = set(eligible) - set(holding)
    pool = free or set(eligible)
    return rng.choice(sorted(pool)) if pool else None
