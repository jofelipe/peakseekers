import React, { useMemo, useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next-translate/Link';
import Lottie from 'react-lottie-player';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useRouter } from 'next/router';
import { format, formatDistance, parseJSON } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';

import { PinIcon, ArrowUpRightIcon } from '@primer/octicons-react';

import addBucketlist from '../../animations/add-bucketlist.json';

import Error from '../../layouts/error';
import Layout from '../../layouts/main';
import Flag from '../../components/Flag';
import Footer from '../../components/Footer';
import Tapbar from '../../components/Tapbar';

import {
    Wrapper,
    MountainTitle,
    MountainMap,
    MountainInfo,
    MountainText,
    StoryContainer,
    Story,
    MountainSource,
    MountainStories,
} from '../../styles/mountains';
import { StyledModal } from '../../styles/modal';

interface Story {
    slug: string;
    title: string;
    author: {
        name: string;
        avatar_url: string;
        username: string;
    };
    images: string[];
    created_at: string;
}

interface Mountain {
    mountain: {
        name: string;
        country: string;
        slug: string;
        continent: string;
        range: string;
        elevation: number;
        id: string;
        latitude: number;
        longitude: number;
        bucketlist: number;
        stories: Story[];
    };
    error: boolean;
}

export const getStaticPaths = () => {
    return {
        fallback: true,
        paths: [],
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;

    try {
        const response = await api.get(`/mountain/${slug}`);
        const mountain = response.data;

        return { props: { mountain }, revalidate: 86400 };
    } catch (err) {
        return { props: { error: true } };
    }
};

function Mountain({ mountain, error }: Mountain) {
    const { t, lang } = useTranslation();
    const { user, isAuthenticated } = useAuth();

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Layout>
                <Wrapper className="mb-5">
                    <Skeleton height={50} className="mb-3" />
                    <Skeleton className="mb-3" />
                    <Skeleton height={300} className="mb-3" />
                    <Skeleton height={75} className="mb-5" />
                    <Skeleton count={10} />
                </Wrapper>
            </Layout>
        );
    }

    if (!mountain || error) {
        return (
            <Error
                errorTitle={t('mountain:mountainNotFoundTitle')}
                errorText={t('mountain:mountainNotFoundText')}
            />
        );
    }

    const defaultMapOptions = {
        center: {
            lat: mountain.latitude,
            lng: mountain.longitude,
        },
        zoom: 15,
    };

    const [stories, setStories] = useState(mountain.stories);
    const [topStory, setTopStory] = useState(
        mountain.stories.length > 0
            ? mountain.stories[
                  Math.floor(Math.random() * mountain.stories.length)
              ]
            : null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bucketlistIconGoTo, setBucketlistIconGoTo] = useState(0);
    const [bucketlistIconPlay, setBucketlistIconPlay] = useState(false);
    const [mountainAddedToBucketlist, setMountainAddedToBucketlist] = useState(
        false
    );

    const mapOptions = {
        disableDefaultUI: true,
        mapTypeId: 'terrain',
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const mountainElevation = useMemo(() => {
        if (user?.credentials.use_feet) {
            return `${Math.floor(mountain.elevation * 3.2808)}ft`;
        } else {
            return `${mountain.elevation}m`;
        }
    }, []);

    const mountainContinent = useMemo(() => {
        if (lang === 'pt') {
            switch (mountain.continent) {
                case 'South America':
                    return 'América do Sul';
                case 'Africa':
                    return 'África';
                case 'Antarctica':
                    return 'Antártida';
                case 'Asia':
                    return 'Ásia';
                case 'Europe':
                    return 'Europa';
                case 'North America':
                    return 'América do Norte';
                default:
                    return mountain.continent;
            }
        } else {
            return mountain.continent;
        }
    }, []);

    const storyDate = useCallback((date: string) => {
        return formatDistance(parseJSON(date), new Date(), {
            locale: lang === 'pt' ? ptBR : enUS,
            addSuffix: true,
        });
    }, []);

    const storyDateFormatted = useCallback((date: string) => {
        return format(parseJSON(date), 'Pp', {
            locale: lang === 'pt' ? ptBR : enUS,
        });
    }, []);

    const storySlug = useCallback((username: string, slug: string) => {
        return `/${username}/${slug}`;
    }, []);

    const handleAddBucketlist = async () => {
        if (mountainAddedToBucketlist) {
            try {
                await api.get(`mountain/${mountain.id}/remove-bucketlist`);
                setMountainAddedToBucketlist(false);
                setBucketlistIconPlay(false);
                setBucketlistIconGoTo(0);
            } catch (err) {
                alert({
                    type: 'error',
                    title: t(
                        'common:messages.errorRemoveMountainBucketlistTitle'
                    ),
                    description: t(
                        'common:messages.errorRemoveMountainBucketlistText'
                    ),
                });
            }
        } else {
            setBucketlistIconPlay(true);
            try {
                await api.get(`mountain/${mountain.id}/add-bucketlist`);
                setMountainAddedToBucketlist(true);
            } catch (err) {
                setBucketlistIconPlay(false);
                alert({
                    type: 'error',
                    title: t('common:messages.errorAddMountainBucketlistTitle'),
                    description: t(
                        'common:messages.errorAddMountainBucketlistText'
                    ),
                });
            }
        }
    };

    useEffect(() => {
        if (!router.isFallback) {
            if (user?.bucketlist.includes(mountain.id)) {
                setMountainAddedToBucketlist(true);
                setBucketlistIconGoTo(65);
            }
        }
    }, [router.isFallback, user, mountain]);

    return (
        <>
            <NextSeo
                title={mountain.name}
                description={
                    lang === 'pt'
                        ? `${mountain.name} está em ${mountainContinent}, e seu ponto mais alto está localizado em ${mountain.country}.`
                        : `${mountain.name} is in ${mountainContinent}, and its highest point is located in ${mountain.country}.`
                }
            />

            <Layout>
                <Wrapper className={isAuthenticated ? 'space-md' : ''}>
                    <MountainTitle>
                        <h1>{mountain.name}</h1>
                        <p title="Latitude/Longitude">
                            <PinIcon size={14} /> {mountain.latitude},{' '}
                            {mountain.longitude}
                        </p>
                    </MountainTitle>

                    <MountainMap>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                language: lang,
                                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                            }}
                            defaultCenter={defaultMapOptions.center}
                            defaultZoom={defaultMapOptions.zoom}
                            options={mapOptions}
                        />
                    </MountainMap>

                    <MountainInfo>
                        <div className="elevation">
                            <p>
                                {t('mountain:elevation')} <br />
                                <strong>
                                    <ArrowUpRightIcon size={24} />
                                    {mountainElevation}
                                </strong>
                            </p>
                        </div>

                        {isAuthenticated && (
                            <div className="add-bucketlist">
                                <button onClick={handleAddBucketlist}>
                                    <Lottie
                                        loop={false}
                                        animationData={addBucketlist}
                                        play={bucketlistIconPlay}
                                        goTo={bucketlistIconGoTo}
                                        style={{
                                            width: 80,
                                            height: 80,
                                        }}
                                    />
                                    {mountainAddedToBucketlist
                                        ? t('mountain:addedToBucketlist')
                                        : t('mountain:addToBucketlist')}
                                </button>
                            </div>
                        )}
                    </MountainInfo>

                    <MountainText>
                        <p>
                            {lang === 'pt'
                                ? `${
                                      mountain.name
                                  } está em ${mountainContinent}, ${
                                      mountain.range &&
                                      `na cordilheira ${mountain.range}`
                                  } e seu ponto mais alto está localizado em `
                                : `${
                                      mountain.name
                                  } is in ${mountainContinent}, ${
                                      mountain.range &&
                                      `in the ${mountain.range} mountain range`
                                  } and its highest point is located in `}
                            <Flag country={mountain.country} text />.
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mountain.latitude},${mountain.longitude}`}
                            className="btn btn-google-maps"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i></i> {t('mountain:visitGoogleMaps')}
                        </a>
                    </MountainText>

                    {stories.length > 0 && (
                        <StoryContainer>
                            <header>
                                <h2>{t('mountain:topStory')}</h2>
                                <div className="all-stories">
                                    <button
                                        onClick={() =>
                                            stories.length > 1
                                                ? setIsModalOpen(true)
                                                : {}
                                        }
                                    >
                                        Total <strong>{stories.length}</strong>
                                    </button>
                                </div>
                            </header>

                            <Story key={topStory.slug}>
                                <Link
                                    href={storySlug(
                                        topStory.author.username,
                                        topStory.slug
                                    )}
                                    lang={lang}
                                >
                                    <a>
                                        <div className="story-image">
                                            <Image
                                                src={topStory.images[0]}
                                                alt={topStory.title}
                                                width={1560}
                                                height={1560}
                                                loading="eager"
                                            />
                                        </div>
                                        <div className="story-info">
                                            <div className="story-text">
                                                <h2>{topStory.title}</h2>
                                                <p>
                                                    <time
                                                        title={storyDateFormatted(
                                                            topStory.created_at
                                                        )}
                                                    >
                                                        {storyDate(
                                                            topStory.created_at
                                                        )}
                                                    </time>
                                                </p>
                                            </div>
                                            <div className="story-author">
                                                <Image
                                                    src={
                                                        topStory.author
                                                            .avatar_url
                                                    }
                                                    alt={topStory.author.name}
                                                    width={50}
                                                    height={50}
                                                    title={topStory.author.name}
                                                    loading="eager"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </Story>
                        </StoryContainer>
                    )}

                    <div
                        className={
                            isAuthenticated ? 'space-user-authenticated' : ''
                        }
                    >
                        <MountainSource>
                            <p>
                                {t('mountain:sourceFrom')}{' '}
                                <a
                                    href="https://www.peakbagger.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Peakbagger.com
                                </a>{' '}
                                {t('mountain:sourceFromAnd')}{' '}
                                <a
                                    href="https://www.openstreetmap.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    OpenStreetMap
                                </a>
                            </p>
                            <Link
                                href={{
                                    pathname: '/report-error',
                                    query: { source: mountain.slug },
                                }}
                                lang={lang}
                            >
                                <a className="btn btn-block btn-report-error">
                                    {t('mountain:reportError')}
                                </a>
                            </Link>
                        </MountainSource>
                    </div>
                </Wrapper>

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <MountainStories>
                        {stories.map((story) => (
                            <li key={story.slug}>
                                <Link
                                    href={storySlug(
                                        story.author.username,
                                        story.slug
                                    )}
                                    lang={lang}
                                >
                                    <a>
                                        <img
                                            src={story.author.avatar_url}
                                            alt={story.author.name}
                                            title={story.author.name}
                                        />
                                        <span>{story.title}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </MountainStories>
                </StyledModal>

                {isAuthenticated ? <Tapbar /> : <Footer />}
            </Layout>
        </>
    );
}

export default Mountain;
