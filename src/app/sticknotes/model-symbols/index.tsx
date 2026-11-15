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
        <Row sym={"\\supseteq"}>contains (is a superset of)</Row>
        <Row sym={"\\cup,\\ \\textstyle\\bigcup"}>the union of two sets, and of many</Row>
        <Row sym={"\\setminus"}>set difference (the first set without the second&rsquo;s members)</Row>
        <Row sym={"\\{\\ \\}"}>a set, by listing its members</Row>
        <Row sym={"\\{\\ \\cdot : \\cdot\\ \\}"}>set-builder: items (left) for which the condition (right) holds</Row>
        <Row sym={":"}>such that (in a set or after {<M>{"\\exists"}</M>}); in {<M>{"\\mu : N \\to 2^{N_s}"}</M>}, a function and the sets it maps between</Row>
        <Row sym={"\\textstyle\\sum"}>the sum over a set</Row>
        <Row sym={"\\geq"}>is at least</Row>
        <Row sym={"\\cdot"}>a placeholder for any value (as in {<M>{"\\mathrm{forecast}(s, \\cdot, r, c)"}</M>}, every metric)</Row>
        <Row sym={"\\dots"}>and so on, through a sequence</Row>
        <Row sym={"\\sim"}>is distributed as</Row>
        <Row sym={"\\to"}>a function from one set to another (as in {<M>{"\\mu : N \\to 2^{N_s}"}</M>})</Row>
        <Row sym={"2^{X}"}>the power set of {<M>{"X"}</M>} (all its subsets)</Row>
        <Row sym={"\\forall"}>for all</Row>
        <Row sym={"\\exists"}>there is (at least one)</Row>
        <Row sym={"\\mathcal{F}_m"}>a probability distribution (the family metric {<M>{"m"}</M>}&rsquo;s value is drawn from)</Row>
        <Row sym={"(\\,\\cdot,\\ \\cdot\\,)"}>an ordered tuple</Row>
        <Row sym={"\\hat{x}"}>a hat marks an instance (as {<M>{"\\hat{T}"}</M>} of {<M>{"T"}</M>})</Row>
        <Row sym={"i',\\ \\hat{T}'"}>a prime marks another of the same kind: a past project, an extended selection</Row>

        <GroupLabel>Specific to this model: collections</GroupLabel>
        <Row sym={"T"}>the master specification</Row>
        <Row sym={"N"}>its nodes</Row>
        <Row sym={"A"}>its parent-child arcs</Row>
        <Row sym={"D"}>descriptors</Row>
        <Row sym={"G"}>the master process</Row>
        <Row sym={"N_s"}>its steps</Row>
        <Row sym={"A_{sp}"}>its arcs, the step products</Row>
        <Row sym={"N_j"}>the jobs</Row>
        <Row sym={"\\hat{T}"}>the selection</Row>
        <Row sym={"N_{\\hat{T}}"}>the project&rsquo;s steps</Row>
        <Row sym={"G_{\\hat{T}}"}>the project&rsquo;s process ({<M>{"G_{\\hat{T}}^{J}"}</M>} with an order assumed between a job&rsquo;s steps)</Row>
        <Row sym={"S"}>a set of steps ({<M>{"S_j"}</M>} a job&rsquo;s)</Row>
        <Row sym={"Q"}>an agent&rsquo;s qualifications</Row>
        <Row sym={"\\tau"}>the trace</Row>
        <Row sym={"\\mathrm{Elig}"}>the agents eligible for a job</Row>
        <Row sym={"I"}>the past projects a forecast draws on</Row>
        <Row sym={"R"}>the points a forecast is fitted to</Row>
        <Row sym={"\\mathrm{pred}"}>the steps that supply a step</Row>
        <Row sym={"\\mathrm{in},\\ \\mathrm{out}"}>a job&rsquo;s inputs and outputs</Row>

        <GroupLabel>Specific to this model: members, values and functions</GroupLabel>
        <Row sym={"x"}>a node ({<M>{"\\hat{x}"}</M>} an instance of it)</Row>
        <Row sym={"d"}>a descriptor</Row>
        <Row sym={"k"}>the number of descriptors</Row>
        <Row sym={"s"}>a step</Row>
        <Row sym={"e"}>an arc, a product</Row>
        <Row sym={"\\mathrm{src},\\ \\mathrm{tgt}"}>an arc&rsquo;s source and target</Row>
        <Row sym={"\\star"}>outside the process</Row>
        <Row sym={"u,\\ v"}>steps</Row>
        <Row sym={"\\rightsquigarrow"}>leads to, through steps outside the project in the target&rsquo;s job</Row>
        <Row sym={"m"}>a metric</Row>
        <Row sym={"y"}>a metric&rsquo;s value</Row>
        <Row sym={"j"}>a job</Row>
        <Row sym={"J"}>the grouping of steps into jobs</Row>
        <Row sym={"\\mu"}>the mapping from nodes to steps</Row>
        <Row sym={"a"}>an agent</Row>
        <Row sym={"g"}>tools</Row>
        <Row sym={"w"}>materials</Row>
        <Row sym={"i"}>a project</Row>
        <Row sym={"t"}>a time</Row>
        <Row sym={"\\bot"}>unrecorded</Row>
        <Row sym={"c"}>a context</Row>
        <Row sym={"\\varnothing"}>the empty context</Row>
        <Row sym={"n"}>exposure ({<M>{"n^{\\tau}"}</M>} from the trace, {<M>{"\\tilde{n}"}</M>} credited by hand)</Row>
        <Row sym={"\\lambda"}>an experience floor</Row>
        <Row sym={"\\theta"}>the descriptors&rsquo; effect on a metric&rsquo;s distribution</Row>
        <Row sym={"r"}>the confidence level</Row>
        <Row sym={"Q_r"}>the {<M>{"r"}</M>}-percentile</Row>
        <Row sym={"\\mathrm{forecast}"}>a forecast</Row>
        <Row sym={"\\mathrm{fit}"}>a fit to points</Row>
        <Row sym={"X"}>an accumulated value</Row>
        <Row sym={"\\oplus"}>merging where paths converge</Row>
        <Row sym={"\\otimes"}>extending along a path</Row>
        <Row sym={"C"}>a contract</Row>
        <Row sym={"\\varphi"}>a contract&rsquo;s forecasts</Row>
        <Row sym={"\\mathrm{Project}"}>a project&rsquo;s steps, forecasts, contracts and value</Row>

        <GroupLabel>Used in Section 6</GroupLabel>
        <Row sym={"C_t"}>the steps completed by a time</Row>
        <Row sym={"^{t}"}>at a time, recorded values standing in for forecasts</Row>
        <Row sym={"\\beta,\\ \\kappa,\\ \\varepsilon"}>carbon factors: per unit of time, per action, per unit of material</Row>

        <GroupLabel>Pronunciation</GroupLabel>
        <Row sym={"\\in"}>&ldquo;in&rdquo;</Row>
        <Row sym={"\\subseteq"}>&ldquo;subset of&rdquo;</Row>
        <Row sym={"\\cup,\\ \\textstyle\\bigcup"}>&ldquo;union&rdquo;</Row>
        <Row sym={"\\setminus"}>&ldquo;minus&rdquo; or &ldquo;without&rdquo;</Row>
        <Row sym={"\\textstyle\\sum"}>&ldquo;sum&rdquo;</Row>
        <Row sym={":"}>&ldquo;such that&rdquo;, or in a function &ldquo;from&rdquo;</Row>
        <Row sym={"\\forall"}>&ldquo;for all&rdquo;</Row>
        <Row sym={"\\exists"}>&ldquo;there exists&rdquo;</Row>
        <Row sym={"\\to"}>&ldquo;to&rdquo;</Row>
        <Row sym={"\\rightsquigarrow"}>&ldquo;leads to&rdquo;</Row>
        <Row sym={"\\sim"}>&ldquo;tilde&rdquo;, read as &ldquo;is distributed as&rdquo;</Row>
        <Row sym={"\\star"}>&ldquo;star&rdquo;</Row>
        <Row sym={"\\bot"}>&ldquo;bottom&rdquo;</Row>
        <Row sym={"\\varnothing"}>&ldquo;empty set&rdquo;</Row>
        <Row sym={"\\oplus,\\ \\otimes"}>&ldquo;oh-plus&rdquo;, &ldquo;oh-times&rdquo;</Row>
        <Row sym={"\\mathcal{F}"}>&ldquo;script F&rdquo;</Row>
        <Row sym={"\\hat{x},\\ \\hat{T}"}>&ldquo;x hat&rdquo;, &ldquo;T hat&rdquo;</Row>
        <Row sym={"\\hat{T}'"}>&ldquo;T hat prime&rdquo;</Row>
        <Row sym={"\\supseteq"}>&ldquo;contains&rdquo; or &ldquo;superset of&rdquo;</Row>
        <Row sym={"\\tilde{n}"}>&ldquo;n tilde&rdquo;</Row>
        <Row sym={"i'"}>&ldquo;i prime&rdquo;</Row>
        <Row sym={"N_s"}>&ldquo;N sub s&rdquo; (a subscript is read &ldquo;sub&rdquo;)</Row>
        <Row sym={"y_m^{t}"}>&ldquo;y sub m, to the t&rdquo;</Row>
        <Row sym={"\\mu"}>&ldquo;mew&rdquo;</Row>
        <Row sym={"\\tau"}>&ldquo;tau&rdquo;, rhyming with &ldquo;cow&rdquo;</Row>
        <Row sym={"\\theta"}>&ldquo;thee-tuh&rdquo;</Row>
        <Row sym={"\\lambda"}>&ldquo;lam-duh&rdquo;</Row>
        <Row sym={"\\varphi"}>&ldquo;fye&rdquo;</Row>
        <Row sym={"\\beta"}>&ldquo;bee-tuh&rdquo;</Row>
        <Row sym={"\\kappa"}>&ldquo;kap-uh&rdquo;</Row>
        <Row sym={"\\varepsilon"}>&ldquo;ep-sih-lon&rdquo;</Row>
      </div>
    </NoteCard>,
  ],
};
