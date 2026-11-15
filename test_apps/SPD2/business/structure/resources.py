"""Agents and their qualifications Q(a), tools and materials."""

from dataclasses import dataclass


@dataclass
class Agent:
    """A resource that performs steps: one agent a, holding its qualifications."""
    id: str
    name: str
    qualifications: set                          # Q(a), the ids of the jobs it is qualified for


@dataclass
class Tool:
    """A resource a step draws on without embodying it in the product: one tool g."""
    id: str
    name: str


@dataclass
class Material:
    """A resource a step embodies in the product: one material w."""
    id: str
    name: str


# --------------------------------------------------------------------------------------------------


def read_resources(data):
    """Builds the agents, tools and materials, each by its id, from their JSON form, {agents: [{id,
       name, qualifications}], tools: [{id, name}], materials: [{id, name}]}."""
    agents = {item["id"]: Agent(item["id"], item["name"], set(item.get("qualifications", [])))
              for item in data.get("agents", [])}
    tools = {item["id"]: Tool(item["id"], item["name"]) for item in data.get("tools", [])}
    materials = {item["id"]: Material(item["id"], item["name"]) for item in data.get("materials", [])}
    return agents, tools, materials
