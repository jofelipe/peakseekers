import React, { useMemo, useState, useCallback, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next-translate/Link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useAuth } from '../hooks/auth';
import { useTheme } from '../hooks/theme';
import { useRouter } from 'next/router';
import { format, formatDistance, parseJSON } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import { GetStaticProps } from 'next';

import { Container, Row, Col } from 'reactstrap';

import Error from '../layouts/error';
import Layout from '../layouts/main';
import Flag from '../components/Flag';
import MapPin from '../components/MapPin';
import Footer from '../components/Footer';
import Tapbar from '../components/Tapbar';
import NoContent from '../components/svg/NoContent';

import {
    Wrapper,
    Sticky,
    ProfileHeader,
    ProfileInfo,
    ProfileAvatar,
    EditProfile,
    ProfileStats,
    ProfileMap,
    LayoutSelector,
    Stories,
    Story,
    Bucketlist,
    NoStories,
} from '../styles/profile';
import { StyledModal } from '../styles/modal';

interface Bucketlist {
    name: string;
    country: string;
    slug: string;
}

interface Story {
    mountain_id: string;
    slug: string;
    title: string;
    created_at: string;
    images: string[];
    mountain: {
        name: string;
        elevation: number;
        country: string;
        latitude: number;
        longitude: number;
    };
}

interface User {
    profile: {
        bio: string;
        username: string;
        avatar_url: string;
        nationality: {
            label: string;
            value: number | string;
        };
        website: string;
        name: string;
        stories: Story[];
        bucketlist: Bucketlist[];
    };
    error: boolean;
}

//map stuff
const defaultMapOptions = {
    center: {
        lat: 39.8097343,
        lng: -98.5556199,
    },
    zoom: 3,
};
const lightMapTheme = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
];
const darkMapTheme = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#000000',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#000000',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
            {
                lightness: 17,
            },
        ],
    },
];

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export const getStaticPaths = () => {
    return {
        fallback: true,
        paths: [],
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { username } = context.params;

    try {
        const response = await api.get(`/profile/${username}`);
        const profile = response.data;

        return { props: { profile }, revalidate: 1 };
    } catch (err) {
        return { props: { error: true } };
    }
};

function Profile({ profile, error }: User) {
    const { t, lang } = useTranslation();
    const { user, isAuthenticated } = useAuth();
    const { theme } = useTheme();

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Layout>
                <Wrapper className="mb-5">
                    <Container>
                        <Skeleton height={30} className="mb-3" />
                        <Skeleton count={4} />
                        <Skeleton height={75} className="mt-3 mb-3" />
                        <Skeleton height={200} className="mb-3" />
                        <Skeleton height={500} className="mb-3" />
                        <Skeleton height={40} className="mb-3" />
                    </Container>
                </Wrapper>
            </Layout>
        );
    }

    if (!profile || error) {
        return (
            <Error
                errorTitle={t('profile:profileNotFoundTitle')}
                errorText={t('profile:profileNotFoundText')}
            />
        );
    }

    const storiesRef = useRef(null);

    const [stories, setStories] = useState(profile.stories);
    const [useList, setUseList] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const visibleUrl = useMemo(() => {
        let url = profile.website;
        let sanitizeUrl = url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');
        return sanitizeUrl;
    }, []);

    const mapOptions = {
        disableDefaultUI: true,
        styles: theme === 'light' ? lightMapTheme : darkMapTheme,
    };

    const getMapBounds = (map, maps, stories) => {
        const bounds = new maps.LatLngBounds();

        stories.forEach((story) => {
            bounds.extend(
                new maps.LatLng(
                    story.mountain.latitude,
                    story.mountain.longitude
                )
            );
        });
        return bounds;
    };

    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
                map.setZoom(map.getZoom() - 1);
            });
        });
    };

    const apiIsLoaded = (map, maps, stories) => {
        const bounds = getMapBounds(map, maps, stories);

        map.fitBounds(bounds);
        map.setZoom(map.getZoom() - 1);

        bindResizeListener(map, maps, bounds);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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

    const storySlug = useCallback((slug: string) => {
        return `/${profile.username}/${slug}`;
    }, []);

    const mountainSlug = useCallback((slug: string) => {
        return `/mountains/${slug}`;
    }, []);

    return (
        <>
            <NextSeo
                title={profile.name}
                description={profile.bio}
                openGraph={{
                    title: profile.name,
                    description: profile.bio,
                    url: `${process.env.NEXT_PUBLIC_HOME_URL}/${profile.username}`,
                    type: 'profile',
                    profile: {
                        firstName: profile.name,
                        username: profile.username,
                    },
                    images: [
                        {
                            url: profile.avatar_url,
                            alt: profile.name,
                        },
                    ],
                }}
            />

            <SocialProfileJsonLd
                type="Person"
                name={profile.name}
                url={`${process.env.NEXT_PUBLIC_HOME_URL}/${profile.username}`}
                sameAs={[profile.website]}
            />

            <Layout>
                <Wrapper className={isAuthenticated && 'user-authenticated'}>
                    <Container>
                        <Row>
                            <Col
                                xs={12}
                                md={{ size: 4, offset: 1 }}
                                lg={{ size: 4, offset: 0 }}
                            >
                                <Sticky>
                                    <ProfileHeader>
                                        <ProfileAvatar>
                                            <Image
                                                src={profile.avatar_url}
                                                alt={profile.name}
                                                width={100}
                                                height={100}
                                                loading="eager"
                                            />
                                        </ProfileAvatar>
                                        <ProfileInfo>
                                            <h1>
                                                <span>{profile.name}</span>
                                                {profile.nationality.value !==
                                                    0 ||
                                                    (profile.nationality !==
                                                        undefined && (
                                                        <Flag
                                                            country={String(
                                                                profile
                                                                    .nationality
                                                                    .value
                                                            )}
                                                        />
                                                    ))}
                                            </h1>
                                            {profile.bio && (
                                                <p>{profile.bio}</p>
                                            )}
                                            {profile.website && (
                                                <a
                                                    href={profile.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {visibleUrl}
                                                </a>
                                            )}
                                        </ProfileInfo>
                                    </ProfileHeader>

                                    {isAuthenticated &&
                                        user?.credentials.username ===
                                            profile.username && (
                                            <EditProfile>
                                                <Link
                                                    href="/account"
                                                    lang={lang}
                                                >
                                                    <a className="btn btn-block btn-edit-profile">
                                                        {t(
                                                            'profile:editProfile'
                                                        )}
                                                    </a>
                                                </Link>
                                            </EditProfile>
                                        )}

                                    <ProfileStats className="text-center">
                                        <div className="counter">
                                            <button
                                                onClick={() =>
                                                    scrollToRef(storiesRef)
                                                }
                                            >
                                                <strong>
                                                    {profile.stories.length}
                                                </strong>
                                                <p>
                                                    {profile.stories.length ===
                                                    1
                                                        ? t(
                                                              'profile:storiesSingular'
                                                          )
                                                        : t('profile:stories')}
                                                </p>
                                            </button>
                                        </div>
                                        <div className="counter">
                                            {profile.bucketlist.length > 0 ? (
                                                <button
                                                    onClick={() =>
                                                        setIsModalOpen(true)
                                                    }
                                                >
                                                    <strong>
                                                        {
                                                            profile.bucketlist
                                                                .length
                                                        }
                                                    </strong>
                                                    <p>Bucketlist</p>
                                                </button>
                                            ) : (
                                                <>
                                                    <strong>
                                                        {
                                                            profile.bucketlist
                                                                .length
                                                        }
                                                    </strong>
                                                    <p>Bucketlist</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="counter">
                                            <strong>0</strong>
                                            <p>Badges</p>
                                        </div>
                                    </ProfileStats>

                                    {stories.length >= 2 && (
                                        <ProfileMap>
                                            <div className="alignment">
                                                <GoogleMapReact
                                                    bootstrapURLKeys={{
                                                        language: lang,
                                                        key:
                                                            process.env
                                                                .NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                                                    }}
                                                    defaultCenter={
                                                        defaultMapOptions.center
                                                    }
                                                    defaultZoom={
                                                        defaultMapOptions.zoom
                                                    }
                                                    options={mapOptions}
                                                    onGoogleApiLoaded={({
                                                        map,
                                                        maps,
                                                    }) =>
                                                        apiIsLoaded(
                                                            map,
                                                            maps,
                                                            stories
                                                        )
                                                    }
                                                    yesIWantToUseGoogleMapApiInternals
                                                >
                                                    {stories.map((story) => (
                                                        <MapPin
                                                            key={story.slug}
                                                            lat={
                                                                story.mountain
                                                                    .latitude
                                                            }
                                                            lng={
                                                                story.mountain
                                                                    .longitude
                                                            }
                                                            mountain={
                                                                story.mountain
                                                                    .name
                                                            }
                                                            href={storySlug(
                                                                story.slug
                                                            )}
                                                        />
                                                    ))}
                                                </GoogleMapReact>
                                            </div>
                                        </ProfileMap>
                                    )}
                                </Sticky>
                            </Col>
                            <Col xs={12} md={7} lg={8}>
                                {stories.length > 0 && (
                                    <LayoutSelector className="d-block d-sm-none">
                                        <button
                                            onClick={() => setUseList(true)}
                                            className={useList ? 'active' : ''}
                                        >
                                            <svg
                                                width={20}
                                                height={18}
                                                viewBox="0 0 20 18"
                                                fill="none"
                                            >
                                                <rect
                                                    y={0.703}
                                                    width={20}
                                                    height={1.854}
                                                    rx={0.927}
                                                />
                                                <rect
                                                    y={8.121}
                                                    width={20}
                                                    height={1.854}
                                                    rx={0.927}
                                                />
                                                <rect
                                                    y={15.539}
                                                    width={20}
                                                    height={1.854}
                                                    rx={0.927}
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            className={!useList ? 'active' : ''}
                                            onClick={() => setUseList(false)}
                                        >
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path d="M.5.5h8v8h-8zM11.5.5h8v8h-8zM11.5 11.5h8v8h-8zM.5 11.5h8v8h-8z" />
                                            </svg>
                                        </button>
                                    </LayoutSelector>
                                )}

                                <Stories
                                    className={!useList && 'grid-layout'}
                                    ref={storiesRef}
                                >
                                    {stories.length > 0 ? (
                                        stories.map((story) => (
                                            <Story key={story.slug}>
                                                <Link
                                                    href={storySlug(story.slug)}
                                                    lang={lang}
                                                >
                                                    <a>
                                                        <div className="story-image">
                                                            <Image
                                                                src={
                                                                    story
                                                                        .images[0]
                                                                }
                                                                alt={
                                                                    story.title
                                                                }
                                                                width={1560}
                                                                height={1560}
                                                                loading="eager"
                                                            />
                                                        </div>
                                                        {useList && (
                                                            <div className="story-info">
                                                                <h2>
                                                                    {
                                                                        story.title
                                                                    }
                                                                </h2>
                                                                <p>
                                                                    <Flag
                                                                        country={
                                                                            story
                                                                                .mountain
                                                                                .country
                                                                        }
                                                                    />{' '}
                                                                    <span>
                                                                        {
                                                                            story
                                                                                .mountain
                                                                                .name
                                                                        }
                                                                        ,{' '}
                                                                        {elevation(
                                                                            story
                                                                                .mountain
                                                                                .elevation
                                                                        )}{' '}
                                                                        —{' '}
                                                                        <time
                                                                            title={storyDateFormatted(
                                                                                story.created_at
                                                                            )}
                                                                        >
                                                                            {storyDate(
                                                                                story.created_at
                                                                            )}
                                                                        </time>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        )}
                                                    </a>
                                                </Link>
                                            </Story>
                                        ))
                                    ) : (
                                        <NoStories>
                                            <NoContent />
                                            <h5>{t('profile:noContent')}</h5>
                                            <p>
                                                {lang === 'pt'
                                                    ? `Aguarde mais um pouco para ler
                                                uma história de conquista de ${profile.name}!`
                                                    : `Wait a little while longer to read a story of ${profile.name}'s summit!`}
                                            </p>
                                        </NoStories>
                                    )}
                                </Stories>
                            </Col>
                        </Row>
                    </Container>
                </Wrapper>

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <Bucketlist>
                        {profile.bucketlist.length > 0 &&
                            profile.bucketlist.map((bucketlist) => (
                                <li key={bucketlist.slug}>
                                    <Link
                                        href={mountainSlug(bucketlist.slug)}
                                        lang={lang}
                                    >
                                        <a>
                                            <Flag
                                                country={bucketlist.country}
                                            />
                                            <span>{bucketlist.name}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                    </Bucketlist>
                </StyledModal>

                {isAuthenticated ? <Tapbar activePage="profile" /> : <Footer />}
            </Layout>
        </>
    );
}

export default Profile;
