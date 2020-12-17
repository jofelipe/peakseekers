import React, { useEffect, useState, useCallback } from 'react';
import Lottie from 'react-lottie-player';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import Cropper from 'react-cropper';
import Router from 'next-translate/Router';
import countries from 'i18n-iso-countries';
import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/auth';
import { useAlert } from '../hooks/alert';
import { NextSeo } from 'next-seo';
import { validate } from 'uuid';

import loadingAnimation from '../animations/loading.json';
import loadingAnimationColor from '../animations/loading-color.json';
import deleteAccountAnimation from '../animations/delete-account.json';

import { Container, FormGroup } from 'reactstrap';
import {
    PersonIcon,
    MailIcon,
    MentionIcon,
    LinkIcon,
    StarIcon,
    CommentIcon,
    LockIcon,
    IssueOpenedIcon,
    EyeClosedIcon,
    EyeIcon,
} from '@primer/octicons-react';

import SkeletonWrapper from '../components/Skeleton';
import Layout from '../layouts/main';
import FormControl from '../components/FormControl';
import Tapbar from '../components/Tapbar';

import {
    InputError,
    FormWrapper,
    AvatarContainer,
    DeleteAccount,
    ModalCrop,
} from '../styles/account';

import { StyledModal } from '../styles/modal';

interface ImageCropProps extends Blob {
    name?: string;
}

interface ProfileFormData {
    name: string;
    email: string;
    new_email: string;
    nationality: {
        label: string;
        value: string;
    };
    bio: string;
    username: string;
    website: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Account = () => {
    const {
        user,
        isAuthenticated,
        updateUser,
        loading,
        deleteUser,
    } = useAuth();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        clearErrors,
        unregister,
        watch,
        control,
        errors,
    } = useForm();
    const { alert } = useAlert();
    const { t, lang } = useTranslation();

    const [updateLoading, setUpdateLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [profilePicLoading, setProfilePicLoading] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [validUsername, setValidUsername] = useState(true);
    const [facebookUser, setFacebookUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [cropper, setCropper] = useState<any>();
    const [goTo, setGoTo] = useState(0);
    const [play, setPlay] = useState(false);
    const [imageCrop, setImageCrop] = useState('');
    const [imageCropData, setImageCropData] = useState({} as ImageCropProps);

    const oldPasswordField = watch('old_password');

    countries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`));
    const allCountries = countries.getNames(lang);
    const nationalityOptions = Object.entries(allCountries).map(
        ([value, label]) => ({
            value,
            label,
        })
    );

    const handlePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setPageLoading(true);

        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }

        if (user?.credentials.is_facebook_user) {
            setFacebookUser(true);
        }

        setPageLoading(false);
    }, [isAuthenticated, loading, user]);

    useEffect(() => {
        setValue('name', user?.credentials.name);
        setValue('email', user?.credentials.email);
        setValue(
            'username',
            !validate(user?.credentials.username)
                ? user?.credentials.username
                : ''
        );
        setValue(
            'nationality',
            user?.credentials.nationality.value === undefined ||
                user?.credentials.nationality.value == '0'
                ? {
                      value: 0,
                      label: t('account:nationality'),
                  }
                : {
                      value: user?.credentials.nationality.value,
                      label: countries.getName(
                          user?.credentials.nationality.value,
                          lang
                      ),
                  }
        );
        setValue('bio', user?.credentials.bio);
        setValue('website', user?.credentials.website);
    }, [user, lang, countries]);

    const handleAvatarChange = async (e) => {
        if (e.target.files) {
            if (e.target.files[0] instanceof Blob) {
                setIsCropModalOpen(true);
                setImageCropData(e.target.files[0]);

                const reader = new FileReader();

                reader.onload = () => {
                    setImageCrop(reader.result as any);
                };

                reader.readAsDataURL(e.target.files[0]);

                e.target.value = null;
            }
        }
    };

    const toggleCropModal = () => {
        setIsCropModalOpen(!isCropModalOpen);
    };

    const updateAvatar = async () => {
        if (typeof cropper !== 'undefined') {
            await cropper.getCroppedCanvas().toBlob((blob) => {
                if (!blob) {
                    return;
                }

                const newFile = new File([blob], imageCropData.name, {
                    lastModified: Date.now(),
                    type: imageCropData.type,
                });

                try {
                    setProfilePicLoading(true);

                    const data = new FormData();
                    data.append('image', newFile);

                    api.post('/user/avatar', data)
                        .then((response) => {
                            updateUser(response.data);

                            setProfilePicLoading(false);

                            alert({
                                type: 'success',
                                title: t(
                                    'common:messages.successfulProfilePicUpdatedTitle'
                                ),
                                description: t(
                                    'common:messages.successfulProfilePicUpdatedText'
                                ),
                            });

                            setIsCropModalOpen(false);
                        })
                        .catch((err) => {
                            setProfilePicLoading(false);

                            alert({
                                type: 'error',
                                title: t(
                                    'common:messages.errorProfilePicUpdatedTitle'
                                ),
                                description: t(
                                    'common:messages.errorProfilePicUpdatedText'
                                ),
                            });
                        });
                } catch (err) {
                    setProfilePicLoading(false);

                    alert({
                        type: 'error',
                        title: t('common:messages.errorProfilePicUpdatedTitle'),
                        description: t(
                            'common:messages.errorProfilePicUpdatedText'
                        ),
                    });
                }
            }, imageCropData.type);
        }
    };

    const handleUsernameChange = (value: string) => {
        const fieldValue = watch('username');

        if (fieldValue === user?.credentials.username) {
            setValidUsername(true);
            unregister('username');
            return;
        }

        const field = watch('username');

        if (field) {
            setUsernameLoading(true);
            api.post('user/username', { username: value })
                .then((data) => {
                    setUsernameLoading(false);
                    clearErrors('username');
                    setValidUsername(true);
                })
                .catch((err) => {
                    setUsernameLoading(false);
                    setError('username', {
                        type: 'manual',
                        message: t('common:validation.usernameAlreadyExists'),
                    });
                    setValidUsername(false);
                });
        }
    };

    const handleUpdateProfileSubmit = useCallback(
        async (data: ProfileFormData) => {
            setUpdateLoading(true);

            const emailField = getValues('email');

            try {
                const {
                    name,
                    email,
                    new_email,
                    bio,
                    nationality,
                    username,
                    website,
                    old_password,
                    password,
                    password_confirmation,
                } = data;

                let formData = {
                    name,
                    bio,
                    website,
                    nationality,
                    ...(old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation,
                          }
                        : {}),
                    ...(username === user?.credentials.username
                        ? {}
                        : { username }),
                    ...(emailField !== user?.credentials.email
                        ? {
                              new_email: emailField,
                              email: user?.credentials.email,
                          }
                        : { email }),
                };

                const response = await api.patch('/user', formData);

                updateUser(response.data);

                alert({
                    type: 'success',
                    title: t('common:messages.successfulProfileUpdatedTitle'),
                    description: t(
                        'common:messages.successfulProfileUpdatedText'
                    ),
                });

                setUpdateLoading(false);
            } catch (err) {
                setUpdateLoading(false);

                if (err.message === 'Request failed with status code 303') {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorProfileUpdated303Title'),
                        description: t(
                            'common:messages.errorProfileUpdated303Text'
                        ),
                    });
                } else if (
                    err.message === 'Request failed with status code 400'
                ) {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorProfileUpdated303Title'),
                        description: t('common:messages.errorRegister303Text'),
                    });
                } else if (
                    err.message === 'Request failed with status code 401'
                ) {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorProfileUpdated401Title'),
                        description: t(
                            'common:messages.errorProfileUpdated401Text'
                        ),
                    });
                } else {
                    alert({
                        type: 'error',
                        title: t('common:messages.errorProfileUpdatedTitle'),
                        description: t(
                            'common:messages.errorProfileUpdatedText'
                        ),
                    });
                }
            }
        },
        [user]
    );

    const handleDeleteAccount = async () => {
        setPlay(true);

        try {
            await api.delete('user');

            alert({
                type: 'success',
                title: t('common:messages.successAccountDeleteTitle'),
                description: t('common:messages.successAccountDeleteText'),
            });

            deleteUser();

            Router.pushI18n({ url: '/', options: { lang } });
        } catch (err) {
            setPlay(false);

            alert({
                type: 'error',
                title: t('common:messages.errorAccountDeleteTitle'),
                description: t('common:messages.errorAccountDeleteText'),
            });
        }
    };

    return (
        <>
            <NextSeo title={t('account:title')} noindex={true} />

            <Layout isPrivateRoute>
                <Container>
                    <FormWrapper>
                        {!pageLoading && (
                            <form
                                onSubmit={handleSubmit(
                                    handleUpdateProfileSubmit
                                )}
                            >
                                <FormGroup>
                                    <AvatarContainer className="mb-5">
                                        <label htmlFor="avatar">
                                            {user?.credentials.avatar_url ===
                                            undefined ? (
                                                <div className="d-flex justify-content-center">
                                                    <SkeletonWrapper hasBorder>
                                                        <Skeleton
                                                            circle={true}
                                                            height={175}
                                                            width={175}
                                                            style={{
                                                                marginBottom:
                                                                    '15px',
                                                            }}
                                                        />
                                                    </SkeletonWrapper>
                                                </div>
                                            ) : (
                                                <img
                                                    src={
                                                        user?.credentials
                                                            .avatar_url
                                                    }
                                                    alt={user?.credentials.name}
                                                />
                                            )}

                                            {t('account:updatePic')}
                                            <input
                                                type="file"
                                                id="avatar"
                                                accept="image/png, image/jpeg"
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    </AvatarContainer>
                                </FormGroup>

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
                                                'account:inputNamePlaceholder'
                                            )}
                                            autoComplete="name"
                                            ref={register({
                                                required: t(
                                                    'common:validation.nameRequired'
                                                ),
                                            })}
                                        />
                                        <div className="input-icons">
                                            {errors.name && (
                                                <InputError
                                                    title={errors.name?.message}
                                                >
                                                    <IssueOpenedIcon
                                                        size={24}
                                                    />
                                                </InputError>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormGroup>

                                {facebookUser ? (
                                    ''
                                ) : (
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
                                                    'account:inputEmailPlaceholder'
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
                                )}

                                <FormGroup>
                                    <FormControl icon={MentionIcon}>
                                        <input
                                            className={
                                                errors.username
                                                    ? 'form-control has-error'
                                                    : 'form-control'
                                            }
                                            placeholder="Username"
                                            name="username"
                                            ref={register({
                                                required: t(
                                                    'common:validation.usernameRequired'
                                                ),
                                                pattern: {
                                                    value: /^[A-Za-z0-9_-]*$/,
                                                    message: t(
                                                        'common:validation.usernameValid'
                                                    ),
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: t(
                                                        'common:validation.usernameMinDigits'
                                                    ),
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: t(
                                                        'common:validation.usernameMaxDigits'
                                                    ),
                                                },
                                                validate: (value) => {
                                                    if (validUsername) {
                                                        return true;
                                                    }
                                                    return t(
                                                        'common:validation.usernameAlreadyExists'
                                                    );
                                                },
                                            })}
                                            onChange={(e) =>
                                                handleUsernameChange(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleUsernameChange(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                        {usernameLoading && (
                                            <div className="username-loading">
                                                <Lottie
                                                    loop
                                                    animationData={
                                                        loadingAnimationColor
                                                    }
                                                    play
                                                    style={{
                                                        width: 26,
                                                        height: 26,
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="input-icons">
                                            {errors.username && (
                                                <InputError
                                                    title={
                                                        errors.username?.message
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
                                    <FormControl icon={StarIcon}>
                                        <Controller
                                            name="nationality"
                                            as={
                                                <Select
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    placeholder={t(
                                                        'account:nationality'
                                                    )}
                                                />
                                            }
                                            options={nationalityOptions}
                                            control={control}
                                            defaultValue={false}
                                        />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup>
                                    <FormControl icon={CommentIcon}>
                                        <input
                                            className={
                                                errors.bio
                                                    ? 'form-control has-error'
                                                    : 'form-control'
                                            }
                                            placeholder="Bio"
                                            name="bio"
                                            ref={register({
                                                minLength: {
                                                    value: 3,
                                                    message: t(
                                                        'common:validation.bioMinDigits'
                                                    ),
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: t(
                                                        'common:validation.bioMaxDigits'
                                                    ),
                                                },
                                            })}
                                        />
                                        <div className="input-icons">
                                            {errors.bio && (
                                                <InputError
                                                    title={errors.bio?.message}
                                                >
                                                    <IssueOpenedIcon
                                                        size={24}
                                                    />
                                                </InputError>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-5">
                                    <FormControl icon={LinkIcon}>
                                        <input
                                            className={
                                                errors.website
                                                    ? 'form-control has-error'
                                                    : 'form-control'
                                            }
                                            placeholder="Website"
                                            name="website"
                                            type="url"
                                            ref={register}
                                        />
                                        <div className="input-icons">
                                            {errors.website && (
                                                <InputError
                                                    title={
                                                        errors.website?.message
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

                                {facebookUser ? (
                                    ''
                                ) : (
                                    <>
                                        <FormGroup>
                                            <FormControl icon={LockIcon}>
                                                <input
                                                    className={
                                                        errors.old_password
                                                            ? 'form-control has-error'
                                                            : 'form-control'
                                                    }
                                                    name="old_password"
                                                    placeholder={t(
                                                        'account:oldPassword'
                                                    )}
                                                    type={
                                                        passwordShown
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    ref={register}
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
                                                    {errors.old_password && (
                                                        <InputError
                                                            title={
                                                                errors
                                                                    .old_password
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
                                            <FormControl icon={LockIcon}>
                                                <input
                                                    className={
                                                        errors.password
                                                            ? 'form-control has-error'
                                                            : 'form-control'
                                                    }
                                                    name="password"
                                                    placeholder={t(
                                                        'account:password'
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
                                                        validate: (value) => {
                                                            if (
                                                                value === '' &&
                                                                oldPasswordField
                                                            ) {
                                                                if (
                                                                    value ===
                                                                    getValues()[
                                                                        'old_password'
                                                                    ]
                                                                ) {
                                                                    return t(
                                                                        'common:validation.chooseDifferentPassword'
                                                                    );
                                                                } else {
                                                                    return t(
                                                                        'common:validation.passwordRequired'
                                                                    );
                                                                }
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
                                                                errors.password
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

                                        <FormGroup className="mb-5">
                                            <FormControl icon={LockIcon}>
                                                <input
                                                    className={
                                                        errors.password_confirmation
                                                            ? 'form-control has-error'
                                                            : 'form-control'
                                                    }
                                                    name="password_confirmation"
                                                    placeholder={t(
                                                        'account:confirmPassword'
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
                                                                getValues()[
                                                                    'password'
                                                                ]
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
                                                            <EyeClosedIcon
                                                                size={24}
                                                            />
                                                        ) : (
                                                            <EyeIcon
                                                                size={24}
                                                            />
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
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className={
                                        updateLoading
                                            ? 'btn btn-primary btn-update-profile is-loading'
                                            : 'btn btn-primary btn-update-profile'
                                    }
                                    disabled={updateLoading ? true : false}
                                >
                                    {updateLoading && (
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
                                    {t('account:buttonUpdateProfile')}
                                </button>
                            </form>
                        )}

                        <hr />

                        <div className="text-center">
                            <DeleteAccount onClick={toggleModal}>
                                {t('account:deleteAccountButton')}
                            </DeleteAccount>
                        </div>
                    </FormWrapper>
                </Container>

                <Tapbar />

                <StyledModal
                    isOpen={isModalOpen}
                    onBackgroundClick={toggleModal}
                    onEscapeKeydown={toggleModal}
                >
                    <div className="confirmation">
                        <p>{t('account:deleteAccountTitle')}</p>
                        <span>{t('account:deleteAccountText')}</span>
                        <button
                            className="btn btn-delete"
                            onClick={handleDeleteAccount}
                        >
                            <Lottie
                                loop={false}
                                animationData={deleteAccountAnimation}
                                play={play}
                                goTo={goTo}
                                style={{
                                    width: 400,
                                    height: 300,
                                }}
                            />
                            {t('account:deleteAccountYes')}
                        </button>
                        <button
                            onClick={toggleModal}
                            className="btn btn-link btn-block"
                        >
                            {t('account:deleteAccountNo')}
                        </button>
                    </div>
                </StyledModal>

                <StyledModal
                    isOpen={isCropModalOpen}
                    onBackgroundClick={toggleCropModal}
                    onEscapeKeydown={toggleCropModal}
                >
                    <ModalCrop>
                        <p>{t('account:cropImageModalText')}</p>
                        <Cropper
                            style={{ height: 300, width: '100%' }}
                            src={imageCrop}
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
                                className={
                                    profilePicLoading
                                        ? 'btn btn-crop btn-block is-loading'
                                        : 'btn btn-crop btn-block'
                                }
                                onClick={updateAvatar}
                                disabled={profilePicLoading ? true : false}
                            >
                                {profilePicLoading && (
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
                                {t('account:cropImageModalButton')}
                            </button>
                        </div>
                    </ModalCrop>
                </StyledModal>
            </Layout>
        </>
    );
};

export default Account;
