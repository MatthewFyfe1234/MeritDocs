import { deck as meritOI } from './decks/merit-oi';
import { deck as productOverview } from './decks/product-overview';
import { deck as clientOverview } from './decks/client-overview';
import { deck as clientOffsite } from './decks/client-offsite';
import { presentationFolder, businessCard, flyer } from './documents';
import { PresentationDeck } from './components/PresentationDeck';
import { ExportLayout } from './components/ExportLayout';
import { DocumentViewer } from './components/DocumentViewer';

const decks: Record<string, typeof meritOI> = {
  'merit-oi': meritOI,
  'product-overview': productOverview,
  'client-overview': clientOverview,
  'client-offsite': clientOffsite,
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

  const deckKey = params.get('deck') ?? 'merit-oi';
  const deck = decks[deckKey] ?? meritOI;
  const isExport = params.has('export');
  return isExport ? <ExportLayout deck={deck} /> : <PresentationDeck deck={deck} />;
}
