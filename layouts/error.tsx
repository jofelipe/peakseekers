import React from 'react';
import Head from 'next/head';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../hooks/auth';

import { ArrowLeftIcon, GearIcon } from '@primer/octicons-react';

import Illustration from '../components/svg/Illustration';
import Logo from '../components/svg/Logo';
import Tapbar from '../components/Tapbar';
import Footer from '../components/Footer';

import { Container } from 'reactstrap';

import {
    Header,
    BackButton,
    SettingsLink,
    MainWrapper,
    ErrorWrapper,
} from './styles';

interface MainProps {
    isPrivateRoute?: boolean;
    errorTitle: string;
    errorText: string;
}

const Error: React.FC<MainProps> = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const { lang } = useTranslation();

    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Header className={isAuthenticated ? 'user-authenticated' : ''}>
                <Container>
                    {isAuthenticated && (
                        <>
                            <BackButton className="d-block d-md-none">
                                <button onClick={() => Router.back()}>
                                    <ArrowLeftIcon size={24} />
                                </button>
                            </BackButton>

                            <SettingsLink className="d-block d-md-none">
                                <Link href="/settings" lang={lang}>
                                    <a>
                                        <GearIcon size={24} />
                                    </a>
                                </Link>
                            </SettingsLink>
                        </>
                    )}
                    <Link href="/" lang={lang}>
                        <a className="logo">
                            <Logo />
                        </a>
                    </Link>
                </Container>
            </Header>

            <MainWrapper {...rest}>
                <ErrorWrapper>
                    <Illustration />
                    <h1>{rest.errorTitle}</h1>
                    <p>{rest.errorText}</p>
                    <button
                        onClick={() =>
                            Router.pushI18n({ url: '/', options: { lang } })
                        }
                    >
                        {lang === 'pt'
                            ? 'Voltar para home'
                            : 'Back to homepage'}
                    </button>
                </ErrorWrapper>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </MainWrapper>
        </>
    );
};

export default Error;
