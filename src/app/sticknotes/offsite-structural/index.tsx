import { NoteCard } from '../../components/slides/NoteCard';
import type { StickNotesConfig } from '../../types';

export const sticknotes: StickNotesConfig = {
  title: 'Offsite Structural: Demo Notes',
  cards: [
    <NoteCard key="master-process" label="The premise" headline="For every product there is an unseen master process to deliver it">
      <p>Merit enables mapping of that process in 5 layers of abstraction. Connections between steps always represent products passed between steps, people, or organisations.</p>
    </NoteCard>,

    <NoteCard key="core" label="The core translation" headline="Specifying a product outputs a process">
      <p>Merit creates an association between what you are building and how you build it.</p>
      <p>The specification produces the process - organisation types, jobs, and processes, together with the requirements which connect the eco-system together.</p>
    </NoteCard>,

    <NoteCard key="confirm" label="Automated planning" headline="The model plans the job">
      <p>The model forecasts how long the process will take, based on historic data, then derives the fastest timeline from team calendars.</p>
      <p>It assigns executors to each step based on their specific experience and availability.</p>
      <p>It selects tools based on their schedules and availability.</p>
      <p>It adjusts stock levels and generates material RFQs for sending.</p>
    </NoteCard>,

    <NoteCard key="feedback" label="The feedback loop" headline="Every delivery feeds back into the model">
      <p>Forecasts become deterministically more accurate over time.</p>
      <p>The estimator quoting job fifty is drawing on forty-nine real executions - actual durations, actual costs, actual variances - not intuition or memory.</p>
    </NoteCard>,

    <NoteCard key="doccontrol" label="Document control" headline="Stage gates built into the workflow">
      <p>Document control enforces delivery sequence. Nothing moves forward without sign-off.</p>
      <p>Training records, certificates of conformance, and maintenance documentation are tracked across people, tools, and materials.</p>
      <p>The process model is also the training model. Documentation, instructions, and video links can be attached to any job or step.</p>
    </NoteCard>,

<NoteCard key="fullpicture" label="Company value" headline="Everything connected through one model">
      <ul className="list-disc list-inside space-y-1">
        <li>Automated pricing and quotation generation</li>
        <li>Automated material RFQ and ordering</li>
        <li>Automated project planning</li>
        <li>Resource management and allocation</li>
        <li>Document control</li>
        <li>Stage-gated delivery</li>
        <li>Executor evaluation</li>
      </ul>
    </NoteCard>,
  ],
};
