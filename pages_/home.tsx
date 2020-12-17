import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import Lottie from 'react-lottie-player';
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from 'react-loading-skeleton';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import api from '../services/api';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { format, formatDistance, parseJSON } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';

import loadingAnimationColor from '../animations/loading-color.json';

import Layout from '../layouts/main';
import Flag from '../components/Flag';
import Tapbar from '../components/Tapbar';
import Illustration from '../components/svg/Illustration';

import { CheckCircleIcon } from '@primer/octicons-react';
import { Container, Row, Col } from 'reactstrap';

interface Story {
    slug: string;
    mountain_id: string;
    images: string[];
    title: string;
    user_id: string;
    created_at: string;
    mountain: {
        country: string;
        elevation: number;
        name: string;
    };
    author: {
        name: string;
        username: string;
        avatar_url: string;
    };
}

interface StoryProps {
    stories: Story[];
    error: boolean;
}

import {
    Wrapper,
    StoryWrapper,
    Story,
    NoMoreItems,
    Error,
} from '../styles/home';

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const response = await api.get(`stories`);
        const stories = response.data;

        return { props: { stories }, revalidate: 1 };
    } catch (err) {
        return { props: { error: true } };
    }
};

const Home = ({ stories, error }: StoryProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const { t, lang } = useTranslation();

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Layout>
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <Skeleton height={400} className="mb-3" />
                            <Skeleton height={50} className="mb-3" />
                            <Skeleton height={400} className="mb-3" />
                            <Skeleton height={50} className="mb-3" />
                        </Col>
                        <Col xs={12} md={6}>
                            <Skeleton height={400} className="mb-3" />
                            <Skeleton height={50} className="mb-3" />
                            <Skeleton height={400} className="mb-3" />
                            <Skeleton height={50} className="mb-3" />
                        </Col>
                    </Row>
                </Container>
            </Layout>
        );
    }

    if (!stories || error) {
        return (
            <Layout>
                <Container>
                    <Error>
                        <Illustration />
                        <h1>{t('home:errorShowStoriesTitle')}</h1>
                        <p>{t('home:errorShowStoriesText')}</p>
                    </Error>
                </Container>

                <Tapbar activePage="home" />
            </Layout>
        );
    }

    const itemsPerPage = 1;
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [items, setItems] = useState(itemsPerPage);

    const storyDate = useCallback((date) => {
        return formatDistance(parseJSON(date), new Date(), {
            locale: lang === 'pt' ? ptBR : enUS,
            addSuffix: true,
        });
    }, []);

    const storyDateFormatted = useCallback((date) => {
        return format(parseJSON(date), 'Pp', {
            locale: lang === 'pt' ? ptBR : enUS,
        });
    }, []);

    const storySlug = useCallback((username, slug) => {
        return `/${username}/${slug}`;
    }, []);

    const elevation = useCallback(
        (elevation: number) => {
            if (user?.credentials.use_feet) {
                return `${Math.floor(elevation * 3.2808)}ft`;
            } else {
                return `${elevation}m`;
            }
        },
        [user]
    );

    const showItems = (stories) => {
        var activeItems = [];
        for (var i = 0; i < items; i++) {
            activeItems.push(
                <StoryWrapper key={i}>
                    <Story>
                        <Link
                            href={storySlug(
                                stories[i].author.username,
                                stories[i].slug
                            )}
                            lang={lang}
                        >
                            <a>
                                <div className="story-image">
                                    <Image
                                        src={stories[i].images[0]}
                                        alt={stories[i].title}
                                        width={1560}
                                        height={1560}
                                        loading="eager"
                                    />
                                </div>
                                <div className="story-info">
                                    <div className="story-text">
                                        <h2>{stories[i].title}</h2>
                                        <p>
                                            <Flag
                                                country={
                                                    stories[i].mountain.country
                                                }
                                            />{' '}
                                            <span>
                                                {stories[i].mountain.name},{' '}
                                                {elevation(
                                                    stories[i].mountain
                                                        .elevation
                                                )}{' '}
                                                —{' '}
                                                <time
                                                    title={storyDateFormatted(
                                                        stories[i].created_at
                                                    )}
                                                >
                                                    {storyDate(
                                                        stories[i].created_at
                                                    )}
                                                </time>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="story-author">
                                        <img
                                            src={stories[i].author.avatar_url}
                                            alt={stories[i].author.name}
                                            title={stories[i].author.name}
                                        />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </Story>
                </StoryWrapper>
            );
        }
        return activeItems;
    };

    const loadMore = () => {
        if (items === stories.length) {
            setHasMoreItems(false);
        } else {
            setTimeout(() => {
                setItems(items + itemsPerPage);
            }, 500);
        }
    };

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }
    }, [isAuthenticated, loading, user]);

    return (
        <>
            <NextSeo title={t('home:title')} noindex={true} />

            <Layout isPrivateRoute>
                <Container>
                    <Wrapper>
                        <InfiniteScroll
                            loadMore={loadMore}
                            hasMore={hasMoreItems}
                            loader={
                                <div className="loader" key={0}>
                                    <Lottie
                                        loop
                                        animationData={loadingAnimationColor}
                                        play
                                        style={{
                                            width: 48,
                                            height: 48,
                                        }}
                                    />
                                </div>
                            }
                            useWindow={true}
                        >
                            {showItems(stories)}
                        </InfiniteScroll>

                        {!hasMoreItems && (
                            <NoMoreItems>
                                <p>
                                    <CheckCircleIcon size={20} />
                                    {t('home:noMoreStories')}
                                </p>
                            </NoMoreItems>
                        )}
                    </Wrapper>
                </Container>

                <Tapbar activePage="home" />
            </Layout>
        </>
    );
};

export default Home;
