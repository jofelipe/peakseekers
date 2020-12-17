import React, { useState, useMemo, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import Lottie from 'react-lottie-player';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import Drawer from 'react-drag-drawer';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import parse from 'html-react-parser';
import api from '../../services/api';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import { useAlert } from '../../hooks/alert';
import { GetStaticProps } from 'next';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { format, formatDistance, parseJSON } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { Carousel } from 'react-responsive-carousel';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import loadingAnimationColor from '../../animations/loading-color.json';
import addBucketlist from '../../animations/add-bucketlist.json';
import likeStory from '../../animations/like-story.json';
import deleteAccountAnimation from '../../animations/delete-account.json';

import Error from '../../layouts/error';
import Layout from '../../layouts/main';
import Flag from '../../components/Flag';
import Mountain from '../../components/svg/Mountain';
import Footer from '../../components/Footer';
import Tapbar from '../../components/Tapbar';
import Disqus from '../../components/Disqus';

import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from 'react-share';
import { ClockIcon, ShareAndroidIcon, LinkIcon } from '@primer/octicons-react';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import {
    Wrapper,
    StoryTitle,
    StoryImages,
    StoryContent,
    StoryMountain,
    StoryAuthor,
    StoryActions,
    StoryShare,
    StoryShareWrapper,
    ShareButtons,
    InstagramShareModal,
    Comments,
} from '../../styles/story/story';
import { StyledModal } from '../../styles/modal';

interface StoryProps {
    story: {
        id: string;
        content: string;
        title: string;
        created_at: string;
        slug: string;
        mountain_id: string;
        likes: number;
        user_id: string;
        images: string[];
        mountain: {
            name: string;
            range: string;
            elevation: number;
            country: string;
            continent: string;
            slug: string;
        };
        author: {
            avatar_url: string;
            username: string;
            name: string;
            id: string;
        };
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
        const response = await api.get(`/story/${slug}`);
        const story = response.data;

        return { props: { story }, revalidate: 1 };
    } catch (err) {
        return { props: { error: true } };
    }
};

const Story: React.FC<StoryProps> = ({ story, error }) => {
    const { t, lang } = useTranslation();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { alert } = useAlert();

    if (router.isFallback) {
        return (
            <Layout>
                <Wrapper className="mb-5">
                    <Skeleton height={50} className="mb-3" />
                    <Skeleton className="mb-3" />
                    <Skeleton height={375} className="mb-5" />
                    <Skeleton count={100} />
                </Wrapper>
            </Layout>
        );
    }

    if (!story || error) {
        return (
            <Error
                errorTitle={t('story_public:storyNotFoundTitle')}
                errorText={t('story_public:storyNotFoundText')}
            />
        );
    }

    const [dropdownOpen, setOpen] = useState(false);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [canDoPostActions, setCanDoPostActions] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalShareInstagramOpen, setIsModalShareInstagramOpen] = useState(
        false
    );
    const [bucketlistIconGoTo, setBucketlistIconGoTo] = useState(0);
    const [bucketlistIconPlay, setBucketlistIconPlay] = useState(false);
    const [mountainAddedToBucketlist, setMountainAddedToBucketlist] = useState(
        false
    );
    const [likeIconGoTo, setLikeIconGoTo] = useState(0);
    const [likeIconPlay, setLikeIconPlay] = useState(false);
    const [storyLiked, setStoryLiked] = useState(false);
    const [deleteAnimationGoTo, setDeleteAnimationGoTo] = useState(0);
    const [deleteAnimationPlay, setDeleteAnimationPlay] = useState(false);

    const storyDate = useMemo(() => {
        return formatDistance(parseJSON(story.created_at), new Date(), {
            locale: lang === 'pt' ? ptBR : enUS,
            addSuffix: true,
        });
    }, []);

    const storyDateFormatted = useMemo(() => {
        return format(parseJSON(story.created_at), 'Pp', {
            locale: lang === 'pt' ? ptBR : enUS,
        });
    }, []);

    const elevation = useMemo(() => {
        if (user?.credentials.use_feet) {
            return `${Math.floor(story.mountain.elevation * 3.2808)}ft`;
        } else {
            return `${story.mountain.elevation}m`;
        }
    }, []);

    const mountainContinent = useMemo(() => {
        if (lang === 'pt') {
            switch (story.mountain.continent) {
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
                    return story.mountain.continent;
            }
        } else {
            return story.mountain.continent;
        }
    }, []);

    const storyUrl = useMemo(() => {
        return `${process.env.NEXT_PUBLIC_HOME_URL}/${story.author.username}/${story.slug}`;
    }, []);

    const authorUrl = useMemo(() => {
        return `/${story.author.username}/`;
    }, []);

    const mountainUrl = useMemo(() => {
        return `/mountains/${story.mountain.slug}`;
    }, []);

    const instagramStoryImage = useMemo(() => {
        let imageUrl = story.images[0];
        let lastSlash = imageUrl.lastIndexOf('/');
        let imageName = imageUrl
            .substring(lastSlash + 1)
            .replace('?alt=media', '');

        let mountainElevation = `${story.mountain.elevation}m`;

        if (user?.credentials.use_feet) {
            mountainElevation = `${Math.floor(
                story.mountain.elevation * 3.2808
            )}ft`;
        }

        return `https://peakseekers.app/api/instagram.png?title=${story.title}&username=${story.author.username}&imageUrl=${imageName}&mountainName=${story.mountain.name}&mountainElevation=${mountainElevation}`;
    }, [user]);

    useEffect(() => {
        if (!router.isFallback) {
            if (user?.likes.includes(story.id)) {
                setStoryLiked(true);
                setLikeIconGoTo(50);
            }

            if (user?.bucketlist.includes(story.mountain_id)) {
                setMountainAddedToBucketlist(true);
                setBucketlistIconGoTo(65);
            }

            if (user?.credentials.id === story.author.id) {
                setCanDoPostActions(false);
            }
        }
    }, [router.isFallback, user, story]);

    const handleAddBucketlist = async () => {
        if (mountainAddedToBucketlist) {
            try {
                await api.get(
                    `mountain/${story.mountain_id}/remove-bucketlist`
                );
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
                await api.get(`mountain/${story.mountain_id}/add-bucketlist`);
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

    const handleLikeStory = async () => {
        if (storyLiked) {
            try {
                await api.get(`story/${story.id}/unlike`);
                setStoryLiked(false);
                setLikeIconPlay(false);
                setLikeIconGoTo(0);
            } catch (err) {
                alert({
                    type: 'error',
                    title: t('common:messages.errorDislikeStoryTitle'),
                    description: t('common:messages.errorDislikeStoryText'),
                });
            }
        } else {
            setLikeIconPlay(true);

            try {
                await api.get(`story/${story.id}/like`);

                setStoryLiked(true);
            } catch (err) {
                setLikeIconPlay(false);

                alert({
                    type: 'error',
                    title: t('common:messages.errorLikeStoryTitle'),
                    description: t('common:messages.errorLikeStoryText'),
                });
            }
        }
    };

    const toggle = () => setOpen(!dropdownOpen);

    const handleShareStory = () => {
        setBottomSheetOpen(!bottomSheetOpen);
    };

    const handleShareInstagram = () => {
        setBottomSheetOpen(false);
        setIsModalShareInstagramOpen(true);
    };

    const handleCopyStoryLink = () => {
        alert({
            type: 'success',
            title: t('common:messages.linkCopiedTitle'),
            description: t('common:messages.linkCopiedText'),
        });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleModalShareInstagram = () => {
        setIsModalShareInstagramOpen(!isModalShareInstagramOpen);
    };

    const handleDeleteStory = async () => {
        setDeleteAnimationPlay(true);

        try {
            await api.delete(`/story/${story.slug}`);

            alert({
                type: 'success',
                title: t('common:messages.successStoryDeletedTitle'),
                description: t('common:messages.successStoryDeletedText'),
            });

            Router.pushI18n({ url: '/home', options: { lang } });
        } catch (err) {
            setDeleteAnimationPlay(false);

            alert({
                type: 'error',
                title: t('common:messages.errorStoryDeletedTitle'),
                description: t('common:messages.errorStoryDeletedText'),
            });
        }
    };

    return (
        <>
            <NextSeo
                title={story.title}
                description={
                    lang === 'pt'
                        ? `Se inspire com a história de conquista de ${story.author.name} em ${story.mountain.name};`
                        : `Get inspired by ${story.author.name}'s story of summit on ${story.mountain.name}.`
                }
                openGraph={{
                    title: story.title,
                    description:
                        lang === 'pt'
                            ? `Se inspire com a história de conquista de ${story.author.name} em ${story.mountain.name};`
                            : `Get inspired by ${story.author.name}'s story of summit on ${story.mountain.name}.`,
                    url: storyUrl,
                    type: 'article',
                    article: {
                        publishedTime: story.created_at,
                        authors: [
                            `${process.env.NEXT_PUBLIC_HOME_URL}${authorUrl}`,
                        ],
                        tags: ['Peakseekers', 'Mountains', story.mountain.name],
                    },
                    images: [
                        {
                            url: story.images[0],
                            alt: story.title,
                        },
                    ],
                }}
            />

            <ArticleJsonLd
                url={storyUrl}
                title={story.title}
                images={[story.images[0]]}
                datePublished={story.created_at}
                authorName={story.author.name}
                publisherName="Peakseekers"
                publisherLogo={`${process.env.NEXT_PUBLIC_HOME_URL}/static/assets/img/logo.png`}
                description={
                    lang === 'pt'
                        ? `Se inspire com a história de conquista de ${story.author.name} em ${story.mountain.name};`
                        : `Get inspired by ${story.author.name}'s story of summit on ${story.mountain.name}.`
                }
            />

            <Layout>
                <Wrapper className={isAuthenticated ? 'space-md' : ''}>
                    <StoryTitle>
                        <h1>{story.title}</h1>
                        <time title={storyDateFormatted}>
                            <ClockIcon size={14} />
                            {storyDate}
                        </time>

                        {isAuthenticated && !canDoPostActions && (
                            <ButtonDropdown
                                isOpen={dropdownOpen}
                                toggle={toggle}
                                direction="left"
                            >
                                <DropdownToggle>
                                    <span className="fill"></span>
                                    <span className="fill"></span>
                                    <span className="fill"></span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link
                                            href={`/edit?slug=${story.slug}`}
                                            lang={lang}
                                        >
                                            <a>{t('story_public:editStory')}</a>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem onClick={toggleModal}>
                                        {t('story_public:deleteStory')}
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        )}
                    </StoryTitle>

                    <StoryImages>
                        <Carousel
                            showArrows={false}
                            infiniteLoop={false}
                            showThumbs={false}
                            swipeScrollTolerance={30}
                        >
                            {story.images.map((photo, index) => {
                                return (
                                    <div key={index}>
                                        <Image
                                            src={photo}
                                            alt={story.title}
                                            width={1560}
                                            height={1560}
                                            loading="eager"
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </StoryImages>

                    <StoryContent>{parse(story.content)}</StoryContent>

                    <StoryMountain
                        isAddedToBucketlist={
                            mountainAddedToBucketlist ? true : false
                        }
                    >
                        <h5>
                            <Link href={mountainUrl} lang={lang}>
                                <a>
                                    <Mountain />
                                    {story.mountain.name}
                                </a>
                            </Link>
                        </h5>

                        <div className="d-flex justify-content-between align-items-center">
                            <ul>
                                <li>
                                    <b>
                                        {t('story_public:mountainElevation')}:{' '}
                                    </b>
                                    {elevation}
                                </li>
                                <li>
                                    <b>
                                        {t('story_public:mountainContinent')}:{' '}
                                    </b>
                                    {mountainContinent}
                                </li>
                                {story.mountain.range === '' ? (
                                    ''
                                ) : (
                                    <li>
                                        <b>
                                            {t('story_public:mountainRange')}:{' '}
                                        </b>
                                        {story.mountain.range}
                                    </li>
                                )}
                                <li>
                                    <b>{t('story_public:mountainCountry')}: </b>
                                    <Flag
                                        country={story.mountain.country}
                                        text
                                    />
                                </li>
                            </ul>

                            {isAuthenticated && canDoPostActions && (
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
                                            ? t(
                                                  'story_public:addedToBucketlist'
                                              )
                                            : t('story_public:addToBucketlist')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </StoryMountain>

                    <div
                        className={
                            isAuthenticated ? 'space-user-authenticated' : ''
                        }
                    >
                        <StoryAuthor>
                            <div className="author-info">
                                <Link href={authorUrl} lang={lang}>
                                    <a>
                                        <Image
                                            src={story.author.avatar_url}
                                            alt={story.author.name}
                                            width={50}
                                            height={50}
                                            loading="eager"
                                        />
                                    </a>
                                </Link>
                                <div className="author-info-space">
                                    <span>{t('story_public:writtenBy')}</span>
                                    <p>
                                        <Link href={authorUrl} lang={lang}>
                                            <a>{story.author.name}</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <StoryActions>
                                {isAuthenticated && canDoPostActions && (
                                    <button
                                        onClick={handleLikeStory}
                                        className="like-story"
                                    >
                                        <Lottie
                                            loop={false}
                                            animationData={likeStory}
                                            play={likeIconPlay}
                                            goTo={likeIconGoTo}
                                            style={{
                                                width: 48,
                                                height: 48,
                                            }}
                                        />
                                    </button>
                                )}
                                <button
                                    onClick={handleShareStory}
                                    className="share-story"
                                >
                                    <ShareAndroidIcon size={24} />
                                </button>
                            </StoryActions>
                        </StoryAuthor>

                        <Comments>
                            <Disqus id={story.id} title={story.title} url={storyUrl} />
                        </Comments>
                    </div>
                </Wrapper>

                {isAuthenticated ? <Tapbar /> : <Footer />}

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <div className="confirmation">
                        <p className="mb-4">
                            {t('story_public:deleteStoryModal')}
                        </p>
                        <button
                            className="btn btn-delete"
                            onClick={handleDeleteStory}
                        >
                            <Lottie
                                loop={false}
                                animationData={deleteAccountAnimation}
                                play={deleteAnimationPlay}
                                goTo={deleteAnimationGoTo}
                                style={{
                                    width: 400,
                                    height: 300,
                                }}
                            />
                            {t('story_public:deleteStoryYes')}
                        </button>
                        <button
                            onClick={toggleModal}
                            className="btn btn-link btn-block"
                        >
                            {t('story_public:deleteStoryNo')}
                        </button>
                    </div>
                </StyledModal>

                <StyledModal
                    isOpen={isModalShareInstagramOpen}
                    onBackgroundClick={toggleModalShareInstagram}
                    onEscapeKeydown={toggleModalShareInstagram}
                >
                    <InstagramShareModal>
                        <p>{t('story_public:storiesShareText')}</p>
                        <div className="image-wrapper">
                            <Lottie
                                loop
                                animationData={loadingAnimationColor}
                                play
                                style={{
                                    width: 48,
                                    height: 48,
                                }}
                            />
                            <img src={instagramStoryImage} alt="" />
                        </div>
                        <div className="footer-modal">
                            <a
                                href={instagramStoryImage}
                                className="btn btn-download btn-block"
                                download="instagram.png"
                            >
                                {t('story_public:storiesShareButton')}
                            </a>
                        </div>
                    </InstagramShareModal>
                </StyledModal>

                <Drawer
                    open={bottomSheetOpen}
                    onRequestClose={handleShareStory}
                    direction="bottom"
                    modalElementClass="bottom-sheet"
                    containerElementClass="bottom-sheet-bg"
                >
                    <button
                        onClick={handleShareStory}
                        className="bottom-sheet-close"
                    ></button>
                    <StoryShare>
                        <StoryShareWrapper>
                            <p>{t('story_public:shareStory')}</p>

                            <ShareButtons>
                                <FacebookShareButton
                                    quote={
                                        lang === 'pt'
                                            ? `Se inspire com a história de conquista de ${story.author.name} em ${story.mountain.name};`
                                            : `Get inspired by ${story.author.name}'s story of summit on ${story.mountain.name}.`
                                    }
                                    url={storyUrl}
                                    onShareWindowClose={handleShareStory}
                                    hashtag="#Peakseekers"
                                >
                                    <i className="ico-facebook"></i>
                                    <span>Facebook</span>
                                </FacebookShareButton>

                                <button onClick={handleShareInstagram}>
                                    <i className="ico-instagram"></i>
                                    <span>Stories</span>
                                </button>

                                <LinkedinShareButton
                                    url={storyUrl}
                                    title={story.title}
                                    summary={
                                        lang === 'pt'
                                            ? `Se inspire com a história de conquista de ${story.author.name} em ${story.mountain.name};`
                                            : `Get inspired by ${story.author.name}'s story of summit on ${story.mountain.name}.`
                                    }
                                    source="Peakseekers"
                                    onShareWindowClose={handleShareStory}
                                >
                                    <i className="ico-linkedin"></i>
                                    <span>Linkedin</span>
                                </LinkedinShareButton>

                                <WhatsappShareButton
                                    title={story.title}
                                    separator=": "
                                    url={storyUrl}
                                    onShareWindowClose={handleShareStory}
                                >
                                    <i className="ico-whatsapp"></i>
                                    <span>WhatsApp</span>
                                </WhatsappShareButton>
                            </ShareButtons>

                            <CopyToClipboard
                                text={storyUrl}
                                onCopy={handleCopyStoryLink}
                            >
                                <button className="btn btn-block btn-copy-link">
                                    <LinkIcon size={16} />{' '}
                                    {t('story_public:copyLink')}
                                </button>
                            </CopyToClipboard>
                        </StoryShareWrapper>
                    </StoryShare>
                </Drawer>
            </Layout>
        </>
    );
};

export default Story;
