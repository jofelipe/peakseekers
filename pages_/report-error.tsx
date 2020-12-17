import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';

import { useAuth } from '../hooks/auth';
import { useAlert } from '../hooks/alert';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import loadingAnimation from '../animations/loading.json';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';
import FormControl from '../components/FormControl';
import Footer from '../components/Footer';

import { Container, Col, Row, FormGroup } from 'reactstrap';
import {
    PersonIcon,
    MailIcon,
    LinkIcon,
    IssueOpenedIcon,
    ChecklistIcon,
} from '@primer/octicons-react';

import { Wrapper, Form, InputError } from '../styles/content';

const ReportError = () => {
    const { isAuthenticated } = useAuth();
    const { t, lang } = useTranslation();
    const { register, handleSubmit, errors, reset } = useForm();
    const { alert } = useAlert();
    const router = useRouter();

    const [reportLoading, setReportLoading] = useState(false);

    const handleReportError = async (data) => {
        setReportLoading(true);

        try {
            await axios.post('/api/report-error', data);

            reset();

            setReportLoading(false);

            alert({
                type: 'success',
                title: t('common:messages.successErrorReportedTitle'),
                description: t('common:messages.successErrorReportedText'),
            });
        } catch (err) {
            setReportLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorErrorReportedTitle'),
                description: t('common:messages.errorErrorReportedText'),
            });
        }
    };

    return (
        <>
            <NextSeo
                title={t('report_error:title')}
                description={t('report_error:description')}
            />

            <Layout>
                <Container>
                    <Wrapper>
                        <Row>
                            <Col xs={12} md={6}>
                                <h1>{t('report_error:title')}</h1>
                                {lang === 'pt' ? (
                                    <>
                                        <p>
                                            Temos o orgulho de ter uma base de
                                            dados robusta, com informações
                                            básicas sobre mais de 20 mil
                                            montanhas pelo mundo. Isso só foi
                                            possível graças ao{' '}
                                            <a
                                                href="https://www.peakbagger.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Peakbagger.com
                                            </a>{' '}
                                            e seu criador (Greg) que aceitou
                                            compartilhar seus dados com o
                                            Peakseekers, além da base de dados
                                            aberta do{' '}
                                            <a
                                                href="https://www.openstreetmap.org/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                OpenStreetMap
                                            </a>
                                            .
                                        </p>
                                        <p>
                                            Porém, justamente por coletar dados
                                            de bases abertas, alguns dados são
                                            passíveis de erros. Caso encontre
                                            algum, sinta-se à vontade para
                                            reportá-lo.
                                        </p>
                                        <p>
                                            Corrigiremos assim que possível! 😉
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            We are proud to have a robust
                                            database, with basic information on
                                            more than 20,000 mountains around
                                            the world. This was only possible
                                            thanks to{' '}
                                            <a
                                                href="https://www.peakbagger.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Peakbagger.com
                                            </a>{' '}
                                            and its creator (Greg) who agreed to
                                            share their data with Peakseekers,
                                            in addition to the open database of{' '}
                                            <a
                                                href="https://www.openstreetmap.org/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                OpenStreetMap
                                            </a>
                                            .
                                        </p>
                                        <p>
                                            However, because we collect data
                                            from open databases, some data is
                                            prone to errors. If you find one,
                                            feel free to report it.
                                        </p>
                                        <p>
                                            We will correct it as soon as
                                            possible! 😉
                                        </p>
                                    </>
                                )}
                            </Col>
                            <Col xs={12} md={6}>
                                <Form>
                                    <form
                                        onSubmit={handleSubmit(
                                            handleReportError
                                        )}
                                    >
                                        <input
                                            type="hidden"
                                            name="source"
                                            value={
                                                router.query.source
                                                    ? router.query.source
                                                    : ''
                                            }
                                            ref={register}
                                        />

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
                                                        'report_error:namePlaceholder'
                                                    )}
                                                    autoComplete="name"
                                                    type="text"
                                                    ref={register({
                                                        required: t(
                                                            'common:validation.nameRequired'
                                                        ),
                                                    })}
                                                    autoFocus
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
                                                        'report_error:emailPlaceholder'
                                                    )}
                                                    inputMode="email"
                                                    autoComplete="email"
                                                    type="email"
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

                                        <FormGroup>
                                            <FormControl icon={LinkIcon}>
                                                <input
                                                    className={
                                                        errors.pageUrl
                                                            ? 'form-control has-error'
                                                            : 'form-control'
                                                    }
                                                    placeholder={t(
                                                        'report_error:pageUrlPlaceholder'
                                                    )}
                                                    name="pageUrl"
                                                    type="url"
                                                    ref={register}
                                                />
                                                <div className="input-icons">
                                                    {errors.pageUrl && (
                                                        <InputError
                                                            title={
                                                                errors.pageUrl
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
                                            <FormControl
                                                icon={ChecklistIcon}
                                                textarea
                                            >
                                                <textarea
                                                    className={
                                                        errors.description
                                                            ? 'form-control has-error'
                                                            : 'form-control'
                                                    }
                                                    name="description"
                                                    placeholder={t(
                                                        'report_error:descriptionPlaceholder'
                                                    )}
                                                    ref={register({
                                                        required: t(
                                                            'common:validation.descriptionRequired'
                                                        ),
                                                    })}
                                                ></textarea>
                                                <div className="input-icons">
                                                    {errors.description && (
                                                        <InputError
                                                            title={
                                                                errors
                                                                    .description
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
                                                reportLoading
                                                    ? 'btn btn-primary btn-report-error is-loading'
                                                    : 'btn btn-primary btn-report-error'
                                            }
                                            disabled={
                                                reportLoading ? true : false
                                            }
                                        >
                                            {reportLoading && (
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
                                            {t(
                                                'report_error:reportErrorButton'
                                            )}
                                        </button>
                                    </form>
                                </Form>
                            </Col>
                        </Row>
                    </Wrapper>
                </Container>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
};

export default ReportError;
