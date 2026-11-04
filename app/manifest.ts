import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest { return { name: 'Kingsen Automotive Automation Equipment', short_name: 'Kingsen', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#14161a', icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }] } }
