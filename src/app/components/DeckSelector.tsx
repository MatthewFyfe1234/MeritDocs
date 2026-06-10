import { useState } from 'react';
import { Plus, Trash2, ChevronRight, Pencil, Film, StickyNote } from 'lucide-react';
import type { DeckConfig, NamedVariation, StickNotesConfig, VideoConfig } from '../types';
import { generateId } from '../types';

interface DeckEntry {
  key: string;
  deck: DeckConfig;
}

interface DeckGroup {
  label: string;
  entries: DeckEntry[];
}

interface VideoEntry {
  key: string;
  video: VideoConfig;
}

interface VideoGroup {
  label: string;
  entries: VideoEntry[];
}

interface SticknotesEntry {
  key: string;
  sticknotes: StickNotesConfig;
}

export function DeckSelector({
  groups,
  variations,
  onOpen,
  onCreateVariation,
  onUpdateVariation,
  onDeleteVariation,
  videoGroups,
  onOpenVideo,
  sticknotesEntries,
  onOpenSticknotes,
}: {
  groups: DeckGroup[];
  variations: NamedVariation[];
  onOpen: (deckKey: string, variantConfig?: Record<string, string>, variationName?: string) => void;
  onCreateVariation: (variation: NamedVariation) => void;
  onUpdateVariation: (id: string, name: string, config: Record<string, string>) => void;
  onDeleteVariation: (id: string) => void;
  videoGroups?: VideoGroup[];
  onOpenVideo?: (key: string) => void;
  sticknotesEntries?: SticknotesEntry[];
  onOpenSticknotes?: (key: string) => void;
}) {
  const [modal, setModal] = useState<{ deckKey: string; deck: DeckConfig } | null>(null);
  const [newName, setNewName] = useState('');
  const [newConfig, setNewConfig] = useState<Record<string, string>>({});
  const [editingVariationId, setEditingVariationId] = useState<string | null>(null);

  const openModal = (deckKey: string, deck: DeckConfig, existingVariation?: NamedVariation) => {
    setModal({ deckKey, deck });
    setNewName(existingVariation?.name ?? '');
    setNewConfig(existingVariation?.config ?? {});
    setEditingVariationId(existingVariation?.id ?? null);
  };

  const closeModal = () => {
    setModal(null);
    setNewName('');
    setNewConfig({});
    setEditingVariationId(null);
  };

  const allSlotsFilled = modal
    ? Object.keys(modal.deck.variantSlots ?? {}).every(k => newConfig[k])
    : false;
  const isEditing = editingVariationId !== null;
  const canSave = newName.trim().length > 0 && allSlotsFilled;

  const handleSave = () => {
    if (!modal || !canSave) return;
    if (isEditing) {
      onUpdateVariation(editingVariationId!, newName.trim(), { ...newConfig });
      closeModal();
    } else {
      const variation: NamedVariation = {
        id: generateId(),
        deckKey: modal.deckKey,
        name: newName.trim(),
        config: { ...newConfig },
        createdAt: Date.now(),
      };
      onCreateVariation(variation);
      closeModal();
      onOpen(modal.deckKey, variation.config, variation.name);
    }
  };

  return (
    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: 'var(--slide-bg)', fontFamily: '"Inter", sans-serif' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--slide-primary)' }}>
            Merit Presentations
          </h1>
          <p className="text-sm" style={{ color: 'var(--slide-text)', opacity: 0.45 }}>
            Select a deck to open, or create a named variation for configurable decks.
          </p>
        </div>

        {sticknotesEntries && sticknotesEntries.length > 0 && (
          <div className="mb-10">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2"
              style={{ color: 'var(--slide-primary)', opacity: 0.5, borderBottom: '1px solid var(--slide-border-primary)' }}
            >
              Sticknotes
            </div>
            <div className="flex flex-col gap-3">
              {sticknotesEntries.map(({ key, sticknotes }) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-5 py-4 rounded-lg"
                  style={{ border: '1px solid var(--slide-border-primary)', backgroundColor: 'var(--slide-bg-primary-muted)' }}
                >
                  <div className="flex items-center gap-3">
                    <StickyNote className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-accent)', opacity: 0.7 }} />
                    <div className="text-sm font-semibold" style={{ color: 'var(--slide-primary)' }}>
                      {sticknotes.title}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenSticknotes?.(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold"
                    style={{ backgroundColor: 'transparent', color: 'var(--slide-primary)', border: '1px solid var(--slide-border-primary)' }}
                  >
                    Open popup
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {videoGroups && videoGroups.length > 0 && (
          <div className="mb-10">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2"
              style={{
                color: 'var(--slide-primary)',
                opacity: 0.5,
                borderBottom: '1px solid var(--slide-border-primary)',
              }}
            >
              Videos
            </div>
            <div className="flex flex-col gap-3">
              {videoGroups.map(group => group.entries.map(({ key, video }) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-5 py-4 rounded-lg"
                  style={{ border: '1px solid var(--slide-border-primary)', backgroundColor: 'var(--slide-bg-primary-muted)' }}
                >
                  <div className="flex items-center gap-3">
                    <Film className="w-4 h-4 shrink-0" style={{ color: 'var(--slide-accent)', opacity: 0.7 }} />
                    <div className="text-sm font-semibold" style={{ color: 'var(--slide-primary)' }}>
                      {video.title}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenVideo?.(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--slide-primary)',
                      border: '1px solid var(--slide-border-primary)',
                    }}
                  >
                    Open
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )))}
            </div>
          </div>
        )}

        {groups.map(group => (
          <div key={group.label} className="mb-10">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2"
              style={{
                color: 'var(--slide-primary)',
                opacity: 0.5,
                borderBottom: '1px solid var(--slide-border-primary)',
              }}
            >
              {group.label}
            </div>

            <div className="flex flex-col gap-3">
              {group.entries.map(({ key, deck }) => {
                const deckVariations = variations.filter(v => v.deckKey === key);
                const isConfigurable = !!deck.variantSlots;

                return (
                  <div
                    key={key}
                    className="rounded-lg overflow-hidden"
                    style={{ border: '1px solid var(--slide-border-primary)' }}
                  >
                    {/* Deck header row */}
                    <div
                      className="flex items-center justify-between px-5 py-4"
                      style={{ backgroundColor: 'var(--slide-bg-primary-muted)' }}
                    >
                      <div>
                        <div className="text-sm font-semibold" style={{ color: 'var(--slide-primary)' }}>
                          {deck.title}
                        </div>
                        {isConfigurable && (
                          <div className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.4 }}>
                            Configurable - select or create a variation to open
                          </div>
                        )}
                      </div>

                      {isConfigurable ? (
                        <button
                          onClick={() => openModal(key, deck)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold"
                          style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          New variation
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpen(key)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold"
                          style={{
                            backgroundColor: 'transparent',
                            color: 'var(--slide-primary)',
                            border: '1px solid var(--slide-border-primary)',
                          }}
                        >
                          Open
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Saved variations */}
                    {deckVariations.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
                        {deckVariations.map(v => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between px-5 py-3 group cursor-pointer"
                            style={{ borderTop: '1px solid var(--slide-border-primary)', backgroundColor: 'var(--slide-bg-card)' }}
                            onClick={() => onOpen(v.deckKey, v.config, v.name)}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate" style={{ color: 'var(--slide-text)' }}>
                                {v.name}
                              </div>
                              <div className="text-xs mt-0.5" style={{ color: 'var(--slide-text)', opacity: 0.35 }}>
                                {Object.entries(v.config).map(([slotKey, val]) => {
                                  const slot = deck.variantSlots?.[slotKey];
                                  const option = slot?.options.find(o => o.value === val);
                                  return option?.label ?? val;
                                }).join(' · ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                              <ChevronRight className="w-4 h-4" style={{ color: 'var(--slide-primary)', opacity: 0.4 }} />
                              <button
                                onClick={e => { e.stopPropagation(); openModal(v.deckKey, deck, v); }}
                                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: 'var(--slide-text)' }}
                                title="Edit variation"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={e => { e.stopPropagation(); onDeleteVariation(v.id); }}
                                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ color: 'var(--slide-text)' }}
                                title="Delete variation"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Create / edit variation modal */}
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-6 z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-xl flex flex-col"
            style={{ backgroundColor: 'var(--slide-bg-card)', border: '1px solid var(--slide-border-primary)', maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Fixed header */}
            <div className="shrink-0 px-6 pt-6 pb-4 flex flex-col gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--slide-accent)', opacity: 0.7 }}>
                  {isEditing ? 'Edit variation' : 'New variation'}
                </div>
                <div className="text-base font-semibold" style={{ color: 'var(--slide-primary)' }}>
                  {modal.deck.title}
                </div>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                  Variation name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Komatsu - Capital Intensive"
                  className="px-3 py-2 rounded-md text-sm outline-none"
                  style={{
                    backgroundColor: 'var(--slide-bg-primary-muted)',
                    border: '1px solid var(--slide-border-primary)',
                    color: 'var(--slide-text)',
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Scrollable variant slots */}
            <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-4 pb-2"
              style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
              {Object.entries(modal.deck.variantSlots ?? {}).map(([slotKey, slot]) => (
                <div key={slotKey} className="flex flex-col gap-1.5 pt-4">
                  <label className="text-xs font-semibold" style={{ color: 'var(--slide-text)', opacity: 0.6 }}>
                    {slot.label}
                    <span className="ml-1" style={{ color: 'var(--slide-accent)' }}>*</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    {slot.options.map(opt => (
                      <label
                        key={opt.value}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer"
                        style={{
                          backgroundColor: newConfig[slotKey] === opt.value
                            ? 'var(--slide-bg-accent-muted)'
                            : 'var(--slide-bg-primary-muted)',
                          border: `1px solid ${newConfig[slotKey] === opt.value ? 'var(--slide-accent)' : 'var(--slide-border-primary)'}`,
                        }}
                      >
                        <input
                          type="radio"
                          name={slotKey}
                          value={opt.value}
                          checked={newConfig[slotKey] === opt.value}
                          onChange={() => setNewConfig(c => ({ ...c, [slotKey]: opt.value }))}
                          className="mt-0.5 shrink-0"
                          style={{ accentColor: 'var(--slide-accent)' }}
                        />
                        <span className="text-sm leading-snug" style={{ color: 'var(--slide-text)', opacity: 0.75 }}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed actions */}
            <div className="shrink-0 flex gap-3 justify-end px-6 py-4"
              style={{ borderTop: '1px solid var(--slide-border-primary)' }}>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ color: 'var(--slide-text)', opacity: 0.6 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--slide-accent)', color: '#fff' }}
              >
                {isEditing ? 'Update' : 'Create and open'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
