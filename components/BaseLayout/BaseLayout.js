import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Head from 'next/head'
import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin'], variable: "--font-figtree"})

export default function BaseLayout({title, children}) {
  return (
    <div className='h-screen flex flex-col'>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Next.js Page Router Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header></Header>
        <main className={`grow ${figtree.variable}`}>
            {children}
        </main>
        <Footer></Footer>
    </div>
  )
}
