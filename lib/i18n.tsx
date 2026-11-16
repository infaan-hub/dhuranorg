'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'en' | 'sw'

const dict: Record<Lang, Record<string, string>> = {
  en: {
    about: 'About',
    programmes: 'Programmes',
    news: 'News',
    gallery: 'Gallery',
    resources: 'Resources',
    contact: 'Contact us',
    connect: 'Connect with us',
    dark: 'Dark mode',
    search: 'Search',
    events: 'Events',
    faq: 'FAQ',
  },
  sw: {
    about: 'Kuhusu',
    programmes: 'Mipango',
    news: 'Habari',
    gallery: 'Picha',
    resources: 'Rasilimali',
    contact: 'Wasiliana',
    connect: 'Ungana nasi',
    dark: 'Hali ya giza',
    search: 'Tafuta',
    events: 'Matukio',
    faq: 'Maswali',
  },
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string } | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'sw') setLangState(saved)
  }, [])
  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
  }
  function t(k: string) {
    return dict[lang][k] ?? k
  }
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) return { lang: 'en' as Lang, setLang: () => {}, t: (k: string) => k }
  return ctx
}