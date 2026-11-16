import { ArrowUpRight, Heart, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <a href="#top" className="brand footer-brand">
            <span className="brand-icon"><Heart size={19} strokeWidth={2.3} /></span>
            <span className="brand-copy"><strong>het dhuran</strong><small>Special Needs Centre</small></span>
          </a>
          <p>Bringing families, caregivers and local professionals together for a more inclusive community in Jambiani.</p>
        </div>
        <div className="footer-links"><p className="footer-label">EXPLORE</p><a href="/about">About</a><a href="/programs">Programmes</a><a href="/news">News</a><a href="/gallery">Gallery</a><a href="/resources">Resources</a><a href="#support">Get involved</a><a href="mailto:info@hetdhuran.org">Contact</a></div>
        <div className="footer-links footer-contact"><p className="footer-label">COME SAY HELLO</p><p><MapPin size={15} /> Jambiani, Zanzibar, Tanzania</p><a href="tel:+255780981880" className="footer-donate">+255 780 981 880 <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Het Dhuran Special Needs Centre</span><span>Made with care in Zanzibar <Heart size={12} fill="currentColor" /></span></div>
    </footer>
  )
}
