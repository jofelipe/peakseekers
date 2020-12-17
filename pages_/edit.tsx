import React, { useEffect, useState, useRef } from 'react';
import Cropper from 'react-cropper';
import TextareaAutosize from 'react-textarea-autosize';
import Lottie from 'react-lottie-player';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import api from '../services/api';

import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/auth';
import { useAlert } from '../hooks/alert';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { searchClient } from '../config/algolia';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import {
    SearchIcon,
    FileMediaIcon,
    XCircleFillIcon,
} from '@primer/octicons-react';
import { Container } from 'reactstrap';

import loadingAnimation from '../animations/loading.json';

import Layout from '../layouts/main';
import Autocomplete from '../components/Autocomplete';
import Tapbar from '../components/Tapbar';

import { StyledModal } from '../styles/modal';

import {
    Wrapper,
    StoryTitle,
    SearchMountain,
    AddImages,
    EditorWrapper,
    PublishStory,
    ModalCrop,
} from '../styles/story';
import { ChangeItem } from '../styles/story/edit';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
});

const modules = {
    toolbar: [
        [
            { header: '1' },
            { header: '2' },
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            { list: 'ordered' },
            { list: 'bullet' },
            'link',
        ],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
];

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;

    try {
        const response = await api.get<StoryProps>(`/story/${slug}`);
        const story = response.data;

        return { props: { story } };
    } catch (err) {
        return { props: { error: true } };
    }
};

const Story = ({ story, error }: StoryProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const { alert } = useAlert();
    const { t, lang } = useTranslation();
    const router = useRouter();

    const storyTitleRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAddImages, setShowAddImages] = useState(true);
    const [storySaved, setStorySaved] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);
    const [changeMountain, setChangeMountain] = useState(false);
    const [changeImages, setChangeImages] = useState(false);
    const [storyTimeout, setStoryTimeout] = useState(null);
    const [cropper, setCropper] = useState<any>();
    const [editorHeight, setEditorHeight] = useState({});
    const [files, setFiles] = useState([]);
    const [selectedMountain, setSelectedMountain] = useState(
        story?.mountain_id
    );
    const [activeImageCrop, setActiveImageCrop] = useState({
        name: null,
        type: null,
    });
    const [image, setImage] = useState('');
    const [storyTitle, setStoryTitle] = useState(story?.title);
    const [storyContent, setStoryContent] = useState(story?.content);

    if (error || !story) {
        return Router.back();
    }

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }
    }, [isAuthenticated, loading, user, story]);

    useEffect(() => {
        if (!loading) {
            if (story.author.id !== user?.credentials.id) {
                Router.back();
            }
        }
    }, [loading]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setShowAddImages(false);

            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );

            alert({
                type: 'info',
                title: t('common:messages.successImagesUploadTitle'),
                description: t('common:messages.successImagesUploadText'),
            });
        },
        maxFiles: 5,
        onDropRejected: () => {
            alert({
                type: 'error',
                title: t('common:messages.errorImagesUploadTitle'),
                description: t('common:messages.errorImagesUploadText'),
            });
        },
    });

    const handleRemoveImage = (file_name: any) => {
        const newList = files.filter((file) => file.name !== file_name);
        setFiles(newList);
    };

    const handleCropImage = (
        file_name: any,
        file_preview: any,
        file_type: string
    ) => {
        setActiveImageCrop({ name: file_name, type: file_type });
        setImage(file_preview);
        setIsModalOpen(true);
    };

    const getCropData = async () => {
        if (typeof cropper !== 'undefined') {
            setIsModalOpen(false);

            await cropper.getCroppedCanvas().toBlob((blob) => {
                if (!blob) {
                    return;
                }

                const newFile = new File([blob], activeImageCrop.name, {
                    lastModified: Date.now(),
                    type: activeImageCrop.type,
                });

                Object.assign(newFile, {
                    preview: window.URL.createObjectURL(blob),
                });

                setFiles([
                    ...files.map((file) =>
                        file.name === activeImageCrop.name ? newFile : file
                    ),
                ]);
            }, activeImageCrop.type);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const thumbs = files.map((file) => (
        <div key={file.name} className="image">
            <div>
                <button
                    className="remove-image"
                    onClick={() => handleRemoveImage(file.name)}
                    title={t('story:removeImage')}
                >
                    <XCircleFillIcon size={16} />
                </button>
                <button
                    className="image-button"
                    onClick={() => {
                        handleCropImage(file.name, file.preview, file.type);
                    }}
                >
                    <img
                        src={file.preview}
                        alt=""
                        title={t('story:cropImage')}
                    />
                </button>
            </div>
        </div>
    ));

    const resetTimeout = (id: any, newID: any) => {
        clearTimeout(id);
        return newID;
    };

    const SaveMessage = ({ visible }) => (
        <div className={'saved' + (visible ? ' saved-visible' : '')}>
            <p>{t('story:storySaved')}</p>
        </div>
    );

    const saveValue = () => {
        setStorySaved(true);
        setTimeout(() => setStorySaved(false), 1000);
    };

    const editValue = (content) => {
        setTimeout(resetTimeout(storyTimeout, setTimeout(saveValue, 400)));
        setStoryContent(content);
    };

    const handleStoryTitleChange = (event) => {
        setStoryTitle(event.target.value);
    };

    const onSuggestionSelected = (_, { suggestion }) => {
        setSelectedMountain(suggestion.objectID);
    };

    const onSuggestionCleared = () => {
        setSelectedMountain('');
    };

    const handleStory = async () => {
        setPublishLoading(true);

        if (storyTitle === '') {
            storyTitleRef.current.focus();
            setPublishLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorStoryTitleRequiredTitle'),
                description: t('common:messages.errorStoryTitleRequiredText'),
            });
        } else if (selectedMountain === '') {
            setPublishLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorStoryMountainRequiredTitle'),
                description: t(
                    'common:messages.errorStoryMountainRequiredText'
                ),
            });
        } else if (changeImages && files.length === 0) {
            setPublishLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorStoryImageRequiredTitle'),
                description: t('common:messages.errorStoryImageRequiredText'),
            });
        } else if (
            storyContent.replace(/<(.|\n)*?>/g, '').trim().length === 0
        ) {
            setPublishLoading(false);

            alert({
                type: 'error',
                title: t('common:messages.errorStoryRequiredTitle'),
                description: t('common:messages.errorStoryRequiredText'),
            });
        } else {
            try {
                const data = new FormData();

                if (changeImages) {
                    files.forEach(function (image, index) {
                        data.append(`image${index}`, image);
                    });
                }

                data.append('mountain_id', selectedMountain);
                data.append('title', storyTitle);
                data.append('content', storyContent);

                const config = {
                    headers: { 'content-type': `multipart/form-data;` },
                };

                const response = await api.patch(
                    `/story/${story.id}`,
                    data,
                    config
                );

                alert({
                    type: 'success',
                    title: t('common:messages.successStoryUpdatedTitle'),
                    description: t('common:messages.successStoryUpdatedText'),
                });

                const { slug } = response.data;

                router.push({
                    pathname:
                        lang === 'pt'
                            ? `/${lang}/${
                                  user?.credentials.username
                              }/${slug}?cache=${Math.floor(Math.random() * 10)}`
                            : `/${
                                  user?.credentials.username
                              }/${slug}?cache=${Math.floor(
                                  Math.random() * 10
                              )}`,
                });
            } catch (err) {
                setPublishLoading(false);

                if (err.message === 'Request failed with status code 403') {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorStoryPublished403Title'),
                        description: t(
                            'common:messages.errorStoryPublished403Text'
                        ),
                    });
                } else {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorStoryPublishedTitle'),
                        description: t(
                            'common:messages.errorStoryPublishedText'
                        ),
                    });
                }
            }
        }
    };

    useEffect(() => {
        if (files.length === 0) {
            setShowAddImages(true);
        }
    }, [files]);

    useEffect(() => {
        const documentHeight = window.innerHeight;
        setEditorHeight({
            minHeight: `${documentHeight - 365}px`,
        });
    }, []);

    return (
        <>
            <NextSeo title={t('story:titleEdit')} noindex={true} />

            <Layout isPrivateRoute>
                <Container>
                    <Wrapper>
                        <PublishStory>
                            <div className="story-status">
                                <SaveMessage visible={storySaved} />
                            </div>
                            <button
                                className={
                                    publishLoading
                                        ? 'btn btn-publish is-loading'
                                        : 'btn btn-publish'
                                }
                                disabled={publishLoading ? true : false}
                                onClick={handleStory}
                            >
                                {publishLoading && (
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
                                {t('story:publishEdit')}
                            </button>
                        </PublishStory>

                        <StoryTitle>
                            <TextareaAutosize
                                placeholder={t('story:titlePlaceholder')}
                                maxRows={3}
                                onChange={handleStoryTitleChange}
                                autoFocus
                                ref={storyTitleRef}
                                defaultValue={storyTitle}
                            />
                        </StoryTitle>

                        <SearchMountain>
                            {changeMountain && (
                                <>
                                    <SearchIcon size={24} />
                                    <InstantSearch
                                        indexName="mountains"
                                        searchClient={searchClient}
                                    >
                                        <div className="mountain-autocomplete">
                                            <Configure hitsPerPage={10} />
                                            <Autocomplete
                                                useFeet={
                                                    user?.credentials.use_feet
                                                }
                                                onSuggestionSelected={
                                                    onSuggestionSelected
                                                }
                                                onSuggestionCleared={
                                                    onSuggestionCleared
                                                }
                                            />
                                        </div>
                                    </InstantSearch>
                                </>
                            )}

                            {!changeMountain && (
                                <ChangeItem>
                                    <button
                                        onClick={() => {
                                            setChangeMountain(true);
                                            setSelectedMountain('');
                                        }}
                                        className="change-item"
                                    >
                                        {t('story:changeMountain')}
                                    </button>
                                </ChangeItem>
                            )}
                        </SearchMountain>

                        <AddImages>
                            {!changeImages && (
                                <ChangeItem>
                                    <button
                                        onClick={() => {
                                            setChangeImages(true);
                                            setFiles([]);
                                        }}
                                        className="change-item"
                                    >
                                        {t('story:changeImages')}
                                    </button>
                                </ChangeItem>
                            )}

                            {changeImages && showAddImages && (
                                <div
                                    {...getRootProps({ className: 'dropzone' })}
                                >
                                    <input {...getInputProps()} />
                                    <FileMediaIcon size={32} />
                                    <span>{t('story:addImages')}</span>
                                </div>
                            )}

                            {!showAddImages && (
                                <div className="images-preview">{thumbs}</div>
                            )}
                        </AddImages>

                        <EditorWrapper style={editorHeight} language={lang}>
                            <QuillNoSSRWrapper
                                defaultValue={storyContent}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                placeholder={t('story:storyPlaceholder')}
                                onChange={(content) => {
                                    editValue(content);
                                    setStoryContent(content);
                                }}
                                scrollingContainer="html"
                            />
                        </EditorWrapper>
                    </Wrapper>
                </Container>

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <ModalCrop>
                        <p>{t('story:cropImageModalText')}</p>
                        <Cropper
                            style={{ height: 300, width: '100%' }}
                            src={image}
                            viewMode={1}
                            guides={true}
                            initialAspectRatio={1 / 1}
                            aspectRatio={1 / 1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                        />
                        <div className="footer-modal">
                            <button
                                className="btn btn-crop btn-block"
                                onClick={getCropData}
                            >
                                {t('story:cropImageModalButton')}
                            </button>
                        </div>
                    </ModalCrop>
                </StyledModal>

                <Tapbar />
            </Layout>
        </>
    );
};

export default Story;
