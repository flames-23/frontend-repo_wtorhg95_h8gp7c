// Simple local mock data and helpers to keep the app working without a backend

export const MOCK_PRODUCTS = [
  // Licenses (30 days)
  {
    id: 'lic-r6-30',
    title: 'Rainbow Six License 30 Days',
    category: 'license',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Instant key delivery',
    game: 'rainbow6',
    duration_days: 30,
  },
  {
    id: 'lic-csgo-30',
    title: 'CS:GO License 30 Days',
    category: 'license',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Instant key delivery',
    game: 'csgo',
    duration_days: 30,
  },
  {
    id: 'lic-ow-30',
    title: 'Overwatch License 30 Days',
    category: 'license',
    price: 27.99,
    images: [
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Instant key delivery',
    game: 'overwatch',
    duration_days: 30,
  },
  {
    id: 'lic-fivem-30',
    title: 'FiveM License 30 Days',
    category: 'license',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1542097246-02035e88f315?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Instant key delivery',
    game: 'fivem',
    duration_days: 30,
  },
  {
    id: 'lic-vmp-30',
    title: 'VMP (FiveM) License 30 Days',
    category: 'license',
    price: 22.99,
    images: [
      'https://images.unsplash.com/photo-1542751371-569284f0f2c9?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Instant key delivery',
    game: 'fivem',
    duration_days: 30,
  },
  // Hardware
  {
    id: 'hw-arduino-uno-r3',
    title: 'Arduino Uno R3',
    category: 'hardware',
    price: 14.99,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
    ],
    delivery_info: 'Ships in 24h. Includes USB cable.',
  },
]

export function filterProducts(type = 'hardware', game = null) {
  let list = [...MOCK_PRODUCTS]
  if (type === 'hardware') {
    list = list.filter(p => p.category === 'hardware')
  } else if (type === 'licenses') {
    list = list.filter(p => p.category === 'license')
    if (game) list = list.filter(p => (p.game || '').toLowerCase() === String(game).toLowerCase())
  }
  return list
}

export function getLicenseGames() {
  const set = new Set(
    MOCK_PRODUCTS
      .filter(p => p.category === 'license' && p.game)
      .map(p => String(p.game).toLowerCase())
  )
  return Array.from(set)
}

export function fetchProductsFallback({ type = 'hardware', game = null } = {}) {
  return Promise.resolve(filterProducts(type, game))
}

export function fetchLicenseGamesFallback() {
  return Promise.resolve(getLicenseGames())
}
