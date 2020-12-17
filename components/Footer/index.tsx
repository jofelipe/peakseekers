import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import Logo from '../svg/Logo';
import Instagram from '../svg/Instagram';

import { Container, Row, Col } from 'reactstrap';

import { FooterElement, FooterMenu } from './styles';

const Footer = () => {
    const { t, lang } = useTranslation();

    return (
        <>
            <FooterElement>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <Link href="/" lang={lang}>
                                <a className="footer-logo">
                                    <Logo />
                                </a>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <FooterMenu>
                                <ul>
                                    <li>
                                        <Link href="/about" lang={lang}>
                                            <a>
                                                {t('common:footer.aboutMenu')}
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy-policy"
                                            lang={lang}
                                        >
                                            <a>
                                                {t('common:footer.privacyMenu')}
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms-conditions"
                                            lang={lang}
                                        >
                                            <a>
                                                {t('common:footer.termsMenu')}
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/report-error" lang={lang}>
                                            <a>
                                                {t(
                                                    'common:footer.reportErrorMenu'
                                                )}
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </FooterMenu>
                        </Col>
                        <Col lg={3}>
                            <a
                                href="mailto:hi@peakseekers.app"
                                className="peakseekers-mail"
                            >
                                hi@peakseekers.app
                            </a>
                            <a
                                href="https://www.instagram.com/peakseekers.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="instagram-link"
                            >
                                <Instagram />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </FooterElement>
        </>
    );
};

export default Footer;
