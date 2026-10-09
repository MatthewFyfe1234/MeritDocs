import { useState } from 'react';
import { deck as offsiteStrategy } from './decks/strategic/offsite-strategy';
import { deck as productOverview } from './decks/strategic/product-overview';
import { deck as stateAttenuation } from './decks/strategic/state-attenuation';
import { deck as associationModel } from './decks/strategic/association-model';
import { deck as concepts } from './decks/strategic/concepts';
import { deck as conceptsV2 } from './decks/strategic/concepts-v2';
import { deck as valueProposition } from './decks/strategic/value-proposition';
import { deck as valuePropositionB } from './decks/strategic/value-proposition-b';
import { deck as endOfTheGame } from './decks/strategic/end-of-the-game';
import { deck as processNetwork } from './decks/strategic/process-network';
import { deck as clientOverview } from './decks/client/client-overview';
import { deck as clientOffsite } from './decks/client/client-offsite';
import { deck as clientDeveloper } from './decks/client/client-developer';
import { deck as clientGc } from './decks/client/client-gc';
import { deck as clientCooperative } from './decks/client/client-cooperative';
import { deck as clientCapabilities } from './decks/client/client-capabilities';
import { deck as clientOutbreakResponse } from './decks/client/client-outbreak-response';
import { deck as clientOffsiteTimber } from './decks/client/client-offsite-timber';
import { deck as clientToolmaker } from './decks/client/client-toolmaker';
import { deck as clientMunicipal } from './decks/client/client-municipal';
import { deck as clientSoftware } from './decks/client/client-software';
import { deck as clientBos } from './decks/client/client-bos';
import { deck as clientFtma } from './decks/client/client-ftma';
import { deck as clientFeaturesNz } from './decks/client/client-features/nz';
import { deck as clientFeaturesAu } from './decks/client/client-features/au';
import { deck as clientFeaturesUk } from './decks/client/client-features/uk';
import { deck as clientFeaturesIe } from './decks/client/client-features/ie';
import { deck as clientMiniDemo } from './decks/client/client-mini-demo';
import { deck as clientInnovateUk } from './decks/client/client-innovate-uk';
import { presentationFolder, businessCard, flyer, modelPaperTemplate, stigmergicProjectDelivery, stigmergicCoordination, attributedContribution } from './documents';
import { PresentationDeck } from './components/PresentationDeck';
import { NotesDeck } from './components/NotesDeck';
import { ExportLayout } from './components/ExportLayout';
import { DocumentViewer } from './components/DocumentViewer';
import { PaperViewer } from './components/paper';
import { DeckSelector } from './components/DeckSelector';
import { VideoEditor } from './components/video/VideoEditor';
import { TimelineEditor } from './components/video/TimelineEditor';
import { video as mewpLiability } from './videos/mewp-liability';
import { video as gettingToTheRoot } from './videos/getting-to-the-root';
import { timeline as offsiteManufacturersDemo } from './videos/offsite-manufacturers-demo';
import { overview as offsiteManufacturersDemoOverview } from './videos/offsite-manufacturers-demo/overview';
import { timeline as watermark } from './videos/watermark';
import { sticknotes as offsiteStructural } from './sticknotes/offsite-structural';
import { sticknotes as modelSymbols } from './sticknotes/model-symbols';
import type { DeckConfig, NamedVariation, StickNotesConfig, VideoConfig, TimelineConfig } from './types';

const sticknotesDeck: Record<string, StickNotesConfig> = {
  'offsite-structural': offsiteStructural,
  'model-symbols': modelSymbols,
};

const sticknotesEntries = Object.entries(sticknotesDeck).map(([key, sticknotes]) => ({ key, sticknotes }));

const videos: Record<string, VideoConfig> = {
  'mewp-liability': mewpLiability,
  'getting-to-the-root': gettingToTheRoot,
};

const timelines: Record<string, TimelineConfig> = {
  'offsite-manufacturers-demo': offsiteManufacturersDemo,
  'offsite-manufacturers-demo-overview': offsiteManufacturersDemoOverview,
  'watermark': watermark,
};

const videoGroups = [
  {
    label: 'Reports',
    entries: [
      { key: 'mewp-liability', video: mewpLiability },
      { key: 'getting-to-the-root', video: gettingToTheRoot },
    ],
  },
];

const decks: Record<string, DeckConfig> = {
  'offsite-strategy':       offsiteStrategy,
  'product-overview':       productOverview,
  'state-attenuation':      stateAttenuation,
  'association-model':      associationModel,
  'concepts':               concepts,
  'concepts-v2':            conceptsV2,
  'value-proposition':      valueProposition,
  'value-proposition-b':    valuePropositionB,
  'end-of-the-game':        endOfTheGame,
  'process-network':        processNetwork,
  'client-overview':        clientOverview,
  'client-offsite':         clientOffsite,
  'client-developer':       clientDeveloper,
  'client-gc':              clientGc,
  'client-cooperative':     clientCooperative,
  'client-capabilities':    clientCapabilities,
  'client-outbreak-response': clientOutbreakResponse,
  'client-offsite-timber':  clientOffsiteTimber,
  'client-toolmaker':       clientToolmaker,
  'client-municipal':       clientMunicipal,
  'client-software':        clientSoftware,
  'client-bos':             clientBos,
  'client-ftma':            clientFtma,
  'client-features-nz':     clientFeaturesNz,
  'client-features-au':     clientFeaturesAu,
  'client-features-uk':     clientFeaturesUk,
  'client-features-ie':     clientFeaturesIe,
  'client-mini-demo':       clientMiniDemo,
  'client-innovate-uk':     clientInnovateUk,
};

const documents = {
  'folder-cover': presentationFolder,
  'business-card': businessCard,
  'flyer': flyer,
  'stigmergic-project-delivery': stigmergicProjectDelivery,
  'stigmergic-coordination': stigmergicCoordination,
  'attributed-contribution': attributedContribution,
  'model-paper-template': modelPaperTemplate,
};

const deckGroups = [
  {
    label: 'Strategic',
    entries: [
      { key: 'offsite-strategy',  deck: offsiteStrategy },
      { key: 'product-overview',  deck: productOverview },
      { key: 'state-attenuation', deck: stateAttenuation },
      { key: 'association-model', deck: associationModel },
      { key: 'concepts',          deck: concepts },
      { key: 'concepts-v2',       deck: conceptsV2 },
      { key: 'value-proposition', deck: valueProposition },
      { key: 'value-proposition-b', deck: valuePropositionB },
      { key: 'end-of-the-game',   deck: endOfTheGame },
      { key: 'process-network',   deck: processNetwork },
    ],
  },
  {
    label: 'Client',
    entries: [
      { key: 'client-overview',         deck: clientOverview },
      { key: 'client-offsite',          deck: clientOffsite },
      { key: 'client-developer',        deck: clientDeveloper },
      { key: 'client-gc',               deck: clientGc },
      { key: 'client-cooperative',      deck: clientCooperative },
      { key: 'client-capabilities',     deck: clientCapabilities },
      { key: 'client-outbreak-response',deck: clientOutbreakResponse },
      { key: 'client-offsite-timber',   deck: clientOffsiteTimber },
      { key: 'client-toolmaker',        deck: clientToolmaker },
      { key: 'client-municipal',        deck: clientMunicipal },
      { key: 'client-software',         deck: clientSoftware },
      { key: 'client-bos',              deck: clientBos },
      { key: 'client-ftma',             deck: clientFtma },
      { key: 'client-features-nz',      deck: clientFeaturesNz },
      { key: 'client-features-au',      deck: clientFeaturesAu },
      { key: 'client-features-uk',      deck: clientFeaturesUk },
      { key: 'client-features-ie',      deck: clientFeaturesIe },
      { key: 'client-mini-demo',        deck: clientMiniDemo },
      { key: 'client-innovate-uk',      deck: clientInnovateUk },
    ],
  },
];

function loadVariations(): NamedVariation[] {
  try { return JSON.parse(localStorage.getItem('merit-variations') ?? '[]'); }
  catch { return []; }
}

function saveVariations(variations: NamedVariation[]) {
  localStorage.setItem('merit-variations', JSON.stringify(variations));
}

export default function App() {
  const [variations, setVariations] = useState<NamedVariation[]>(loadVariations);
  const params = new URLSearchParams(window.location.search);

  // Document view
  const docKey = params.get('doc') as keyof typeof documents | null;
  if (docKey && docKey in documents) {
    const doc = documents[docKey];
    return 'content' in doc ? <PaperViewer paper={doc} /> : <DocumentViewer document={doc} />;
  }

  // Video view
  const videoKey = params.get('video');
  if (videoKey && videoKey in videos) {
    return <VideoEditor video={videos[videoKey]} />;
  }

  // Timeline view
  const timelineKey = params.get('timeline');
  if (timelineKey && timelineKey in timelines) {
    return <TimelineEditor timeline={timelines[timelineKey]} />;
  }

  // Sticknotes view
  const sticknotesKey = params.get('sticknotes');
  if (sticknotesKey && sticknotesKey in sticknotesDeck) {
    return <NotesDeck sticknotes={sticknotesDeck[sticknotesKey]} />;
  }

  const deckKey = params.get('deck');
  const varId   = params.get('var');
  const isExport = params.has('export');

  // Resolve variation if present
  const variation = varId ? variations.find(v => v.id === varId) : undefined;
  const variantConfig = variation?.config ?? {};
  const variationName = variation?.name;

  const handleOpen = (key: string, config?: Record<string, string>, name?: string) => {
    const deck = decks[key];
    if (!deck) return;
    if (deck.variantSlots && !config) return; // configurable — must go through variation

    // Find or match variation id
    const matchedVar = name && config
      ? variations.find(v => v.deckKey === key && v.name === name)
      : undefined;

    const search = new URLSearchParams({ deck: key });
    if (matchedVar) search.set('var', matchedVar.id);
    window.location.search = search.toString();
  };

  const handleCreateVariation = (v: NamedVariation) => {
    const updated = [...variations, v];
    setVariations(updated);
    saveVariations(updated);
  };

  const handleDeleteVariation = (id: string) => {
    const updated = variations.filter(v => v.id !== id);
    setVariations(updated);
    saveVariations(updated);
  };

  const handleUpdateVariation = (id: string, name: string, config: Record<string, string>) => {
    const updated = variations.map(v => v.id === id ? { ...v, name, config } : v);
    setVariations(updated);
    saveVariations(updated);
  };

  // No deck selected, or configurable deck without a variation — show selector
  if (!deckKey || !decks[deckKey] || (decks[deckKey].variantSlots && !variation)) {
    return (
      <DeckSelector
        groups={deckGroups}
        variations={variations}
        onOpen={handleOpen}
        onCreateVariation={(v) => {
          handleCreateVariation(v);
          // Navigate immediately after creation
          const search = new URLSearchParams({ deck: v.deckKey, var: v.id });
          window.location.search = search.toString();
        }}
        onUpdateVariation={handleUpdateVariation}
        onDeleteVariation={handleDeleteVariation}
        documentEntries={Object.entries(documents).map(([key, d]) => ({ key, title: d.title, kind: 'content' in d ? 'Paper' : 'Print' }))}
        onOpenDocument={(key) => { window.location.search = new URLSearchParams({ doc: key }).toString(); }}
        videoGroups={videoGroups}
        onOpenVideo={(key) => { window.location.search = new URLSearchParams({ video: key }).toString(); }}
        timelineGroups={[{ label: 'Demo', entries: Object.entries(timelines).map(([key, t]) => ({ key, title: t.title })) }]}
        onOpenTimeline={(key) => { window.location.search = new URLSearchParams({ timeline: key }).toString(); }}
        sticknotesEntries={sticknotesEntries}
        onOpenSticknotes={(key) => {
          const url = `${window.location.pathname}?sticknotes=${key}`;
          window.open(url, '_blank', 'width=480,height=900,resizable=yes');
        }}
      />
    );
  }

  const deck = decks[deckKey];

  return isExport
    ? <ExportLayout deck={deck} variantConfig={variantConfig} />
    : <PresentationDeck deck={deck} variantConfig={variantConfig} variationName={variationName} />;
}
