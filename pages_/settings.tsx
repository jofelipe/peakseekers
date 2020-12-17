import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useTheme } from '../hooks/theme';
import { useAuth } from '../hooks/auth';
import { useAlert } from '../hooks/alert';
import { NextSeo } from 'next-seo';

import {
    MoonIcon,
    SunIcon,
    SmileyIcon,
    ShieldCheckIcon,
    IssueReopenedIcon,
    SignOutIcon,
} from '@primer/octicons-react';
import { Row, Col, FormGroup } from 'reactstrap';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';

import { Wrapper, Toggles, SettingsMenu } from '../styles/settings';

const Settings = () => {
    const { user, isAuthenticated, loading, signOut } = useAuth();
    const { alert } = useAlert();
    const { t, lang } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const [useFeet, setUseFeet] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }
    }, [isAuthenticated, loading, user]);

    useEffect(() => {
        if (user?.credentials.use_feet) {
            setUseFeet(true);
        }
    }, [user]);

    const handleDistanceUnitChange = async () => {
        try {
            await api.post('user/distance-unit', { use_feet: !useFeet });
            setUseFeet(!useFeet);

            alert({
                type: 'success',
                title: t('common:messages.successDistanceUnitTitle'),
                description: t('common:messages.successDistanceUnitText'),
            });
        } catch (err) {
            alert({
                type: 'error',
                title: t('common:messages.errorDistanceUnitTitle'),
                description: t('common:messages.errorDistanceUnitText'),
            });
        }
    };

    return (
        <>
            <NextSeo title={t('settings:title')} noindex={true} />
            <Layout isPrivateRoute>
                <Wrapper>
                    <Toggles>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <p>Interface</p>
                                    <Switch
                                        checked={
                                            theme === 'light' ? false : true
                                        }
                                        onChange={toggleTheme}
                                        checkedIcon={<SunIcon size={24} />}
                                        uncheckedIcon={<MoonIcon size={24} />}
                                        activeBoxShadow="0"
                                        handleDiameter={35}
                                        width={125}
                                        height={50}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <p>{t('settings:distanceUnit')}</p>
                                    <Switch
                                        onChange={handleDistanceUnitChange}
                                        checked={useFeet}
                                        checkedIcon={
                                            <span>{t('settings:meters')}</span>
                                        }
                                        uncheckedIcon={
                                            <span>{t('settings:feet')}</span>
                                        }
                                        activeBoxShadow="0"
                                        handleDiameter={35}
                                        width={125}
                                        height={50}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Toggles>

                    <SettingsMenu>
                        <ul>
                            <li>
                                <Link href="/about" lang={lang}>
                                    <a>
                                        <SmileyIcon size={24} />{' '}
                                        {t('settings:about')} Peakseekers
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" lang={lang}>
                                    <a>
                                        <ShieldCheckIcon size={24} />{' '}
                                        {t('settings:privacyPolicy')}
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/report-error" lang={lang}>
                                    <a>
                                        <IssueReopenedIcon size={24} />{' '}
                                        {t('settings:reportError')}
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a onClick={signOut}>
                                    <SignOutIcon size={24} />{' '}
                                    {t('settings:logout')}
                                </a>
                            </li>
                        </ul>
                    </SettingsMenu>
                </Wrapper>

                <Tapbar activePage="settings" />
            </Layout>
        </>
    );
};

export default Settings;
