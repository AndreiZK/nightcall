import { Html, Head, Main, NextScript } from 'next/document'
import { author, url, title, description, twitter } from './_app'


export default function Document() {
    return (
        <Html lang="en" style={{ background: '#000' }}>
            <Head>
                {/* Recommended Meta Tags */}
                <meta charSet='utf-8' />
                <meta name='language' content='english' />
                <meta httpEquiv='content-type' content='text/html' />
                <meta name='author' content={author} />
                <meta name='designer' content={author} />
                <meta name='publisher' content={author} />

                {/* Search Engine Optimization Meta Tags */}
                <meta name='robots' content='index,follow' />
                <meta name='distribution' content='web' />
                {/* 
                Facebook Open Graph meta tags
                    documentation: https://developers.facebook.com/docs/sharing/opengraph */}
                <meta property='og:title' content={title} />
                <meta property='og:type' content='site' />
                <meta property='og:url' content={url} />
                <meta property='og:image' content={'/icons/share.png'} />
                <meta property='og:site_name' content={title} />
                <meta property='og:description' content={description} />

                <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
                <link rel='apple-touch-icon' sizes='16x16' href='/icons/favicon-16x16.png' />
                <link rel='apple-touch-icon' sizes='32x32' href='/icons/favicon-32x32.png' />
                <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
                <link rel='manifest' href='/manifest.json' />
                <link rel='mask-icon' color='#000000' href='/icons/safari-pinned-tab.svg' />
                <link rel='apple-touch-startup-image' href='/icons/startup.png' />

                {/* Meta Tags for HTML pages on Mobile */}
                {/* <meta name="format-detection" content="telephone=yes"/>
                    <meta name="HandheldFriendly" content="true"/>  */}

                <link rel='shortcut icon' href='/icons/apple-touch-icon.png' />

                {/* 
                Twitter Summary card
                    documentation: https://dev.twitter.com/cards/getting-started
                    Be sure validate your Twitter card markup on the documentation site. */}
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:site' content={twitter} />
            </Head>
            <body style={{ opacity: 0 }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
