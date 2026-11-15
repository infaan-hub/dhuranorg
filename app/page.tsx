import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Heart, HeartHandshake,
  MapPin, MoveUpRight, Sparkles, Accessibility,
} from 'lucide-react'

const services = [
  { icon: Sparkles, title: 'Individual learning', text: 'Special education and sensory activities shaped around each child’s pace, interests and needs.' },
  { icon: Accessibility, title: 'Movement & therapy', text: 'Physical therapy and rehabilitation support mobility, confidence and everyday independence.' },
  { icon: HeartHandshake, title: 'Health & nourishment', text: 'Medical and nutritional care supported by specialized health staff and trained local physiotherapists.' },
]

export default function Page() {
  return (
    <div className="site-shell">
      <section className="hero-wrap" aria-labelledby="hero-title">
        <div className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A place to learn, move & belong</p>
            <h1 id="hero-title">Every child deserves <span>room to bloom.</span></h1>
            <p className="hero-description">In Jambiani, we’re creating a kinder everyday for children with disabilities through care, learning and the support to discover what’s possible.</p>
            <div className="hero-actions">
              <Link href="/donate" className="button button-mint">Support a child <ArrowUpRight size={17} /></Link>
              <a href="#our-work" className="text-link">Discover our work <ArrowDown size={15} /></a>
            </div>
            <div className="hero-note"><span className="note-mark"><Heart size={16} fill="currentColor" /></span><p>Small steps, celebrated.<br /><span>Possibility, nurtured every day.</span></p></div>
          </div>
          <div className="hero-visual">
            <Image src="/community-volunteers.jpg" alt="Volunteers passing boxes of donated produce during a community food drive" fill priority sizes="(max-width: 800px) 100vw, 54vw" className="hero-image" />
            <div className="hero-image-shade" />
            <div className="image-caption"><span className="caption-pulse" /><span>Here for every little victory</span></div>
            <div className="hero-sticker"><Sparkles size={19} /><span>Care that<br />grows with you</span></div>
            <span className="hero-image-label">JAMBIANI · ZANZIBAR</span>
          </div>
          <a className="scroll-cue" href="#our-work" aria-label="Scroll to our work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </div>
      </section>

      <section className="impact-strip" aria-label="About the centre">
        <div className="container impact-inner">
          <p><span className="impact-number">~50</span><span>children & young adults</span></p>
          <span className="impact-divider" />
          <p><MapPin size={17} className="mint-icon" /><span>Growing together in <strong>Jambiani, Zanzibar</strong></span></p>
          <span className="impact-divider" />
          <p><HeartHandshake size={18} className="mint-icon" /><span>Every child has a place here</span></p>
        </div>
      </section>

      <section className="work-section container" id="our-work" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow">A brighter day starts here</p><h2 id="work-title">Care that meets each child <span>where they are.</span></h2></div>
          <p className="section-intro">Every child has their own way forward. We bring learning, movement and attentive care together to help them find it.</p>
        </div>

        <div className="feature-row">
          <div className="feature-photo feature-photo-first">
            <Image src="/meal-volunteers.jpg" alt="Volunteers preparing nourishing meals for children" fill sizes="(max-width: 800px) 100vw, 46vw" />
            <span className="photo-tag"><Heart size={13} fill="currentColor" /> Nurture in every detail</span>
          </div>
          <div className="feature-copy">
            <span className="feature-index">01 — CARE & NOURISHMENT</span>
            <h3>Good food.<br />Gentle care.<br /><span>More good days.</span></h3>
            <p>Specialist support and nutritious meals make a difference in how children feel, learn and take part in the world around them.</p>
            <Link href="/donate" className="arrow-link">Help provide care <ArrowUpRight size={17} /></Link>
            <div className="feature-stats"><div><span className="stat-mark">✳</span><span>Care with<br />understanding</span></div><div><span className="stat-mark">♡</span><span>Every child<br />is welcomed</span></div></div>
          </div>
        </div>

        <div className="feature-row feature-row-reverse">
          <div className="feature-photo feature-photo-second">
            <Image src="/community-volunteers.jpg" alt="Volunteers working together to distribute donated produce" fill sizes="(max-width: 800px) 100vw, 46vw" />
            <div className="photo-overlay-caption"><span>Stronger, side by side</span><ArrowUpRight size={17} /></div>
          </div>
          <div className="feature-copy feature-copy-second">
            <span className="feature-index">02 — LEARNING & MOVEMENT</span>
            <h3>Little steps.<br /><span>Big beginnings.</span></h3>
            <p>Individualized education, sensory activities and physical therapy help young people practice skills at their own pace.</p>
            <Link href="/contact" className="arrow-link">Get to know the centre <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div className="container">
          <div className="values-heading"><p className="eyebrow">The way we care</p><h2 id="values-title">Every child.<br /><span>Every possibility.</span></h2><p>Progress looks different for everyone. What matters is having caring people beside you for each new step.</p></div>
          <div className="values-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="value-card" key={title}><div className="value-card-top"><span className="value-icon"><Icon size={20} /></span><span className="value-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><ArrowUpRight size={16} className="value-arrow" /></article>)}</div>
        </div>
      </section>

      <section className="stories-section container">
        <div className="stories-banner">
          <Image src="/community-volunteers.jpg" alt="Community volunteers sharing donated food and supplies" fill sizes="100vw" />
          <div className="stories-shade" />
          <div className="stories-content"><span className="stories-kicker"><span className="eyebrow-dot" /> COMMUNITY MAKES IT POSSIBLE</span><h2>When we show up<br />for one another, <em>we all grow.</em></h2><p>Be part of a community where every child is seen and every step forward matters.</p><div className="stories-actions"><Link href="/donate" className="button button-light">Stand with a child <ArrowUpRight size={17} /></Link><Link href="/contact" className="stories-learn">Come say hello <ArrowRight size={16} /></Link></div></div>
          <span className="stories-location"><MapPin size={14} /> Jambiani, Zanzibar</span>
        </div>
      </section>

      <section className="final-cta container"><div className="cta-flower">✳</div><div><p className="eyebrow">A little support goes a long way</p><h2>Make room for <span>more possibility.</span></h2></div><Link href="/donate" className="button button-mint">Make a difference <MoveUpRight size={17} /></Link></section>
    </div>
  )
}
