import styled from 'styled-components';

export const Wrapper = styled.section`
    max-width: 720px;
    margin: 0 auto;
`;

export const Toggles = styled.div`
    p {
        color: var(--theme-three);
        font-size: 14px;
        margin-bottom: 0.5rem;
    }

    .react-switch-bg {
        background: var(--theme-five) !important;
    }

    .react-switch-handle {
        background: var(--theme-six) !important;
    }

    .react-switch-bg > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        svg,
        span {
            color: var(--theme-three);
        }

        span {
            font-size: 14px;
        }

        &:nth-child(1) {
            span {
                padding-left: 10px;
            }
        }

        &:nth-child(2) {
            span {
                padding-right: 10px;
            }
        }
    }

    .form-group {
        margin-bottom: 2rem;
        text-align: center;
    }

    @media (min-width: 768px) {
        margin-bottom: 1.5rem;
    }

    @media (min-width: 960px) {
        margin-bottom: 3rem;
    }
`;

export const SettingsMenu = styled.nav`
    max-width: 960px;
    margin: 0 -15px;

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        list-style: none;
        font-size: 18px;
    }

    a {
        color: var(--theme-three) !important;
        cursor: pointer;
        display: block;
        padding: 1.25rem 30px;
        transition: all 0.1s linear;

        svg {
            margin-right: 15px;
        }
    }

    @media (min-width: 768px) {
        margin: 0 auto;

        ul {
            display: flex;
            flex-wrap: wrap;
        }

        li {
            padding-right: 1rem;
            margin-bottom: 1rem;
            flex: 50%;

            &:nth-child(2n) {
                padding-right: 0;
            }
        }

        a {
            background: var(--theme-five);
            border-radius: 5px;
            color: var(--theme-three) !important;

            &:hover {
                background: var(--theme-five-hover);
                text-decoration: none;
            }
        }
    }

    @media (max-width: 767px) {
        li {
            &:not(:last-child) {
                border-bottom: 1px solid var(--theme-five);
            }
        }
    }
`;
