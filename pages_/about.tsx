import Link from 'next-translate/Link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';
import Flag from '../components/Flag';
import Footer from '../components/Footer';

import { Container, Col, Row } from 'reactstrap';

import { Wrapper } from '../styles/content';

const About = () => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();

    return (
        <>
            <NextSeo
                title={t('about:title')}
                description={t('about:description')}
            />

            <Layout>
                <Container>
                    <Wrapper>
                        <h1 className="d-none">{t('about:title')}</h1>
                        <Row>
                            <Col
                                xs={12}
                                lg={5}
                                className="align-self-center d-md-none d-lg-block"
                            >
                                <figure>
                                    <Image
                                        className="author-image"
                                        src="/static/assets/img/jonathan-felipe.jpg"
                                        alt="Jonathan Felipe"
                                        width={600}
                                        height={840}
                                        loading="eager"
                                    />
                                    <figcaption>
                                        <span>{t('about:figureCaption')} </span>
                                        <Flag country="FR" />
                                    </figcaption>
                                </figure>
                            </Col>
                            <Col xs={12} lg={7}>
                                <h2>{t('about:textTitle')} 🤘🏼</h2>
                                {lang === 'pt' ? (
                                    <>
                                        <p>
                                            Peakseekers nasceu de uma paixão de
                                            seu desenvolvedor (
                                            <a
                                                href="https://jofelipe.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Jonathan Felipe
                                            </a>
                                            ) por montanhas e tecnologia. A
                                            ideia inicial era desenvolver um
                                            aplicativo para para estudos, mas
                                            aos poucos, novas motivações foram
                                            surgindo, tendo como meta ser uma
                                            plataforma para usuários contarem
                                            histórias sobre suas conquistas em
                                            montanhas. Sem foco em likes e
                                            seguidores, mas sim, com o desejo de
                                            inspirar novas pessoas a terem mais
                                            contato com a natureza que nos
                                            rodeia.{' '}
                                        </p>
                                        <p>
                                            O Peakseekers tem como sua missão
                                            ser uma das plataformas mais
                                            amigáveis possíveis para nós,
                                            aventureiros, buscando ter o maior
                                            número possível de informações sobre
                                            montanhas. Das pessoas mais
                                            aficionadas aos bons contadores de
                                            história, do trilheiro de
                                            fim-de-semana ao montanhista
                                            profissional,{' '}
                                            <strong>
                                                todos são bem-vindos
                                            </strong>
                                            .
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Peakseekers was born out of a
                                            passion of its developer (
                                            <a
                                                href="https://jofelipe.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Jonathan Felipe
                                            </a>
                                            ) for mountains and technology. The
                                            initial idea was to develop an
                                            application for studies, but little
                                            by little, new motivations were
                                            emerging, aiming to be a platform
                                            for users to tell stories about
                                            their achievements in mountains. No
                                            focus on likes and followers, but
                                            with the desire to inspire new
                                            people to have more contact with the
                                            nature that surrounds us.
                                        </p>
                                        <p>
                                            Peakseekers's mission is to be one
                                            of the friendliest platforms
                                            possible for us explorers, seeking
                                            to have as much information about
                                            mountains as possible. From the most
                                            passionate people to the good
                                            storytellers, from the weekend hiker
                                            to the professional mountaineer,{' '}
                                            <strong>everyone is welcome</strong>
                                            .
                                        </p>
                                    </>
                                )}
                                <h3>{t('about:isAnotherSocialNetwork')}</h3>
                                {lang === 'pt' ? (
                                    <>
                                        <p>
                                            Sim. E não. Além do foco em
                                            aventureiros descrito acima, temos o
                                            respeito à{' '}
                                            <Link
                                                href="/privacy-policy"
                                                lang={lang}
                                            >
                                                <a>privacidade</a>
                                            </Link>{' '}
                                            como um de nossos pilares, buscando
                                            chegar o mais próximo possível de
                                            uma "rede social ideal", na mente de
                                            seu desenvolvedor.{' '}
                                            <strong>
                                                Sem propagandas direcionadas,
                                                sem manipulação comportamental e
                                                sem marketing abusivo.
                                            </strong>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Yes and no. In addition to the focus
                                            on explorers described above, we
                                            respect privacy as one of our
                                            pillars, seeking to get as close as
                                            possible to an "ideal social
                                            network", in the mind of its
                                            developer.{' '}
                                            <strong>
                                                No targeted advertising, no
                                                behavioral manipulation and no
                                                abusive marketing.
                                            </strong>
                                        </p>
                                    </>
                                )}
                                <h4>{t('about:engagementAlgorithms')}</h4>
                                {lang === 'pt' ? (
                                    <>
                                        <p>
                                            Os algoritmos usados em nossa
                                            plataforma <b>não são focados</b> em
                                            engajamento através de métricas como
                                            likes e seguidores. Isso pode fazer
                                            você ficar pouco tempo em nossa
                                            plataforma, é verdade. Porém, nosso
                                            foco está em um ambiente de
                                            compartilhamento de histórias que
                                            inspiram pessoas. Apenas isso.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            The algorithms used on our platform{' '}
                                            <b>are not focused</b> on engagement
                                            through metrics like likes and
                                            followers. This can make you stay
                                            for a short time on our platform, it
                                            is true. However, our focus is on an
                                            platform for sharing stories that
                                            inspire people. Just that.
                                        </p>
                                    </>
                                )}
                                {lang === 'pt' ? (
                                    <>
                                        <p>
                                            No mais, caso tenha alguma dúvida,
                                            sugestão ou queira mandar apenas um
                                            "oi", não hesite em nos contatar em{' '}
                                            <a href="mailto:hi@peakseekers.app">
                                                hi@peakseekers.app
                                            </a>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Last, if you have any questions,
                                            suggestions or just want to say
                                            "hi", do not hesitate to contact us
                                            at{' '}
                                            <a href="mailto:hi@peakseekers.app">
                                                hi@peakseekers.app
                                            </a>
                                        </p>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Wrapper>
                </Container>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
};

export default About;
