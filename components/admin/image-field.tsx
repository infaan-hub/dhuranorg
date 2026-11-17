'use client'

import { useId, useState } from 'react'
import { ImageIcon, Upload, X } from 'lucide-react'
import { imageFileToDataUrl } from '@/lib/image-client'

type ImageFieldProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  onError?: (message: string) => void
  previewHeight?: number
}

export function ImageField({
  label = 'Image',
  value,
  onChange,
  onError,
  previewHeight = 170,
}: ImageFieldProps) {
  const inputId = useId()
  const [busy, setBusy] = useState(false)

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      onChange(await imageFileToDataUrl(file))
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Could not read that image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <label htmlFor={inputId} style={labelStyle}>
        {label}
      </label>

      <div
        style={{
          position: 'relative',
          height: previewHeight,
          borderRadius: '10px',
          border: '1px dashed var(--line)',
          background: 'rgba(0,0,0,0.03)',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          marginBottom: '8px',
        }}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              type="button"
              onClick={() => onChange('')}
              title="Remove image"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'var(--paper)',
                color: 'var(--ink)',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              <X size={13} /> Remove
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--muted-ink)' }}>
            <ImageIcon size={32} strokeWidth={1.5} style={{ margin: '0 auto 4px' }} />
            <span style={{ fontSize: '13px' }}>No image selected</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          id={inputId}
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={value.startsWith('data:') ? 'Uploaded image file' : 'Paste an image URL (https://...)'}
          style={{ ...inputStyle, flex: 1 }}
        />
        <label
          htmlFor={`${inputId}-upload`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 14px',
            borderRadius: '9px',
            border: '1px solid var(--line)',
            background: 'var(--paper)',
            color: 'var(--ink)',
            fontWeight: 600,
            fontSize: '13px',
            cursor: busy ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
            opacity: busy ? 0.6 : 1,
          }}
        >
          <Upload size={15} /> {busy ? 'Processing...' : 'Upload'}
        </label>
        <input
          id={`${inputId}-upload`}
          type="file"
          accept="image/*"
          onChange={upload}
          disabled={busy}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--ink)',
  marginBottom: '5px',
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--line)',
  borderRadius: '9px',
  background: 'var(--surface)',
  color: 'var(--ink)',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: '13px',
}
