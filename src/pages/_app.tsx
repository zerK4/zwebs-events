/**
 * @author Sebastian Pavel
 */

import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='bg-neutral-900 text-neutral-200 min-h-screen'>
    <Component {...pageProps} />
  </div>
}
