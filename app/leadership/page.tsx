import Link from 'next/link'

const leaders = [
  {
    initials: 'MK',
    name: 'Jina la Mkurugenzi',
    title: 'Mkurugenzi Mtendaji',
    bio: 'Anasimamia mwelekeo na huduma zote za kituo.',
  },
  {
    initials: 'MM',
    name: 'Jina la Muuguzi Mkuu',
    title: 'Muuguzi Mkuu',
    bio: 'Anaongoza vipimo, chanjo na matibabu.',
  },
  {
    initials: 'ML',
    name: 'Jina la Mtaalamu wa Lishe',
    title: 'Mtaalamu wa Lishe',
    bio: 'Anapanga mlo na kufuatilia ukuaji wa watoto wenye utapiamlo.',
  },
  {
    initials: 'MT',
    name: 'Jina la Mtaalamu wa Tiba ya Mwili',
    title: 'Mtaalamu wa Tiba ya Mwili',
    bio: 'Anasimamia mazoezi na vifaa saidizi kwa watoto wenye ulemavu.',
  },
  {
    initials: 'MH',
    name: 'Jina la Mhasibu',
    title: 'Mhasibu',
    bio: 'Anahakikisha michango inatumika kwa uwazi.',
  },
  {
    initials: 'MW',
    name: 'Jina la Mratibu wa Wazazi',
    title: 'Mratibu wa Wazazi',
    bio: 'Anawasaidia wazazi na walezi kupata huduma.',
  },
]

export default function LeadershipPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary"></h1>
        <p className="text-muted-foreground">
          Timu inayosimamia huduma na usalama wa watoto wetu.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader, idx) => (
          <div key={idx} className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-card border border-input p-6 shadow hover:shadow-lg transition-shadow">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg group-hover:scale-105 transition-transform">
                {leader.initials}
              </div>
              <h3 className="text-lg font-semibold">{leader.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{leader.title}</p>
              <p className="text-sm text-muted-foreground">{leader.bio}</p>
            </div>
            <Link
              href="#"
              className="absolute inset-0 z-10"
              aria-label={`Tafsiri zaidi kuhusu ${leader.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}