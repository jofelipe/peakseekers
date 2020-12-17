import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';
import Footer from '../components/Footer';

import { Container } from 'reactstrap';

import { Wrapper } from '../styles/content';

const PrivacyPolicy = () => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();

    return (
        <>
            <NextSeo title={t('privacy_policy:title')} />

            <Layout>
                <Container>
                    <Wrapper>
                        <h1>{t('privacy_policy:title')}</h1>
                        <p>{t('privacy_policy:pagesAreLong')} 😕</p>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Porém, é <b>essencial</b> nos dias de hoje
                                    sabermos como serviços utilizados por nós
                                    lidam com a coleta e o uso de nossas
                                    informações pessoais.
                                </p>
                                <p>
                                    Se você optar por usar o Peakseekers, você
                                    concorda com a coleta e uso de informações
                                    em relação a esta política. As informações
                                    pessoais que coletamos são usadas para
                                    fornecer e melhorar nossa plataforma.{' '}
                                    <strong>
                                        Não usaremos ou compartilharemos suas
                                        informações com ninguém
                                    </strong>
                                    , exceto conforme descrito nesta Política de
                                    Privacidade.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    However, it is <b>essential</b> nowadays to
                                    know how services used by us deal with the
                                    collection and use of our personal data.
                                </p>
                                <p>
                                    If you choose to use Peakseekers, you
                                    consent to the collection and use of
                                    information in connection with this policy.
                                    The personal information we collect is used
                                    to provide and improve our platform.{' '}
                                    <strong>
                                        We will not use or share your
                                        information with anyone except as
                                        described in this Privacy Policy
                                    </strong>
                                    .
                                </p>
                            </>
                        )}
                        <h2>{t('privacy_policy:sponsoredAds')}</h2>
                        {lang === 'pt' ? (
                            <p>
                                O Peakseekers foi desenvolvido primeiramente
                                para aprendizado de seu desenvolvedor. Por mais
                                que hajam custos relacionados ao desenvolvimento
                                e manutenção,{' '}
                                <strong>
                                    NÃO EXIBIREMOS ANÚNCIOS PATROCINADOS EM
                                    NOSSA PLATAFORMA
                                </strong>
                                . Isso envolve prejuízo financeiro mas também
                                satisfação por oferecer um serviço livre de
                                anúncios para seus usuários.
                            </p>
                        ) : (
                            <p>
                                Peakseekers was developed primarily for the
                                learning of its developer. As much as there are
                                costs related to development and maintenance,{' '}
                                <strong>
                                    WE WILL NOT DISPLAY SPONSORED ANNOUNCEMENTS
                                    ON OUR PLATFORM
                                </strong>
                                . This involves financial loss but also
                                satisfaction for offering an ad-free service to
                                its users.
                            </p>
                        )}
                        <h2>{t('privacy_policy:informationCollection')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Para uma melhor experiência, ao usar o
                                    Peakseekers, posso exigir que você nos
                                    forneça certas informações de identificação
                                    pessoal, incluindo <b>nome</b>,{' '}
                                    <b>e-mail</b>, <b>nacionalidade</b> e{' '}
                                    <b></b>foto de perfil.
                                </p>
                                <p>
                                    O aplicativo usa serviços de terceiros que
                                    podem coletar informações usadas para
                                    identificá-lo.{' '}
                                    <b>
                                        Infelizmente não temos controle sobre
                                        isso
                                    </b>
                                    . De qualquer forma, as respectivas
                                    políticas de privacidade podem ser acessadas
                                    através do links abaixo:
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    For the best experience, when using
                                    Peakseekers, I may require you to provide us
                                    with certain personally identifiable
                                    information, including <b>name</b>,{' '}
                                    <b>email</b>, <b>nationality</b> and{' '}
                                    <b>profile photo</b>.
                                </p>
                                <p>
                                    The application uses third-party services
                                    that may collect information used to
                                    identify you.{' '}
                                    <b>
                                        Unfortunately, we have no control over
                                        that
                                    </b>
                                    . Anyway, the respective privacy policies
                                    can be accessed through the links below:
                                </p>
                            </>
                        )}
                        <ul>
                            <li>
                                <a
                                    href="https://www.google.com/policies/privacy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google Play Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://firebase.google.com/policies/analytics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google Analytics Firebase
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://firebase.google.com/support/privacy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Firebase Crashlytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/policy.php"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.algolia.com/policies/privacy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Algolia
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vercel.com/legal/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Vercel
                                </a>
                            </li>
                        </ul>
                        <h2>{t('privacy_policy:additionalData')}</h2>
                        {lang === 'pt' ? (
                            <p>
                                Quero informar que sempre que você utiliza o
                                Peakseekers, em caso de erro no aplicativo, são
                                coletados dados e informações (através de
                                produtos de terceiros) no seu dispositivo
                                chamados <i>Log Data</i>. Estes dados podem
                                incluir informações como endereço de protocolo
                                de Internet ("IP") do dispositivo, nome do
                                dispositivo, versão do sistema operacional,
                                configuração do aplicativo ao utilizar meu
                                serviço, hora e data de uso do serviço e outras
                                estatísticas.
                            </p>
                        ) : (
                            <p>
                                Peakseekers want to inform you that whenever you
                                use Peakseekers, in case of an error in the
                                application, data and information are collected
                                (through third party products) on your device
                                called <i>Log Data</i>. This data may include
                                information such as the device's Internet
                                Protocol ("IP") address, device name, operating
                                system version, application configuration when
                                using my service, time and date of using the
                                service, and other statistics.
                            </p>
                        )}
                        <h2>Cookies</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    <i>Cookies</i> são arquivos com uma pequena
                                    quantidade de dados que são comumente usados
                                    como identificadores exclusivos anônimos.
                                    Eles são enviados para o seu navegador a
                                    partir dos sites que você visita e são
                                    armazenados na memória interna do seu
                                    dispositivo.
                                </p>
                                <p>
                                    Peakseekers e códigos de terceiros e
                                    bibliotecas usam “cookies” para coletar
                                    informações e melhorar seus serviços. Você
                                    tem a opção de aceitar ou recusar esses
                                    cookies e saber quando um cookie está sendo
                                    enviado para o seu dispositivo. Se você
                                    optar por recusar nossos cookies, não será
                                    capaz de utilizar nossa plataforma. 😥
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    <i>Cookies</i> are files with a small amount
                                    of data that are commonly used as anonymous
                                    unique identifiers. They are sent to your
                                    browser from the websites you visit and are
                                    stored in your device's internal memory.
                                </p>
                                <p>
                                    Peakseekers and third party codes and
                                    libraries use "cookies" to collect
                                    information and improve their services. You
                                    have the option to accept or decline these
                                    cookies and to know when a cookie is being
                                    sent to your device. If you choose to
                                    decline our cookies, you will not be able to
                                    use our platform. 😥
                                </p>
                            </>
                        )}
                        <h2>{t('privacy_policy:security')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Valorizamos sua confiança em nos fornecer
                                    suas informações pessoais, portanto, estamos
                                    nos empenhando para usar meios aceitáveis de
                                    protegê-las.
                                </p>
                                <p>
                                    Nossos dados são armazenados de forma
                                    criptografada através do serviço Firebase
                                    oferecido pelo Google. Portanto, trabalhamos
                                    com uma das aplicações mais seguras e
                                    robustas da internet.
                                </p>
                                <p>
                                    Mas lembre-se que nenhum método de
                                    transmissão pela internet, ou método de
                                    armazenamento eletrônico é 100% seguro e
                                    confiável, e não podemos garantir sua
                                    segurança absoluta.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    We value your confidence in providing us
                                    with your personal information, so we are
                                    working hard to use acceptable means to
                                    protect it.
                                </p>
                                <p>
                                    Our data is stored in encrypted form through
                                    the Firebase service offered by Google.
                                    Therefore, we work with one of the most
                                    secure and robust applications on the
                                    internet.
                                </p>
                                <p>
                                    But remember that no method of transmission
                                    over the internet, or method of electronic
                                    storage is 100% safe and reliable, and we
                                    cannot guarantee its absolute security.
                                </p>
                            </>
                        )}
                        <h2>{t('privacy_policy:serviceProviders')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Conforme mencionado acima, utilizamos
                                    serviços de empresas terceirizadas (Google,
                                    Facebook, Algolia e Vercel) pelos seguintes
                                    motivos:
                                </p>
                                <ul>
                                    <li>
                                        Para facilitar o uso de nossa
                                        plataforma;
                                    </li>
                                    <li>
                                        Executar serviços relacionados com a
                                        plataforma; ou
                                    </li>
                                    <li>
                                        Para nos auxiliar na análise de como
                                        nossa plataforma é usada.
                                    </li>
                                </ul>
                                <p>
                                    O Peakseekers deseja informar ao seus
                                    usuários que esses terceiros têm acesso às
                                    suas Informações Pessoais. O motivo é
                                    realizar as tarefas atribuídas a eles em
                                    nosso nome. No entanto, eles são obrigados a
                                    não divulgar ou usar as informações para
                                    qualquer outra finalidade.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    As mentioned above, we use services from
                                    third-party companies (Google, Facebook,
                                    Algolia and Vercel) for the following
                                    reasons:
                                </p>
                                <ul>
                                    <li>
                                        To facilitate the use of our platform;
                                    </li>
                                    <li>
                                        Perform services related to the
                                        platform; or
                                    </li>
                                    <li>
                                        To assist us in analyzing how our
                                        platform is used.
                                    </li>
                                </ul>
                                <p>
                                    Peakseekers wishes to inform its users that
                                    these third parties have access to your
                                    personal data. The reason is to perform the
                                    tasks assigned to them on our behalf.
                                    However, they are required not to disclose
                                    or use the information for any other
                                    purpose.
                                </p>
                            </>
                        )}
                        <h2>{t('privacy_policy:changes')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Podemos atualizar nossa Política de
                                    Privacidade de tempos em tempos. Portanto,
                                    recomendamos que você revise esta página
                                    periodicamente para verificar alterações.
                                    Iremos notificá-lo de alterações postando a
                                    nova Política de Privacidade nesta página.
                                </p>
                                <p>
                                    Esta política é válida a partir de
                                    03/07/2020.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    We may update our Privacy Policy from time
                                    to time. Therefore, we recommend that you
                                    periodically review this page for changes.
                                    We will notify you of changes by posting the
                                    new Privacy Policy on this page.
                                </p>
                                <p>This policy is valid from 2020-07-03.</p>
                            </>
                        )}
                        <h2>{t('privacy_policy:contact')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Se você tiver alguma dúvida ou sugestão
                                    sobre nossa Política de Privacidade, não
                                    hesite em nos contatar em{' '}
                                    <a href="mailto:hi@peakseekers.app">
                                        hi@peakseekers.app
                                    </a>
                                </p>
                                <p>
                                    <small>
                                        Os termos usados nesta Política de
                                        Privacidade têm os mesmos significados
                                        que em nossos Termos e Condições, que
                                        podem ser acessados{' '}
                                        <Link
                                            href="/terms-conditions"
                                            lang={lang}
                                        >
                                            <a>aqui</a>
                                        </Link>
                                        .
                                    </small>
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    If you have any questions or suggestions
                                    about our Privacy Policy, please do not
                                    hesitate to contact us at{' '}
                                    <a href="mailto:hi@peakseekers.app">
                                        hi@peakseekers.app
                                    </a>
                                </p>
                                <p>
                                    <small>
                                        The terms used in this Privacy Policy
                                        have the same meanings as in our Terms
                                        and Conditions, which can be accessed{' '}
                                        <Link
                                            href="/terms-conditions"
                                            lang={lang}
                                        >
                                            <a>here</a>
                                        </Link>
                                        .
                                    </small>
                                </p>
                            </>
                        )}
                    </Wrapper>
                </Container>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
};

export default PrivacyPolicy;
