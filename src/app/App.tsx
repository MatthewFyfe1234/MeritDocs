import { useState } from 'react';
import { deck as offsiteStrategy } from './decks/strategic/offsite-strategy';
import { deck as productOverview } from './decks/strategic/product-overview';
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
import { presentationFolder, businessCard, flyer } from './documents';
import { PresentationDeck } from './components/PresentationDeck';
import { ExportLayout } from './components/ExportLayout';
import { DocumentViewer } from './components/DocumentViewer';
import { DeckSelector } from './components/DeckSelector';
import type { DeckConfig, NamedVariation } from './types';

const decks: Record<string, DeckConfig> = {
  'offsite-strategy':       offsiteStrategy,
  'product-overview':       productOverview,
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
};

const documents = {
  'folder-cover': presentationFolder,
  'business-card': businessCard,
  'flyer': flyer,
};

const deckGroups = [
  {
    label: 'Strategic',
    entries: [
      { key: 'offsite-strategy',  deck: offsiteStrategy },
      { key: 'product-overview',  deck: productOverview },
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
    return <DocumentViewer document={documents[docKey]} />;
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
        onDeleteVariation={handleDeleteVariation}
      />
    );
  }

  const deck = decks[deckKey];

  return isExport
    ? <ExportLayout deck={deck} variantConfig={variantConfig} />
    : <PresentationDeck deck={deck} variantConfig={variantConfig} variationName={variationName} />;
}
