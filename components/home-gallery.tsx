'use client'

import { useState } from 'react'
import { ImageIcon, X, Maximize2 } from 'lucide-react'

export type GalleryItem = {
  id: string
  label: string
  category: string
  description?: string
  image?: string
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    label: 'Sensory and learning games',
    category: 'Care within the community',
    description: 'Individualized sensory learning activities shaped around each child’s pace, interests and unique developmental needs.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g2',
    label: 'Physical therapy and mobility programmes',
    category: 'Health & wellbeing',
    description: 'Physiotherapy and rehabilitation sessions that build movement, strength and everyday independence for each child.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g3',
    label: 'Nutritional care and healthy meals',
    category: 'Health & wellbeing',
    description: 'Nutritional assessments, feeding guidance and warm nourishment to support healthy growth and development.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g4',
    label: 'Living our compass and values',
    category: 'Our vision and mission',
    description: 'Fostering an inclusive society with love, transparency, equality and collaboration across South Unguja.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g5',
    label: 'Community activity and family day',
    category: 'Recent events',
    description: 'Families, caregivers and volunteers joining together at the centre for a day of learning, play and community support.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g6',
    label: 'Caregiver empowerment workshop',
    category: 'Recent events',
    description: 'Parenting and caregiving sessions providing practical mobility techniques, counseling and peer encouragement.',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
  },
]

export function HomeGallery({ items }: { items?: GalleryItem[] }) {
  const activeItems = (items && items.length > 0) ? items : defaultGalleryItems
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null)

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(activeItems.map((i) => i.category).filter(Boolean)))]

  const filteredItems = selectedCategory === 'All'
    ? activeItems
    : activeItems.filter((i) => i.category === selectedCategory)

  return (
    <div>
      {/* Section Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid ' + (isActive ? 'var(--ink)' : 'var(--line)'),
                background: isActive ? 'var(--ink)' : 'var(--surface)',
                color: isActive ? 'var(--paper)' : 'var(--ink)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Gallery Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
        }}
      >
        {filteredItems.map((item) => (
          <article
            key={item.id}
            onClick={() => setModalItem(item)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            className="gallery-card"
          >
            {/* Image Box */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '210px',
                background: 'rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  className="gallery-thumb"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--muted-ink)' }}>
                  <ImageIcon size={36} strokeWidth={1.5} />
                </div>
              )}

              {/* Section badge on image */}
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(23, 100, 111, 0.88)',
                  backdropFilter: 'blur(4px)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                {item.category}
              </span>

              <span
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(4px)',
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Maximize2 size={14} />
              </span>
            </div>

            {/* Description & Label Details */}
            <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3
                style={{
                  margin: '0 0 8px',
                  font: '500 20px/1.25 var(--font-heading)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.015em',
                }}
              >
                {item.label}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: 'var(--muted-ink)',
                  fontSize: '14px',
                  lineHeight: '1.65',
                  flex: 1,
                }}
              >
                {item.description || 'No description provided.'}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox / Modal for Expanded View */}
      {modalItem && (
        <div
          onClick={() => setModalItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(14, 24, 19, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <button
              type="button"
              onClick={() => setModalItem(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <X size={18} />
            </button>

            {modalItem.image && (
              <div style={{ width: '100%', maxHeight: '420px', overflow: 'hidden', background: '#000' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={modalItem.image}
                  alt={modalItem.label}
                  style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain', display: 'block', margin: 'auto' }}
                />
              </div>
            )}

            <div style={{ padding: '24px 28px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  color: 'var(--ink)',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                Section: {modalItem.category}
              </span>
              <h2
                style={{
                  margin: '0 0 10px',
                  font: '500 24px/1.2 var(--font-heading)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.015em',
                }}
              >
                {modalItem.label}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: 'var(--muted-ink)',
                  fontSize: '15px',
                  lineHeight: '1.65',
                }}
              >
                {modalItem.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
