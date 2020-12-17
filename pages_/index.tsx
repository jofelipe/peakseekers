import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next-translate/Link';
import Lottie from 'react-lottie-player';
import Router from 'next-translate/Router';
import Image from 'next/image';

import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useForm } from 'react-hook-form';
import { useAlert } from '../hooks/alert';
import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';
import { auth, db } from '../config/firebase';

import { Container, Row, Col, FormGroup } from 'reactstrap';
import {
    PersonIcon,
    MailIcon,
    LockIcon,
    NoteIcon,
    FileMediaIcon,
    SmileyIcon,
    SearchIcon,
    IssueOpenedIcon,
    EyeClosedIcon,
    EyeIcon,
} from '@primer/octicons-react';

import Layout from '../layouts/main';
import Mountains from '../components/svg/Mountains';
import FormControl from '../components/FormControl';
import Divider from '../components/Divider';
import Flag from '../components/Flag';
import AppStore from '../components/svg/AppStore';
import GooglePlay from '../components/svg/GooglePlay';
import Footer from '../components/Footer';

import loadingAnimation from '../animations/loading.json';

import {
    InputError,
    HomeContainer,
    FormContainer,
    MountainsContainer,
    MountainsWrapper,
    FocusedStories,
    FocusedStoriesFeature,
    FocusedStoriesMountainsNumber,
    Application,
    ApplicationButtons,
    Privacy,
    ResetPassword,
} from '../styles/index';
import { StyledModal } from '../styles/modal';

interface RegisterFormData {
    fullname: string;
    email: string;
    password: string;
}

interface LoginFormData {
    email: string;
    password: string;
}

interface ResetPasswordData {
    email: string;
}

const Home = () => {
    const { isAuthenticated, loading, signIn, signInFacebook } = useAuth();
    const { register, handleSubmit, errors } = useForm();
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        errors: errors2,
    } = useForm();
    const {
        register: register3,
        handleSubmit: handleSubmit3,
        errors: errors3,
    } = useForm();
    const { alert } = useAlert();
    const { t, lang } = useTranslation();

    const [loginShown, setLoginShown] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        Router.prefetch('/home');

        if (isAuthenticated && !loading) {
            Router.pushI18n({ url: '/home', options: { lang } });
        }
    }, [isAuthenticated, loading]);

    const handleLoginVisibility = () => {
        setLoginShown(loginShown ? false : true);
    };

    const handlePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleRegisterSubmit = useCallback(async (data: RegisterFormData) => {
        setLoginLoading(true);
        try {
            await api.post('/register', data);

            await signIn({
                email: data.email,
                password: data.password,
            });

            alert({
                type: 'success',
                title: t('common:messages.successfulRegisterTitle'),
                description: t('common:messages.successfulRegisterText'),
            });

            Router.pushI18n({ url: '/home', options: { lang } });
        } catch (err) {
            setLoginLoading(false);
            if (err.message === 'Request failed with status code 303') {
                alert({
                    type: 'error',
                    title: t('common:messages.errorRegisterTitle'),
                    description: t('common:messages.errorRegister303Text'),
                });
            } else {
                alert({
                    type: 'error',
                    title: t('common:messages.errorRegisterTitle'),
                    description: t('common:messages.errorRegisterText'),
                });
            }
        }
    }, []);

    const handleLoginSubmit = useCallback(
        async (data: LoginFormData) => {
            setLoginLoading(true);
            try {
                await signIn({
                    email: data.email,
                    password: data.password,
                });

                Router.pushI18n({ url: '/home', options: { lang } });
            } catch (err) {
                setLoginLoading(false);
                if (err.message == 'Request failed with status code 403') {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorCredentialsLoginTitle'),
                        description: t(
                            'common:messages.errorCredentialsLoginText'
                        ),
                    });
                } else {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorLoginTitle'),
                        description: t('common:messages.errorLoginText'),
                    });
                }
            }
        },
        [alert]
    );

    const handleFacebookLogin = useCallback(() => {
        setFacebookLoading(true);

        auth.doFacebookSignIn()
            .then((authUser) => {
                db.doCreateUser(
                    authUser.user.uid,
                    authUser.user.displayName,
                    authUser.user.email,
                    authUser.user.photoURL
                )
                    .then(() => {
                        return authUser.user.getIdToken();
                    })
                    .then((token) => {
                        return signInFacebook(token);
                    })
                    .then(() => {
                        Router.pushI18n({ url: '/home', options: { lang } });
                    })
                    .catch((error) => {
                        alert({
                            type: 'error',
                            title: t('common:messages.errorFacebookLoginTitle'),
                            description: t(
                                'common:messages.errorFacebookLoginTitle'
                            ),
                        });
                    });
            })
            .catch((error) => {
                alert({
                    type: 'error',
                    title: t('common:messages.errorFacebookLoginTitle'),
                    description: t('common:messages.errorFacebookLoginTitle'),
                });
            });
    }, []);

    const handleResetPassword = async (data: ResetPasswordData) => {
        setResetLoading(true);

        try {
            await api.post('/reset-password', {
                email: data.email,
            });

            alert({
                type: 'success',
                title: t('common:messages.successResetPasswordEmailTitle'),
                description: t('common:messages.successResetPasswordEmailText'),
            });

            setIsModalOpen(false);
            setResetLoading(false);
        } catch (err) {
            setResetLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorResetPasswordEmailTitle'),
                description: t('common:messages.errorResetPasswordEmailText'),
            });
        }
    };

    return (
        <>
            <NextSeo title={t('index:title')} />

            <Layout>
                <HomeContainer>
                    <Container>
                        <Row>
                            <Col lg={6} className="align-self-center">
                                <Row className="mb-3 text-home">
                                    <Col xs={8} md={12}>
                                        <h1>{t('index:homeTitle')}</h1>
                                    </Col>
                                    <Col xs={4} md={12}>
                                        <MountainsContainer>
                                            <MountainsWrapper className="mb-4">
                                                <Mountains />
                                            </MountainsWrapper>
                                        </MountainsContainer>
                                    </Col>
                                </Row>
                                <p className="mb-4">
                                    {t('index:homeDescription')}
                                </p>
                            </Col>
                            <Col lg={6} className="align-self-center">
                                <FormContainer>
                                    <button
                                        className={
                                            facebookLoading
                                                ? 'btn btn-facebook mb-2 is-loading'
                                                : 'btn btn-facebook mb-2'
                                        }
                                        disabled={
                                            facebookLoading ? true : false
                                        }
                                        type="button"
                                        onClick={handleFacebookLogin}
                                    >
                                        {facebookLoading && (
                                            <Lottie
                                                loop
                                                animationData={loadingAnimation}
                                                play
                                                style={{
                                                    width: 26,
                                                    height: 26,
                                                }}
                                            />
                                        )}
                                        <i></i> {t('index:buttonFacebookLogin')}
                                    </button>
                                    <p className="mb-2">
                                        {t('index:FormOrText')}
                                    </p>
                                    {loginShown ? (
                                        <>
                                            <form
                                                onSubmit={handleSubmit2(
                                                    handleLoginSubmit
                                                )}
                                                className="mb-4"
                                            >
                                                <FormGroup>
                                                    <FormControl
                                                        icon={MailIcon}
                                                    >
                                                        <input
                                                            className={
                                                                errors2.email
                                                                    ? 'form-control has-error'
                                                                    : 'form-control'
                                                            }
                                                            name="email"
                                                            placeholder={t(
                                                                'index:inputEmailPlaceholder'
                                                            )}
                                                            autoFocus
                                                            inputMode="email"
                                                            autoComplete="email"
                                                            type="email"
                                                            ref={register2({
                                                                required: t(
                                                                    'common:validation.emailRequired'
                                                                ),
                                                                pattern: {
                                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                    message: t(
                                                                        'common:validation.emailValid'
                                                                    ),
                                                                },
                                                            })}
                                                        />
                                                        <div className="input-icons">
                                                            {errors2.email && (
                                                                <InputError
                                                                    title={
                                                                        errors2
                                                                            .email
                                                                            ?.message
                                                                    }
                                                                >
                                                                    <IssueOpenedIcon
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                </InputError>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControl
                                                        icon={LockIcon}
                                                    >
                                                        <input
                                                            className={
                                                                errors2.password
                                                                    ? 'form-control has-error'
                                                                    : 'form-control'
                                                            }
                                                            name="password"
                                                            placeholder={t(
                                                                'index:inputPasswordPlaceholder'
                                                            )}
                                                            type={
                                                                passwordShown
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            ref={register2({
                                                                required: t(
                                                                    'common:validation.passwordRequired'
                                                                ),
                                                            })}
                                                        />
                                                        <div className="input-icons">
                                                            <button
                                                                tabIndex={-1}
                                                                type="button"
                                                                className="toggle-password"
                                                                onClick={
                                                                    handlePasswordVisibility
                                                                }
                                                            >
                                                                {passwordShown ? (
                                                                    <EyeClosedIcon
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <EyeIcon
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                )}
                                                            </button>
                                                            {errors2.password && (
                                                                <InputError
                                                                    title={
                                                                        errors2
                                                                            .password
                                                                            ?.message
                                                                    }
                                                                    className="its-password"
                                                                >
                                                                    <IssueOpenedIcon
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                </InputError>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                </FormGroup>
                                                <a
                                                    className="forgot-password"
                                                    onClick={() =>
                                                        setIsModalOpen(true)
                                                    }
                                                >
                                                    {t('index:forgotPassword')}
                                                </a>
                                                <button
                                                    type="submit"
                                                    className={
                                                        loginLoading
                                                            ? 'btn btn-primary btn-start is-loading'
                                                            : 'btn btn-primary btn-start'
                                                    }
                                                    disabled={
                                                        loginLoading
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {loginLoading && (
                                                        <Lottie
                                                            loop
                                                            animationData={
                                                                loadingAnimation
                                                            }
                                                            play
                                                            style={{
                                                                width: 26,
                                                                height: 26,
                                                            }}
                                                        />
                                                    )}
                                                    {t('index:buttonLogin')}
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <form
                                            onSubmit={handleSubmit(
                                                handleRegisterSubmit
                                            )}
                                            className="mb-4"
                                        >
                                            <FormGroup>
                                                <FormControl icon={PersonIcon}>
                                                    <input
                                                        className={
                                                            errors.name
                                                                ? 'form-control has-error'
                                                                : 'form-control'
                                                        }
                                                        name="name"
                                                        placeholder={t(
                                                            'index:inputNamePlaceholder'
                                                        )}
                                                        autoFocus
                                                        autoComplete="name"
                                                        ref={register({
                                                            required: t(
                                                                'common:validation.nameRequired'
                                                            ),
                                                            minLength: {
                                                                value: 5,
                                                                message: t(
                                                                    'common:validation.nameDigits'
                                                                ),
                                                            },
                                                        })}
                                                    />
                                                    <div className="input-icons">
                                                        {errors.name && (
                                                            <InputError
                                                                title={
                                                                    errors.name
                                                                        ?.message
                                                                }
                                                            >
                                                                <IssueOpenedIcon
                                                                    size={24}
                                                                />
                                                            </InputError>
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControl icon={MailIcon}>
                                                    <input
                                                        className={
                                                            errors.email
                                                                ? 'form-control has-error'
                                                                : 'form-control'
                                                        }
                                                        name="email"
                                                        placeholder={t(
                                                            'index:inputEmailPlaceholder'
                                                        )}
                                                        type="email"
                                                        inputMode="email"
                                                        autoComplete="email"
                                                        ref={register({
                                                            required: t(
                                                                'common:validation.emailRequired'
                                                            ),
                                                            pattern: {
                                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                message: t(
                                                                    'common:validation.emailValid'
                                                                ),
                                                            },
                                                        })}
                                                    />
                                                    <div className="input-icons">
                                                        {errors.email && (
                                                            <InputError
                                                                title={
                                                                    errors.email
                                                                        ?.message
                                                                }
                                                            >
                                                                <IssueOpenedIcon
                                                                    size={24}
                                                                />
                                                            </InputError>
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup className="mb-4">
                                                <FormControl icon={LockIcon}>
                                                    <input
                                                        className={
                                                            errors.password
                                                                ? 'form-control has-error'
                                                                : 'form-control'
                                                        }
                                                        name="password"
                                                        placeholder={t(
                                                            'index:inputPasswordPlaceholder'
                                                        )}
                                                        type={
                                                            passwordShown
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        ref={register({
                                                            required: t(
                                                                'common:validation.passwordRequired'
                                                            ),
                                                            minLength: {
                                                                value: 6,
                                                                message: t(
                                                                    'common:validation.passwordDigits'
                                                                ),
                                                            },
                                                        })}
                                                    />
                                                    <div className="input-icons">
                                                        <button
                                                            tabIndex={-1}
                                                            type="button"
                                                            className="toggle-password"
                                                            onClick={
                                                                handlePasswordVisibility
                                                            }
                                                        >
                                                            {passwordShown ? (
                                                                <EyeClosedIcon
                                                                    size={24}
                                                                />
                                                            ) : (
                                                                <EyeIcon
                                                                    size={24}
                                                                />
                                                            )}
                                                        </button>
                                                        {errors.password && (
                                                            <InputError
                                                                title={
                                                                    errors
                                                                        .password
                                                                        ?.message
                                                                }
                                                                className="its-password"
                                                            >
                                                                <IssueOpenedIcon
                                                                    size={24}
                                                                />
                                                            </InputError>
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormGroup>
                                            <button
                                                type="submit"
                                                className={
                                                    loginLoading
                                                        ? 'btn btn-primary btn-start is-loading'
                                                        : 'btn btn-primary btn-start'
                                                }
                                                disabled={
                                                    loginLoading ? true : false
                                                }
                                            >
                                                {loginLoading && (
                                                    <Lottie
                                                        loop
                                                        animationData={
                                                            loadingAnimation
                                                        }
                                                        play
                                                        style={{
                                                            width: 26,
                                                            height: 26,
                                                        }}
                                                    />
                                                )}
                                                {t('index:buttonCreate')}
                                            </button>
                                        </form>
                                    )}

                                    <button
                                        type="button"
                                        className="btn btn-link btn-light"
                                        onClick={handleLoginVisibility}
                                    >
                                        {loginShown
                                            ? t('index:buttonAccountActive')
                                            : t('index:buttonAccount')}
                                    </button>
                                </FormContainer>
                            </Col>
                        </Row>
                    </Container>
                </HomeContainer>

                <Divider margin={6} />

                <FocusedStories>
                    <Container>
                        <h2 className="text-center">
                            {t('index:focusedStoriesTitle')}{' '}
                            <span>{t('index:focusedStoriesSubtitle')}</span>
                        </h2>
                        <Row>
                            <Col lg={6} className="d-none d-lg-block">
                                <Image
                                    src="/static/assets/img/screens-mobile.png"
                                    alt="Peakseekers App"
                                    width={570}
                                    height={517}
                                />
                            </Col>
                            <Col lg={6} className="align-self-center">
                                <FocusedStoriesFeature>
                                    <h3>
                                        <NoteIcon size={24} />
                                        {t('index:focusedStoriesExplorerTitle')}
                                    </h3>
                                    <p>
                                        {t(
                                            'index:focusedStoriesExplorerParagraph'
                                        )}
                                    </p>
                                </FocusedStoriesFeature>
                                <FocusedStoriesFeature>
                                    <h3>
                                        <FileMediaIcon size={24} />
                                        {t('index:focusedStoriesPhotosTitle')}
                                    </h3>
                                    <p>
                                        {t(
                                            'index:focusedStoriesPhotosParagraph'
                                        )}
                                    </p>
                                </FocusedStoriesFeature>
                                <FocusedStoriesFeature>
                                    <h3>
                                        <SmileyIcon size={24} />
                                        {t(
                                            'index:focusedStoriesReadabilityTitle'
                                        )}
                                    </h3>
                                    <p>
                                        {t(
                                            'index:focusedStoriesReadabilityParagraph'
                                        )}
                                    </p>
                                </FocusedStoriesFeature>
                                <FocusedStoriesFeature>
                                    <h3>
                                        <SearchIcon size={24} />
                                        {t(
                                            'index:focusedStoriesMountainsTitle'
                                        )}
                                    </h3>
                                    <p>
                                        {t(
                                            'index:focusedStoriesMountainsParagraph'
                                        )}
                                    </p>
                                    <FocusedStoriesMountainsNumber>
                                        <li>
                                            <Flag country="US" size={16} />{' '}
                                            10385
                                        </li>
                                        <li>
                                            <Flag country="BR" size={16} /> 2374
                                        </li>
                                        <li>
                                            <Flag country="GB" size={16} /> 1977
                                        </li>
                                        <li>
                                            <Flag country="CA" size={16} /> 1314
                                        </li>
                                    </FocusedStoriesMountainsNumber>
                                </FocusedStoriesFeature>
                            </Col>
                        </Row>
                    </Container>
                </FocusedStories>

                {/* <Divider margin={7} /> */}

                {/* <Application>
                    <Container className="text-center">
                        <h4>
                            {t('index:applicationTitle')}{' '}
                            <span>{t('index:applicationSubtitle')}</span>
                        </h4>
                        <p>{t('index:applicationText')}</p>
                        <ApplicationButtons>
                            <li>
                                <a
                                    className="btn btn-download"
                                    id="tooltip"
                                    title={lang === 'pt' ? 'Em breve' : 'Soon'}
                                >
                                    <AppStore />
                                    <div>
                                        <span>
                                            {t(
                                                'index:applicationDownloadAppStore'
                                            )}
                                        </span>{' '}
                                        App Store
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="btn btn-download"
                                    id="tooltip"
                                    title={lang === 'pt' ? 'Em breve' : 'Soon'}
                                >
                                    <GooglePlay />
                                    <div>
                                        <span>
                                            {t(
                                                'index:applicationDownloadGooglePlay'
                                            )}
                                        </span>{' '}
                                        Google Play
                                    </div>
                                </a>
                            </li>
                        </ApplicationButtons>
                    </Container>
                </Application> */}

                <Privacy className="text-center">
                    <Container>
                        <h5>
                            {t('index:privacyTitle')}{' '}
                            <strong>{t('index:privacySubtitle')}</strong>
                        </h5>
                        <p>
                            {t('index:privacyText1')} <br />
                            {t('index:privacyText2')}
                        </p>
                        <p>
                            <Link href="/privacy-policy" lang={lang}>
                                <a>{t('index:privacyLinkText')}</a>
                            </Link>
                        </p>
                    </Container>
                </Privacy>

                <Footer />

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <ResetPassword>
                        <p>{t('index:resetPasswordText')}</p>
                        <form onSubmit={handleSubmit3(handleResetPassword)}>
                            <FormGroup>
                                <FormControl icon={MailIcon}>
                                    <input
                                        className={
                                            errors3.email
                                                ? 'form-control has-error'
                                                : 'form-control'
                                        }
                                        name="email"
                                        placeholder={t(
                                            'index:inputEmailPlaceholder'
                                        )}
                                        autoFocus
                                        inputMode="email"
                                        autoComplete="email"
                                        type="email"
                                        ref={register3({
                                            required: t(
                                                'common:validation.emailRequired'
                                            ),
                                            pattern: {
                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: t(
                                                    'common:validation.emailValid'
                                                ),
                                            },
                                        })}
                                    />
                                    <div className="input-icons">
                                        {errors3.email && (
                                            <InputError
                                                title={errors3.email?.message}
                                            >
                                                <IssueOpenedIcon size={24} />
                                            </InputError>
                                        )}
                                    </div>
                                </FormControl>
                            </FormGroup>
                            <div className="footer-modal">
                                <button
                                    type="submit"
                                    className={
                                        resetLoading
                                            ? 'btn btn-reset btn-block is-loading'
                                            : 'btn btn-reset btn-block'
                                    }
                                    disabled={resetLoading ? true : false}
                                >
                                    {resetLoading && (
                                        <Lottie
                                            loop
                                            animationData={loadingAnimation}
                                            play
                                            style={{
                                                width: 26,
                                                height: 26,
                                            }}
                                        />
                                    )}
                                    {t('index:resetPasswordButton')}
                                </button>
                            </div>
                        </form>
                    </ResetPassword>
                </StyledModal>
            </Layout>
        </>
    );
};

export default Home;
