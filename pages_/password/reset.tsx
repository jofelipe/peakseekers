import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAlert } from '../../hooks/alert';
import { NextSeo } from 'next-seo';
import { auth } from '../../config/firebase';

import loadingAnimation from '../../animations/loading.json';

import Layout from '../../layouts/main';
import FormControl from '../../components/FormControl';
import Tapbar from '../../components/Tapbar';
import Footer from '../../components/Footer';

import {
    LockIcon,
    IssueOpenedIcon,
    EyeClosedIcon,
    EyeIcon,
} from '@primer/octicons-react';
import { Container, FormGroup } from 'reactstrap';

import { Wrapper, Form, InputError } from '../../styles/content';

const ResetPassword = () => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();
    const { register, handleSubmit, errors, getValues, reset } = useForm();
    const { alert } = useAlert();
    const router = useRouter();

    const [resetLoading, setResetLoading] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const handlePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const changePassword = async (data) => {
        setResetLoading(true);

        try {
            await auth.doResetPassword(router.query.oobCode, data.password);

            reset();

            setResetLoading(false);

            alert({
                type: 'success',
                title: t('common:messages.successResetPasswordTitle'),
                description: t('common:messages.successResetPasswordText'),
            });

            setTimeout(function () {
                Router.pushI18n({ url: '/', options: { lang } });
            }, 5000);
        } catch (err) {
            setResetLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorResetPasswordTitle'),
                description: t('common:messages.errorResetPasswordText'),
            });
        }
    };

    return (
        <>
            <NextSeo title={t('reset_password:title')} noindex />

            <Layout>
                <Container>
                    <Wrapper maxWidth>
                        <h1>{t('reset_password:title')}</h1>
                        <p>{t('reset_password:text')}</p>
                        <Form>
                            <form onSubmit={handleSubmit(changePassword)}>
                                <FormGroup>
                                    <FormControl icon={LockIcon}>
                                        <input
                                            className={
                                                errors.password
                                                    ? 'form-control has-error'
                                                    : 'form-control'
                                            }
                                            name="password"
                                            placeholder={t(
                                                'reset_password:newPasswordPlaceholder'
                                            )}
                                            type={
                                                passwordShown
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            ref={register({
                                                minLength: {
                                                    value: 6,
                                                    message: t(
                                                        'common:validation.passwordDigits'
                                                    ),
                                                },
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
                                                    <EyeClosedIcon size={24} />
                                                ) : (
                                                    <EyeIcon size={24} />
                                                )}
                                            </button>
                                            {errors.password && (
                                                <InputError
                                                    title={
                                                        errors.password?.message
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
                                                errors.password_confirmation
                                                    ? 'form-control has-error'
                                                    : 'form-control'
                                            }
                                            name="password_confirmation"
                                            placeholder={t(
                                                'reset_password:confirmNewPasswordPlaceholder'
                                            )}
                                            type={
                                                passwordShown
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            ref={register({
                                                validate: (value) => {
                                                    if (
                                                        value ===
                                                        getValues()['password']
                                                    ) {
                                                        return true;
                                                    } else {
                                                        return t(
                                                            'common:validation.passwordsDoNotMatch'
                                                        );
                                                    }
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
                                                    <EyeClosedIcon size={24} />
                                                ) : (
                                                    <EyeIcon size={24} />
                                                )}
                                            </button>
                                            {errors.password_confirmation && (
                                                <InputError
                                                    title={
                                                        errors
                                                            .password_confirmation
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

                                <button
                                    type="submit"
                                    className={
                                        resetLoading
                                            ? 'btn btn-primary btn-update-password is-loading'
                                            : 'btn btn-primary btn-update-password'
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
                                    {t('reset_password:updatePassword')}
                                </button>
                            </form>
                        </Form>
                    </Wrapper>
                </Container>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
};

export default ResetPassword;
