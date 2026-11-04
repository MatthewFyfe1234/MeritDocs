import type { ReactNode } from 'react';
import { NoteCard } from '../../components/slides/NoteCard';
import { M } from '../../components/paper';
import type { StickNotesConfig } from '../../types';

// One symbol and its plain-language meaning.
function Row({ sym, children }: { sym: string; children: ReactNode }) {
  return (
    <div className="flex flex-row gap-3 items-baseline">
      <div className="shrink-0 text-right" style={{ width: 84 }}>
        <M>{sym}</M>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest pt-2 pb-0.5" style={{ color: 'var(--slide-accent)' }}>
      {children}
    </p>
  );
}

export const sticknotes: StickNotesConfig = {
  title: 'SPD Model: Symbol Key',
  cards: [
    <NoteCard key="key" label="SPD model" headline="Symbol key">
      <div className="-mx-6 text-sm space-y-1.5">

        <GroupLabel>Standard notation</GroupLabel>
        <Row sym={"\\in"}>is an element of</Row>
        <Row sym={"\\subseteq"}>is a subset of</Row>
        <Row sym={"\\textstyle\\bigcup"}>the union of sets</Row>
        <Row sym={"\\{\\ \\}"}>a set, by listing its members</Row>
        <Row sym={"\\{\\ \\cdot : \\cdot\\ \\}"}>set-builder: items (left) for which the condition (right) holds</Row>
        <Row sym={"|\\,\\cdot\\,|"}>the number of elements in a set</Row>
        <Row sym={"\\sim"}>is distributed as</Row>
        <Row sym={"\\approx"}>is approximately equal to</Row>
        <Row sym={"\\to"}>a function from one set to another (as in {<M>{"\\mu : A \\to B"}</M>})</Row>
        <Row sym={"2^{X}"}>the power set of {<M>{"X"}</M>} (all its subsets)</Row>
        <Row sym={"\\mathcal{F}"}>a probability distribution (the family a metric&rsquo;s value is drawn from)</Row>
        <Row sym={"G[\\,\\cdot\\,]"}>the subgraph induced on a set of nodes (keeping arcs with both ends in it)</Row>
        <Row sym={"(\\,\\cdot,\\ \\cdot\\,)"}>an ordered tuple</Row>
        <Row sym={"x'"}>a dummy for a record&rsquo;s own value, matched against the fixed {<M>{"x"}</M>} (as in {<M>{"a' = a"}</M>})</Row>

        <GroupLabel>Specific to this model</GroupLabel>
        <Row sym={"T"}>the master specification (a tree)</Row>
        <Row sym={"N"}>the specification nodes (product elements)</Row>
        <Row sym={"A"}>the tree arcs (parent-child relations)</Row>
        <Row sym={"G"}>the master process (a directed graph)</Row>
        <Row sym={"N_s"}>the steps (nodes of {<M>{"G"}</M>})</Row>
        <Row sym={"A_{sp}"}>the step products (arcs of {<M>{"G"}</M>})</Row>
        <Row sym={"s"}>a step</Row>
        <Row sym={"u,\\ v"}>two steps an arc joins</Row>
        <Row sym={"e"}>an arc (a product from one step to another)</Row>
        <Row sym={"G_j"}>the job graph (a lightweight overlay, may cycle)</Row>
        <Row sym={"N_j"}>the jobs</Row>
        <Row sym={"A_{jp}"}>the job products</Row>
        <Row sym={"j"}>a job</Row>
        <Row sym={"J(s)"}>the job a step belongs to (the grouping)</Row>
        <Row sym={"\\mu(n)"}>the steps a spec node necessitates (the mapping)</Row>
        <Row sym={"P"}>a project&rsquo;s selected spec nodes</Row>
        <Row sym={"\\sigma(s)"}>the spec nodes a step&rsquo;s execution selects (its finding)</Row>
        <Row sym={"N_P"}>the steps a project runs</Row>
        <Row sym={"G_P"}>the derived process (the subgraph on those steps)</Row>
        <Row sym={"D"}>a spec node&rsquo;s descriptors</Row>
        <Row sym={"d_i"}>one descriptor</Row>
        <Row sym={"k"}>the number of descriptors</Row>
        <Row sym={"m"}>a metric (which quantity a record holds)</Row>
        <Row sym={"y"}>a metric&rsquo;s recorded value</Row>
        <Row sym={"y_m(s)"}>the value of metric {<M>{"m"}</M>} at step {<M>{"s"}</M>}, as a distribution</Row>
        <Row sym={"\\theta(D)"}>the scaling the descriptors apply to the distribution</Row>
        <Row sym={"\\tau"}>the trace (the accumulating record)</Row>
        <Row sym={"a"}>an agent</Row>
        <Row sym={"Q(a)"}>an agent&rsquo;s qualifications (the skillsets it holds)</Row>
        <Row sym={"t"}>the time a record was captured</Row>
        <Row sym={"g"}>the tools used on a record</Row>
        <Row sym={"w"}>the materials used on a record</Row>
        <Row sym={"\\bot"}>a field left unrecorded</Row>
        <Row sym={"i"}>the project instance a record arose from</Row>
        <Row sym={"\\mathrm{forecast}(s, m, D, r, c)"}>the forecast of metric {<M>{"m"}</M>} for a step: the {<M>{"r"}</M>}-percentile of its distribution</Row>
        <Row sym={"c"}>a context: any part of a record, alone or in combination, that exposure counts or a forecast conditions on</Row>
        <Row sym={"r"}>the tolerated risk, the percentile taken from a distribution</Row>
        <Row sym={"Q_r"}>the {<M>{"r"}</M>}-percentile (quantile at level {<M>{"r"}</M>})</Row>
        <Row sym={"\\mathrm{Elig}(j)"}>the agents eligible for a job (holding its skillset and clearing the floor at each of its steps)</Row>
        <Row sym={"n_c(s)"}>the recorded exposure of a context {<M>{"c"}</M>} to a step, its form a modelling choice</Row>
        <Row sym={"n_a(s)"}>an agent&rsquo;s exposure, read as its experience</Row>
        <Row sym={"\\lambda_s"}>the experience floor for a step (the minimum {<M>{"n_a"}</M>} to be eligible)</Row>
        <Row sym={"C(j)"}>the contract of a job</Row>
        <Row sym={"\\mathrm{in}(j),\\ \\mathrm{out}(j)"}>the products crossing a job&rsquo;s boundary</Row>
        <Row sym={"\\varphi(j)"}>the forecasts over a job&rsquo;s steps, metric by metric, at the same risk {<M>{"r"}</M>}</Row>
        <Row sym={"\\mathrm{Project}(P)"}>a project: each derived step with its forecast, eligible agents, and job contract</Row>
      </div>
    </NoteCard>,
  ],
};
