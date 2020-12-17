import React, { useEffect } from 'react';
import AppProvider from '../hooks';

import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { ModalProvider } from 'styled-react-modal';

import config from '../i18n.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'cropperjs/dist/cropper.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/global.css';

import { ModalBackground } from '../styles/modal';

function useLanguageDetection() {
    const router = useRouter();

    useEffect(() => {
        const [, langQuery] = router.asPath.split('/');

        if (config.allLanguages.some((l) => l === langQuery)) return;

        const navLang = navigator.language || navigator.userLanguage || '';
        const userLang = navLang.split('-')[0];

        if (userLang === 'en') {
            return;
        }

        function getLangRoute(lang) {
            return {
                pathname: `/${lang}${router.asPath}`,
            };
        }

        if (config.allLanguages.some((l) => l === userLang)) {
            router.replace(getLangRoute(userLang));
            return;
        }

        router.replace(getLangRoute(config.defaultLanguage));
    }, []);
}

const MyApp = ({ Component, pageProps }) => {
    useLanguageDetection();

    return (
        <>
            <DefaultSeo
                title="Peakseekers"
                titleTemplate="%s - Peakseekers"
                description="A platform developed especially for explorers to share stories about their summits in mountains around the world."
                openGraph={{
                    type: 'website',
                    locale: 'en_US',
                    url: 'https://peakseekers.app/',
                    site_name: 'Peakseekers',
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_HOME_URL}/static/assets/img/opengraph.png`,
                            alt: 'Peakseekers',
                        },
                    ],
                }}
            />

            <AppProvider>
                <ModalProvider backgroundComponent={ModalBackground}>
                    <Component {...pageProps} />
                </ModalProvider>
            </AppProvider>
        </>
    );
};

export default MyApp;
