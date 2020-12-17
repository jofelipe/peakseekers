import React, { useEffect, useCallback } from 'react';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';
import { formatDistance, parseJSON } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

import Layout from '../layouts/main';
import Tapbar from '../components/Tapbar';
import NoContent from '../components/svg/NoContent';

import {
    Wrapper,
    NotificationsList,
    Notification,
    NoNotifications,
} from '../styles/notifications';

const Notifications = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const { t, lang } = useTranslation();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }
    }, [isAuthenticated, loading, user]);

    const notificationDate = useCallback(
        (date: string) => {
            if (!loading) {
                return formatDistance(parseJSON(date), new Date(), {
                    locale: lang === 'pt' ? ptBR : enUS,
                    addSuffix: true,
                });
            }
        },
        [loading]
    );

    useEffect(() => {
        if (!loading) {
            const notificationsIds = user.notifications.map((notification) => {
                return notification.id;
            });

            api.post('notifications', notificationsIds).catch((err) => {
                console.error(err);
            });
        }
    }, [loading]);

    return (
        <>
            <NextSeo title={t('notifications:title')} noindex={true} />

            <Layout isPrivateRoute>
                <Wrapper>
                    {user && user?.notifications.length > 0 ? (
                        <NotificationsList>
                            {user?.notifications.map((notification) => (
                                <Notification key={notification.id}>
                                    {notification.type === 'like' ? (
                                        <>
                                            <Link
                                                href={`/${notification.sender.username}`}
                                                lang={lang}
                                            >
                                                <a>
                                                    <Image
                                                        src={
                                                            notification.sender
                                                                .avatar_url
                                                        }
                                                        alt={
                                                            notification.sender
                                                                .name
                                                        }
                                                        width={50}
                                                        height={50}
                                                        loading="eager"
                                                    />
                                                </a>
                                            </Link>
                                            <p>
                                                <Link
                                                    href={`/${notification.sender.username}`}
                                                    lang={lang}
                                                >
                                                    <a>
                                                        {
                                                            notification.sender
                                                                .name
                                                        }
                                                    </a>
                                                </Link>{' '}
                                                {t('notifications:likedStory')}
                                            </p>
                                            <time>
                                                {notificationDate(
                                                    notification.created_at
                                                )}
                                            </time>
                                        </>
                                    ) : (
                                        <>{/* <p>Notificação badge</p> */}</>
                                    )}
                                </Notification>
                            ))}
                        </NotificationsList>
                    ) : (
                        <NoNotifications>
                            <NoContent />
                            <h5>{t('notifications:noNotificationsTitle')}</h5>
                            <p>{t('notifications:noNotificationsText')}</p>
                        </NoNotifications>
                    )}
                </Wrapper>

                <Tapbar activePage="notifications" />
            </Layout>
        </>
    );
};

export default Notifications;
