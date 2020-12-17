import React, { useState, useEffect, useRef } from 'react';
import Link from 'next-translate/Link';
import Router from 'next-translate/Router';
import AutoSuggest from 'react-autosuggest';
import useTranslation from 'next-translate/useTranslation';
import api from '../services/api';

import { useAuth } from '../hooks/auth';
import { NextSeo } from 'next-seo';
import { searchClient } from '../config/algolia';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import {
    SearchIcon,
    StarIcon,
    GlobeIcon,
    MilestoneIcon,
    LocationIcon,
    FilterIcon,
} from '@primer/octicons-react';

import Layout from '../layouts/main';
import Autocomplete from '../components/Autocomplete';
import Tapbar from '../components/Tapbar';

interface Explorers {
    name: string;
    username: string;
    avatar_url: string;
}

import {
    Wrapper,
    ToggleSection,
    MountainsSection,
    SearchMountain,
    DiscoverMenu,
    ExplorersSection,
    SearchExplorers,
} from '../styles/discover';

const Discover = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const { t, lang } = useTranslation();

    const inputRef = useRef();

    const [showExplorers, setShowExplorers] = useState(false);
    const [explorers, setExplorers] = useState<Explorers[]>([]);
    const [explorersFetched, setExplorersFetched] = useState<Explorers[]>([]);
    const [value, setValue] = useState('');

    const explorersFormatted = explorersFetched.map((explorer) => {
        return {
            username: explorer.username,
            name: explorer.name,
            avatar_url: explorer.avatar_url,
        };
    });

    function getSuggestions(value: string) {
        const accentsMap = {
            a: 'á|à|ã|â|À|Á|Ã|Â',
            e: 'é|è|ê|É|È|Ê',
            i: 'í|ì|î|Í|Ì|Î',
            o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            c: 'ç|Ç',
            n: 'ñ|Ñ',
        };

        const formatName = (text) =>
            Object.keys(accentsMap).reduce(
                (acc, cur) =>
                    acc.replace(new RegExp(accentsMap[cur], 'g'), cur),
                text
            );

        const formattedValue = formatName(value).toLocaleUpperCase();

        return explorersFormatted.filter((explorer) =>
            formatName(explorer.name)
                .toLocaleUpperCase()
                .includes(formattedValue)
        );
    }

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            Router.pushI18n({ url: '/', options: { lang } });
        }
    }, [isAuthenticated, loading, user]);

    useEffect(() => {
        if (!loading) {
            api.get('/explorers').then((response) => {
                setExplorersFetched(response.data);
            });
        }
    }, [loading]);

    return (
        <>
            <NextSeo title={t('discover:title')} noindex={true} />

            <Layout isPrivateRoute>
                <Wrapper className={isAuthenticated ? 'space-md' : ''}>
                    <ToggleSection>
                        <li>
                            <button
                                className={!showExplorers ? 'active' : ''}
                                onClick={() => setShowExplorers(false)}
                            >
                                {t('discover:mountains')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={showExplorers ? 'active' : ''}
                                onClick={() => setShowExplorers(true)}
                            >
                                {t('discover:explorers')}
                            </button>
                        </li>
                    </ToggleSection>

                    {!showExplorers && (
                        <MountainsSection className="text-center">
                            <SearchMountain>
                                <SearchIcon size={24} />
                                <InstantSearch
                                    indexName="mountains"
                                    searchClient={searchClient}
                                >
                                    <div className="mountain-autocomplete">
                                        <Configure hitsPerPage={10} />
                                        <Autocomplete
                                            useFeet={user?.credentials.use_feet}
                                            onSuggestionSelected={(
                                                _,
                                                { suggestion }
                                            ) => {
                                                Router.pushI18n({
                                                    url: `/mountains/${suggestion.slug}`,
                                                    options: { lang },
                                                });
                                            }}
                                            autoFocus
                                            onSuggestionCleared={() => {}}
                                        />
                                    </div>
                                </InstantSearch>
                            </SearchMountain>

                            {/* <h1>{t('discover:discoverNextSummit')}</h1>

                            <DiscoverMenu>
                                <ul>
                                    <li className="block">
                                        <Link href="/" lang={lang}>
                                            <a className="top">
                                                <StarIcon size={48} />{' '}
                                                <span>Top Bucketlist</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" lang={lang}>
                                            <a>
                                                <GlobeIcon size={48} />{' '}
                                                <span>
                                                    {t(
                                                        'discover:listByContinent'
                                                    )}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" lang={lang}>
                                            <a>
                                                <MilestoneIcon size={48} />{' '}
                                                <span>
                                                    {t('discover:listByRange')}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" lang={lang}>
                                            <a>
                                                <LocationIcon size={48} />{' '}
                                                <span>
                                                    {t(
                                                        'discover:listByCountry'
                                                    )}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" lang={lang}>
                                            <a>
                                                <FilterIcon size={48} />{' '}
                                                <span>
                                                    {t(
                                                        'discover:alphabeticalList'
                                                    )}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </DiscoverMenu> */}
                        </MountainsSection>
                    )}

                    {showExplorers && (
                        <ExplorersSection>
                            <SearchExplorers>
                                <SearchIcon size={24} />
                                <AutoSuggest
                                    suggestions={explorers}
                                    onSuggestionsClearRequested={() =>
                                        setExplorers([])
                                    }
                                    onSuggestionsFetchRequested={({
                                        value,
                                    }) => {
                                        setValue(value);
                                        setExplorers(getSuggestions(value));
                                    }}
                                    onSuggestionSelected={(
                                        _,
                                        { suggestion }
                                    ) => {
                                        Router.pushI18n({
                                            url: `/${suggestion.username}`,
                                            options: { lang },
                                        });
                                    }}
                                    getSuggestionValue={(suggestion) =>
                                        suggestion.name
                                    }
                                    renderSuggestion={(suggestion) => (
                                        <>
                                            <img
                                                className="user-avatar"
                                                src={suggestion.avatar_url}
                                                alt={suggestion.name}
                                            />
                                            <span>{suggestion.name}</span>
                                        </>
                                    )}
                                    inputProps={{
                                        placeholder: t(
                                            'discover:searchExplorer'
                                        ),
                                        value: value,
                                        onChange: (_, { newValue, method }) => {
                                            setValue(newValue);
                                        },
                                        autoFocus: true,
                                    }}
                                    highlightFirstSuggestion={true}
                                />
                            </SearchExplorers>
                        </ExplorersSection>
                    )}
                </Wrapper>

                <Tapbar activePage="discover" />
            </Layout>
        </>
    );
};

export default Discover;
