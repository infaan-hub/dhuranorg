'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Heart, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react'

const PHONE_DISPLAY = '+255 780 981 880'
const PHONE_INTL = '255780981880'
const EMAIL = 'info@hetdhuran.org'
const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=Dhuran%20Special%20Needs%20Centre%2C%20Jambiani%2C%20Zanzibar%2C%20Tanzania'
const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  'Hello Dhuran Special Needs Centre, I would like to support the centre as a donor.'
)}`

type DonorButtonProps = {
  variant?: 'hero' | 'footer'
}

export function DonorButton({ variant = 'hero' }: DonorButtonProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={variant === 'hero' ? 'button button-donor' : 'footer-donor-button'}
        onClick={() => setOpen(true)}
      >
        <Heart size={17} /> Donor
      </button>

      {open &&
        createPortal(
          <div
            className="donor-overlay"
            role="presentation"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            <div className="donor-card" role="dialog" aria-modal="true" aria-labelledby="donor-title">
              <button
                className="donor-close"
                type="button"
                aria-label="Close donor contact details"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <X size={18} />
              </button>

              <p className="eyebrow">Donor enquiries</p>
              <h2 id="donor-title">Talk to us about giving.</h2>
              <p className="donor-intro">
                Every contribution helps us keep care, therapy, learning and nutrition support free for children
                in Jambiani. Reach us on any of these channels.
              </p>

              <div className="donor-options">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donor-option"
                >
                  <span className="donor-option-icon"><MessageCircle size={19} /></span>
                  <span className="donor-option-copy">
                    <strong>WhatsApp</strong>
                    <small>{PHONE_DISPLAY}</small>
                  </span>
                  <ArrowUpRight size={16} className="donor-option-arrow" />
                </a>

                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Donor enquiry')}`}
                  className="donor-option"
                >
                  <span className="donor-option-icon"><Mail size={19} /></span>
                  <span className="donor-option-copy">
                    <strong>Email</strong>
                    <small>{EMAIL}</small>
                  </span>
                  <ArrowUpRight size={16} className="donor-option-arrow" />
                </a>

                <a href={`tel:+${PHONE_INTL}`} className="donor-option">
                  <span className="donor-option-icon"><Phone size={19} /></span>
                  <span className="donor-option-copy">
                    <strong>Call</strong>
                    <small>{PHONE_DISPLAY}</small>
                  </span>
                  <ArrowUpRight size={16} className="donor-option-arrow" />
                </a>

                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donor-option"
                >
                  <span className="donor-option-icon"><MapPin size={19} /></span>
                  <span className="donor-option-copy">
                    <strong>Location</strong>
                    <small>Jambiani, Zanzibar, Tanzania - open in Google Maps</small>
                  </span>
                  <ArrowUpRight size={16} className="donor-option-arrow" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
