import Head from 'next/head';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Amaninder Singh | Web Developer & SEO Expert</title>
        <meta name="description" content="Amaninder Singh's personal website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
         <Main />
      </div>
      <Footer />
    </>
  );
}