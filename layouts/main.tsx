import React, { useState, useEffect } from 'react';
import Link from 'next-translate/Link';
import GoogleFonts from 'next-google-fonts';
import Router from 'next-translate/Router';
import Cookies from 'js-cookie';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../hooks/auth';

import { ArrowLeftIcon, GearIcon } from '@primer/octicons-react';

import Logo from '../components/svg/Logo';

import { Container, Alert } from 'reactstrap';

import { Header, BackButton, SettingsLink, MainWrapper, LGPD } from './styles';

interface MainProps {
    isPrivateRoute?: boolean;
}

const Main: React.FC<MainProps> = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();

    const [alertVisible, setAlertVisible] = useState(true);

    const handleLGPDMessage = () => {
        Cookies.set('acceptLGPD', true, { expires: 365 });
        setAlertVisible(false);
    };

    useEffect(() => {
        const acceptLGPD = Cookies.get('acceptLGPD');

        if (acceptLGPD) {
            setAlertVisible(false);
        }
    }, []);

    return (
        <>
            <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" />

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
                {children}

                <LGPD>
                    <Container>
                        <Alert color="secondary" isOpen={alertVisible}>
                            <p>
                                {lang === 'pt' ? (
                                    <>
                                        Sim, nós usamos Cookies. <br />
                                        Clique{' '}
                                        <Link
                                            href="/privacy-policy"
                                            lang={lang}
                                        >
                                            <a>aqui</a>
                                        </Link>{' '}
                                        para ler nossa Política de Privacidade.
                                    </>
                                ) : (
                                    <>
                                        Yes, we use Cookies. <br />
                                        Click{' '}
                                        <Link
                                            href="/privacy-policy"
                                            lang={lang}
                                        >
                                            <a>here</a>
                                        </Link>{' '}
                                        to read our Privacy Policy.
                                    </>
                                )}
                            </p>
                            <button onClick={handleLGPDMessage}>
                                {t('common:LGPDButton')} 🍪
                            </button>
                        </Alert>
                    </Container>
                </LGPD>
            </MainWrapper>
        </>
    );
};

export default Main;
