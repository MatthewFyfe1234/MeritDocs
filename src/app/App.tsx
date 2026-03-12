import { deck as offsiteStrategy } from './decks/strategic/offsite-strategy';
import { deck as productOverview } from './decks/strategic/product-overview';
import { deck as clientOverview } from './decks/client/client-overview';
import { deck as clientOffsite } from './decks/client/client-offsite';
import { deck as clientDeveloper } from './decks/client/client-developer';
import { deck as clientGc } from './decks/client/client-gc';
import { deck as clientDao } from './decks/client/client-dao';
import { deck as clientCapabilities } from './decks/client/client-capabilities';
import { deck as clientCapabilitiesV2 } from './decks/client/client-capabilities-v2';
import { presentationFolder, businessCard, flyer } from './documents';
import { PresentationDeck } from './components/PresentationDeck';
import { ExportLayout } from './components/ExportLayout';
import { DocumentViewer } from './components/DocumentViewer';

const decks: Record<string, typeof offsiteStrategy> = {
  'offsite-strategy': offsiteStrategy,
  'product-overview': productOverview,
  'client-overview': clientOverview,
  'client-offsite': clientOffsite,
  'client-developer': clientDeveloper,
  'client-gc': clientGc,
  'client-dao': clientDao,
  'client-capabilities': clientCapabilities,
  'client-capabilities-v2': clientCapabilitiesV2,
};

const documents = {
  'folder-cover': presentationFolder,
  'business-card': businessCard,
  'flyer': flyer,
};

export default function App() {
  const params = new URLSearchParams(window.location.search);

  const docKey = params.get('doc') as keyof typeof documents | null;
  if (docKey && docKey in documents) {
    return <DocumentViewer document={documents[docKey]} />;
  }

  const deckKey = params.get('deck') ?? 'offsite-strategy';
  const deck = decks[deckKey] ?? offsiteStrategy;
  const isExport = params.has('export');
  return isExport ? <ExportLayout deck={deck} /> : <PresentationDeck deck={deck} />;
}
