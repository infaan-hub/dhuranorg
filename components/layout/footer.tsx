import Link from 'next/link'
import { ArrowUpRight, Heart, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Link href="/" className="brand footer-brand">
            <span className="brand-icon"><Heart size={19} strokeWidth={2.3} /></span>
            <span className="brand-copy"><strong>het dhuran</strong><small>Special Needs Centre</small></span>
          </Link>
          <p>A place to learn, move and belong. Supporting children and young people in Jambiani, Zanzibar.</p>
        </div>
        <div className="footer-links"><p className="footer-label">EXPLORE</p><Link href="/#our-work">Our work</Link><Link href="/leadership">Our people</Link><Link href="/contact">Get in touch</Link></div>
        <div className="footer-links footer-contact"><p className="footer-label">COME SAY HELLO</p><p><MapPin size={15} /> Jambiani, Zanzibar, Tanzania</p><Link href="/donate" className="footer-donate">Support a child <ArrowUpRight size={15} /></Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Het Dhuran Special Needs Centre</span><span>Made with care in Zanzibar <Heart size={12} fill="currentColor" /></span></div>
    </footer>
  )
}
