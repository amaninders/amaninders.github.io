import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Portfolio and blog of Amaninder Singh, a web developer and SEO expert." />
        <meta property="og:url" content="https://amaninder.com/" />
        <link rel="canonical" href="https://amaninder.com/" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Amaninder Singh" />
        <meta property="og:description" content="Portfolio of Amaninder Singh, a solutions engineer with full-stack technical expertise and a talent for translating complex requirements into elegant implementations." />
        <meta property="og:title" content="Amaninder Singh | Web Developer & SEO Expert" />
        <meta property="og:image" content="/images/zcbfudPA2AVY.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter.:site" content="@jattster" />
        <meta name="twitter:title" content="Amaninder Singh | Web Developer & SEO Expert" />
        <meta name="twitter:description" content="Portfolio and blog of Amaninder Singh, a web developer and SEO expert." />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <body className="mx-12 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] min-h-screen bg-white font-sans text-slate-700 antialiased dark:bg-neutral-900/75 dark:text-slate-400 antialiased">
          <Main />
          <NextScript />
        </body>
    </Html>
  );
}
