import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Laidyout from '../componentoes/Laidyout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Laidyout>
    <Component {...pageProps} />
    </Laidyout>
  )

}
