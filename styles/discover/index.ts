import styled from 'styled-components';

export const Wrapper = styled.section`
    max-width: 720px;
    margin: 0 auto;
    padding: 0 20px;

    .space-user-authenticated {
        margin-bottom: 3.5rem;
    }
`;

export const ToggleSection = styled.ul`
    border-bottom: 1px solid var(--theme-five);
    margin: -31px -20px 0;
    padding: 0;
    display: flex;

    li {
        list-style: none;
        flex: 0 50%;
    }

    button {
        background: none;
        border: 0;
        color: var(--theme-four);
        display: block;
        padding: 15px 0;
        font-size: 14px;
        width: 100%;
        text-transform: uppercase;
        font-weight: 700;

        &.active {
            color: var(--theme-two);
        }
    }

    @media (min-width: 960px) {
        margin: -31px 0 0;
    }
`;

export const MountainsSection = styled.section`
    h1 {
        font-size: 20px;
        font-weight: 700;
        color: var(--theme-three);
        margin-bottom: 1.5rem;
    }
`;

export const SearchMountain = styled.div`
    border-bottom: 1px solid var(--theme-five);
    margin: 0 -20px 2rem;
    position: relative;

    svg {
        color: var(--theme-three);
        position: absolute;
        top: 20px;
        left: 20px;
    }

    input {
        background: none !important;
        border-radius: 0;
        border: 0;
        color: var(--theme-two);
        padding: 20px 20px 20px 52px;
        height: auto;
        width: 100%;

        &::placeholder {
            color: var(--theme-three);
        }
    }

    .mountain-autocomplete {
        .react-autosuggest__suggestions-container {
            background: var(--theme-six);
            position: absolute;
            width: 100%;
            left: 0;
            top: 55px;
            z-index: 90;

            &.react-autosuggest__suggestions-container--open {
                border-bottom: 1px solid var(--theme-five);
            }
        }

        ul {
            margin: 0;
            padding: 7px 0 7px;
        }

        li {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 7px 15px;
        }

        img {
            width: 24px !important;
        }

        p {
            color: var(--theme-three);
            margin-left: 13px;
            margin-bottom: 0;

            .ais-Highlight-highlighted {
                color: var(--theme-one);
            }
        }

        .mountain-elevation {
            color: var(--theme-four);
            font-size: 80%;
            padding-left: 15px;
            margin-left: auto;
        }
    }

    @media (min-width: 960px) {
        margin: 0 0 2rem;

        svg {
            left: 0;
        }

        input {
            padding-left: 37px;
        }

        .mountain-autocomplete {
            margin-bottom: 1px;

            li {
                &:hover {
                    background: rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                }
            }
        }
    }
`;

export const DiscoverMenu = styled.nav`
    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }

    li {
        list-style: none;
        flex: 0 50%;
        margin-bottom: 1rem;

        &:nth-child(even) {
            padding-right: 0.5rem;
        }

        &:nth-child(odd) {
            padding-left: 0.5rem;
        }

        &.block {
            flex: 0 100%;
            padding: 0;
        }
    }

    a {
        border: 2px solid var(--theme-three);
        border-radius: 5px;
        color: var(--theme-three);
        display: flex;
        height: 150px;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        padding: 0 20px;
        transition: all 0.1s linear;

        span {
            display: block;
        }

        svg {
            margin-bottom: 10px;
        }

        &:hover {
            background: var(--theme-four);
            border-color: var(--theme-four);
            color: var(--theme-one);
            text-decoration: none;
        }

        &.top {
            background: var(--theme-gold);
            border-color: var(--theme-gold);
            color: #fff;
        }
    }
`;

export const ExplorersSection = styled.section``;

export const SearchExplorers = styled.div`
    border-bottom: 1px solid var(--theme-five);
    margin: 0 -20px 2rem;
    position: relative;

    svg {
        color: var(--theme-three);
        position: absolute;
        top: 20px;
        left: 20px;
    }

    input {
        background: none !important;
        border-radius: 0;
        border: 0;
        color: var(--theme-two);
        padding: 20px 20px 20px 52px;
        height: auto;
        width: 100%;

        &::placeholder {
            color: var(--theme-three);
        }
    }

    .react-autosuggest__suggestions-container {
        background: var(--theme-six);
        position: absolute;
        width: 100%;
        left: 0;
        top: 55px;
        z-index: 90;

        &.react-autosuggest__suggestions-container--open {
            border-bottom: 1px solid var(--theme-five);
        }
    }

    ul {
        margin: 0;
        padding: 7px 0 7px;
    }

    li {
        cursor: pointer;
        color: var(--theme-two);
        display: flex;
        align-items: center;
        padding: 7px 15px;
    }

    .user-avatar {
        border-radius: 50%;
        border: 5px solid var(--theme-six);
        box-shadow: 0px 0px 0px 1px var(--theme-five);
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }

    @media (min-width: 960px) {
        margin: 0;

        svg {
            left: 0;
        }

        input {
            padding-left: 37px;
        }

        .react-autosuggest__suggestions-container {
            li {
                padding: 7px 0;

                &:hover {
                    color: var(--theme-one);
                }
            }
        }
    }
`;
