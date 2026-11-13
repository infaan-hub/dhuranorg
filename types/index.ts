export type Role = 'parent' | 'admin' | null

export interface Child {
  id: string
  no: string           // KM-0001
  pass: string         // parent login password
  jina: string
  tar?: string         // date of birth (ISO)
  jinsia?: string
  kundi?: string
  uzito?: number
  urefu?: number
  lugha?: string
  hali?: string        // care needed
  mahalizaliwa?: string
  uzitoz?: number
  njia?: string
  njiti?: string
  maziwa?: string
  kutembea?: number
  kuongea?: number
  mzio?: string
  sugu?: string
  urithi?: string
  afya?: string
  upasuaji?: string
  chanjo?: string
  ulemavu?: string
  kiwango?: string
  chanzo?: string
  vifaa?: string
  kliniki?: string
  bima?: string
  shule?: string
  wazazi?: string
  uhusiano?: string
  simu?: string        // guardian phone
  kazi?: string
  anwani?: string
  dharura?: string
  next?: string        // next clinic date (ISO)
  foto?: string        // data URL or storage path
  docs: Document[]
  rec: HealthRecord[]
  siku: string         // registration date
  createdAt: string
}

export interface Donation {
  id: string
  kid: string          // child reg no or 'Yeyote'
  huduma: string       // services or 'Huduma zote'
  kiasi: number        // TSh
  aina: string         // donor type
  jina: string
  simu: string
  email?: string
  makazi?: string
  anwani?: string
  mara: string         // frequency
  lipa: string         // payment method
  ujumbe?: string
  siri: boolean        // anonymous
  siku: string
}

export interface Event {
  id: string
  c: string            // description
  v: boolean           // is video
  ts: number           // timestamp
  mediaUrl?: string
}

export interface GalleryItem {
  id: string
  c: string            // caption
  img: string          // data URL or storage path
}

export interface HealthRecord {
  id: string
  tarehe: string
  aina: string
  // dynamic RF fields
  [key: string]: unknown
}

export interface Document {
  t: string            // label
  img: string
}

export interface AuthSession {
  role: Role
  kid?: string         // parent: child reg no
  view?: string        // admin: child being viewed
  act?: string         // 'edit' | 'rec'
}

export interface BankInfo {
  benki: string
  jina: string
  akaunti: string
  tawi: string
  swift: string
  sarafu: string
  link?: string        // card payment link
  maelezo?: string
}

export interface AppData {
  kids: Child[]
  dons: Donation[]
  gal: GalleryItem[]
  ev: Event[]
  tpl?: string         // clinic reminder template
}