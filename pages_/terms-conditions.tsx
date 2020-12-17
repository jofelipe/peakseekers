import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';
import Footer from '../components/Footer';

import { Container } from 'reactstrap';

import { Wrapper } from '../styles/content';

const TermsConditions = () => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();

    return (
        <>
            <NextSeo title={t('terms_conditions:title')} />

            <Layout>
                <Container>
                    <Wrapper>
                        <h1>{t('terms_conditions:title')}</h1>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Ao fazer o download de nosso aplicativo ou
                                    usar a plataforma, estes termos se aplicam
                                    automaticamente a você - portanto,
                                    certifique-se de lê-los com atenção antes de
                                    usar o aplicativo.
                                </p>
                                <p>
                                    Peakseekers tem o compromisso de garantir
                                    que o aplicativo seja o mais útil e
                                    eficiente possível. Por esse motivo, nos
                                    reservamos o direito de fazer alterações no
                                    aplicativo, a qualquer momento e por
                                    qualquer motivo. Nós nunca iremos cobrar
                                    pelo aplicativo ou seu serviço.
                                </p>
                                <p>
                                    Peakseekers armazena e processa dados
                                    pessoais que você nos forneceu, a fim de
                                    fornecer o nosso serviço. É sua
                                    responsabilidade manter seu telefone e o
                                    acesso ao aplicativo seguros. Portanto,
                                    recomendamos que você não execute jailbreak
                                    ou root em seu telefone, que é o processo de
                                    remoção de restrições e limitações de
                                    software impostas pelo sistema operacional
                                    oficial de seu dispositivo. Isso pode tornar
                                    seu telefone vulnerável a
                                    malware/vírus/programas maliciosos,
                                    comprometer os recursos de segurança do seu
                                    telefone e pode significar que o aplicativo
                                    Peakseekers não funcionará corretamente ou
                                    não funcionará de todo.
                                </p>
                                <p>
                                    O aplicativo usa serviços de terceiros que
                                    declaram seus próprios Termos e Condições.{' '}
                                    <br />
                                    Link para os Termos e Condições de
                                    provedores de serviços terceirizados usados
                                    pela plataforma:
                                </p>
                            </>
                        ) : (
                            <p>
                                <p>
                                    By downloading our app or using the
                                    platform, these terms will automatically
                                    apply to you – you should make sure
                                    therefore that you read them carefully
                                    before using the app.
                                </p>
                                <p>
                                    Peakseekers is committed to ensuring that
                                    the app is as useful and efficient as
                                    possible. For that reason, we reserve the
                                    right to make changes to the app, at any
                                    time and for any reason. We will never
                                    charge you for the app or its services.
                                </p>
                                <p>
                                    Peakseekers app stores and processes
                                    personal data that you have provided to us,
                                    in order to provide our service. It’s your
                                    responsibility to keep your phone and access
                                    to the app secure. We therefore recommend
                                    that you do not jailbreak or root your
                                    phone, which is the process of removing
                                    software restrictions and limitations
                                    imposed by the official operating system of
                                    your device. It could make your phone
                                    vulnerable to malware/viruses/malicious
                                    programs, compromise your phone’s security
                                    features and it could mean that the
                                    Peakseekers app won’t work properly or at
                                    all.
                                </p>
                                <p>
                                    The app does use third party services that
                                    declare their own Terms and Conditions.{' '}
                                    <br />
                                    Link to Terms and Conditions of third party
                                    service providers used by the platform:
                                </p>
                            </p>
                        )}
                        <ul>
                            <li>
                                <a
                                    href="https://policies.google.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google Play Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://firebase.google.com/terms/analytics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google Analytics Firebase
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://firebase.google.com/terms/crashlytics"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Firebase Crashlytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/terms.php"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.algolia.com/policies/terms/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Algolia
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vercel.com/legal/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Vercel
                                </a>
                            </li>
                        </ul>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Você deve estar ciente de que há certas
                                    coisas pelas quais o Peakseekers não se
                                    responsabiliza. Certas funções do aplicativo
                                    exigirão que o aplicativo tenha uma conexão
                                    ativa com a Internet. A conexão pode ser
                                    Wi-Fi ou fornecida por seu provedor de rede
                                    móvel, mas o Peakseekers não pode se
                                    responsabilizar pelo aplicativo não
                                    funcionar em todas as funções se você não
                                    tiver acesso a Wi-Fi e não tiver nenhum de
                                    seus subsídios de dados restante.
                                </p>
                                <p>
                                    Se você estiver usando o aplicativo fora de
                                    uma área com Wi-Fi, lembre-se de que os
                                    termos do contrato com seu provedor de rede
                                    móvel ainda se aplicam. Como resultado, você
                                    pode ser cobrado por sua operadora de
                                    celular pelo custo dos dados durante a
                                    conexão ao acessar o aplicativo ou outras
                                    cobranças de terceiros.
                                </p>
                                <p>
                                    Ao usar o aplicativo, você aceita a
                                    responsabilidade por quaisquer cobranças,
                                    incluindo taxas de roaming de dados, se usar
                                    o aplicativo fora do seu território (ou
                                    seja, região ou país). Se você não é o
                                    pagador de contas do dispositivo no qual
                                    está usando o aplicativo, esteja ciente de
                                    que presumimos que você recebeu permissão do
                                    pagador de contas para usar o aplicativo.
                                </p>
                                <p>
                                    Da mesma forma, Peakseekers nem sempre pode
                                    assumir a responsabilidade pela maneira como
                                    você usa o aplicativo, ou seja, você precisa
                                    se certificar de que seu dispositivo
                                    permaneça carregado - se ficar sem bateria e
                                    você não puder ligá-lo para aproveitar o
                                    serviço, Peakseekers não pode aceitar a
                                    responsabilidade.
                                </p>
                                <p>
                                    Com relação à responsabilidade do
                                    Peakseekers pelo uso do aplicativo, quando
                                    você estiver usando o aplicativo, é
                                    importante ter em mente que embora nos
                                    esforcemos para garantir que ele esteja
                                    atualizado e correto em todos os momentos,
                                    contamos com terceiros para fornecer
                                    informações para que possamos
                                    disponibilizá-las para você. Peakseekers não
                                    se responsabiliza por qualquer perda, direta
                                    ou indireta, que você experimente como
                                    resultado de confiar totalmente nesta
                                    funcionalidade do aplicativo.
                                </p>
                                <p>
                                    Em algum momento, podemos desejar atualizar
                                    o aplicativo. O aplicativo está disponível
                                    atualmente para Android e iOS - os
                                    requisitos para ambos os sistemas (e para
                                    quaisquer sistemas adicionais aos quais
                                    decidirmos estender a disponibilidade do
                                    aplicativo) podem mudar e você precisará
                                    baixar as atualizações se quiser continuar
                                    usando a aplicação. Peakseekers não promete
                                    que sempre atualizará o aplicativo para que
                                    seja relevante para você e/ou funcione com a
                                    versão Android e iOS instalada em seu
                                    dispositivo.
                                </p>
                                <p>
                                    No entanto, você promete sempre aceitar
                                    atualizações para o aplicativo quando
                                    oferecidas a você. Também podemos desejar
                                    interromper o fornecimento do aplicativo e
                                    pode encerrar o uso dele a qualquer momento,
                                    sem aviso prévio de encerramento para você.
                                    A menos que informemos o contrário, em caso
                                    de rescisão, (a) os direitos e licenças
                                    concedidos a você nestes termos serão
                                    encerrados; (b) você deve parar de usar o
                                    aplicativo e (se necessário) excluí-lo do
                                    dispositivo.
                                </p>
                            </>
                        ) : (
                            <p>
                                <p>
                                    You should be aware that there are certain
                                    things that Peakseekers will not take
                                    responsibility for. Certain functions of the
                                    app will require the app to have an active
                                    internet connection. The connection can be
                                    Wi-Fi, or provided by your mobile network
                                    provider, but Peakseekers cannot take
                                    responsibility for the app not working at
                                    full functionality if you don’t have access
                                    to Wi-Fi, and you don’t have any of your
                                    data allowance left.
                                </p>
                                <p>
                                    If you’re using the app outside of an area
                                    with Wi-Fi, you should remember that your
                                    terms of the agreement with your mobile
                                    network provider will still apply. As a
                                    result, you may be charged by your mobile
                                    provider for the cost of data for the
                                    duration of the connection while accessing
                                    the app, or other third party charges.
                                </p>
                                <p>
                                    In using the app, you’re accepting
                                    responsibility for any such charges,
                                    including roaming data charges if you use
                                    the app outside of your home territory (i.e.
                                    region or country) without turning off data
                                    roaming. If you are not the bill payer for
                                    the device on which you’re using the app,
                                    please be aware that we assume that you have
                                    received permission from the bill payer for
                                    using the app.
                                </p>
                                <p>
                                    Along the same lines, Peakseekers cannot
                                    always take responsibility for the way you
                                    use the app i.e. You need to make sure that
                                    your device stays charged – if it runs out
                                    of battery and you can’t turn it on to avail
                                    the Service, Peakseekers cannot accept
                                    responsibility.
                                </p>
                                <p>
                                    With respect to Peakseekers responsibility
                                    for your use of the app, when you’re using
                                    the app, it’s important to bear in mind that
                                    although we endeavour to ensure that it is
                                    updated and correct at all times, we do rely
                                    on third parties to provide information to
                                    us so that we can make it available to you.
                                    Peakseekers accepts no liability for any
                                    loss, direct or indirect, you experience as
                                    a result of relying wholly on this
                                    functionality of the app.
                                </p>
                                <p>
                                    At some point, we may wish to update the
                                    app. The app is currently available on
                                    Android &amp; iOS – the requirements for
                                    both systems(and for any additional systems
                                    we decide to extend the availability of the
                                    app to) may change, and you’ll need to
                                    download the updates if you want to keep
                                    using the app. Peakseekers does not promise
                                    that it will always update the app so that
                                    it is relevant to you and/or works with the
                                    Android &amp; iOS version that you have
                                    installed on your device.
                                </p>
                                <p>
                                    However, you promise to always accept
                                    updates to the application when offered to
                                    you, We may also wish to stop providing the
                                    app, and may terminate use of it at any time
                                    without giving notice of termination to you.
                                    Unless we tell you otherwise, upon any
                                    termination, (a) the rights and licenses
                                    granted to you in these terms will end; (b)
                                    you must stop using the app, and (if needed)
                                    delete it from your device.
                                </p>
                            </p>
                        )}
                        <h2>{t('terms_conditions:changes')}</h2>
                        {lang === 'pt' ? (
                            <>
                                <p>
                                    Peakseekers pode atualizar estes Termos e
                                    Condições de tempos em tempos. Portanto,
                                    recomendamos que você revise esta página
                                    periodicamente para verificar quaisquer
                                    alterações. Iremos notificá-lo de quaisquer
                                    alterações, publicando os novos Termos e
                                    Condições nesta página.
                                </p>
                                <p>
                                    Estes termos e condições são válidos a
                                    partir de 07/03/2020.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Peakseekers may update this Terms and
                                    Conditions from time to time. Thus, you are
                                    advised to review this page periodically for
                                    any changes. I will notify you of any
                                    changes by posting the new Terms and
                                    Conditions on this page.
                                </p>
                                <p>
                                    These terms and conditions are effective as
                                    of 07/03/2020.
                                </p>
                            </>
                        )}
                        <h2>{t('terms_conditions:contact')}</h2>
                        {lang === 'pt' ? (
                            <p>
                                Se você tiver alguma dúvida ou sugestão sobre
                                nossos Termos &amp; Condições, não hesite em nos
                                contatar em{' '}
                                <a href="mailto:hi@peakseekers.app">
                                    hi@peakseekers.app
                                </a>
                            </p>
                        ) : (
                            <p>
                                If you have any questions or suggestions about
                                our Terms &amp; Conditions, please do not
                                hesitate to contact us at{' '}
                                <a href="mailto:hi@peakseekers.app">
                                    hi@peakseekers.app
                                </a>
                            </p>
                        )}
                    </Wrapper>
                </Container>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
};

export default TermsConditions;
