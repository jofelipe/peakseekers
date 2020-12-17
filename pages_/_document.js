import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import documentLang from 'next-translate/documentLang';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang={documentLang(this.props)}>
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-YTDBND4CH2"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-YTDBND4CH2",{page_path:window.location.pathname});`,
                        }}
                    />
                </Head>
                <body>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(){function e(e){document.body.className=e,window.__theme=e,window.__onThemeChange(e)}window.__onThemeChange=function(){},window.__setPreferredTheme=function(t){e(t);try{localStorage.setItem("theme",JSON.stringify(window.__theme))}catch(e){}};const t=window.matchMedia("(prefers-color-scheme: dark)");let n;t.addListener(function(e){window.__setPreferredTheme(e.matches?"dark":"light")});try{n=JSON.parse(localStorage.getItem("theme"))}catch(e){}e(n||(t.matches?"dark":"light"))}();`,
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
