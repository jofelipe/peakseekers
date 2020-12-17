import React, { useEffect, useState } from 'react';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '../../hooks/auth';

import {
    HomeIcon,
    SearchIcon,
    PlusCircleIcon,
    BellIcon,
    PersonIcon,
    ArrowLeftIcon,
    GearIcon,
} from '@primer/octicons-react';

import {
    TapbarWrapper,
    TapbarContainer,
    BackButton,
    SettingsLink,
} from './styles';

interface TapbarProps {
    activePage?:
        | 'home'
        | 'discover'
        | 'story'
        | 'notifications'
        | 'profile'
        | 'settings';
}

const Tapbar: React.FC<TapbarProps> = (props) => {
    const { user, loading } = useAuth();
    const { lang } = useTranslation();

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!loading) {
            setNotifications(
                user?.notifications?.length > 0 &&
                    user?.notifications?.filter((item) => {
                        return item.read === false;
                    })
            );
        }
    }, [user, loading]);

    return (
        <>
            <TapbarWrapper>
                <BackButton className="d-none d-md-block">
                    <button type="button" onClick={() => Router.back()}>
                        <ArrowLeftIcon />
                    </button>
                </BackButton>
                <TapbarContainer>
                    <ul>
                        <li>
                            <Link href="/home" lang={lang}>
                                <a
                                    className={
                                        props.activePage === 'home'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <HomeIcon />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/discover" lang={lang}>
                                <a
                                    className={
                                        props.activePage === 'discover'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <SearchIcon />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/story" lang={lang}>
                                <a
                                    className={
                                        props.activePage === 'story'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <PlusCircleIcon />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notifications" lang={lang}>
                                <a
                                    className={
                                        props.activePage === 'notifications'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {props.activePage !== 'notifications' ? (
                                        <div className="bullet-wrapper">
                                            {notifications.length > 0 && (
                                                <span></span>
                                            )}
                                            <BellIcon />
                                        </div>
                                    ) : (
                                        <BellIcon />
                                    )}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${user?.credentials.username}`}
                                lang={lang}
                            >
                                <a
                                    className={
                                        props.activePage === 'profile'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <PersonIcon />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </TapbarContainer>
                <SettingsLink className="d-none d-md-block">
                    <Link href="/settings" lang={lang}>
                        <a
                            className={
                                props.activePage === 'settings' ? 'active' : ''
                            }
                        >
                            <GearIcon />
                        </a>
                    </Link>
                </SettingsLink>
            </TapbarWrapper>
        </>
    );
};

export default Tapbar;
