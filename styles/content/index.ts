import styled, { css } from 'styled-components';

import Tooltip from '../../components/Tooltip';

interface WrapperProps {
    maxWidth?: boolean;
}

export const Wrapper = styled.article<WrapperProps>`
    color: var(--theme-two);
    margin: 2rem 0 1.5rem;
    padding: 0 5px;

    ${(props) =>
        props.maxWidth &&
        css`
            max-width: 720px;
            margin: 2rem auto 1.5rem;
        `}

    .author-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    figure {
        margin: 0 0 2rem;
        padding: 0 30px;
    }

    figcaption {
        color: var(--theme-three);
        font-size: 14px;
        font-style: italic;
        display: flex;
        align-items: center;
        margin-top: 0.5em;

        span {
            margin-right: 10px;
        }

        img {
            font-size: 16px !important;
        }
    }

    h1 {
        font-size: 28px;
        font-weight: 700;
        line-height: 38px;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 20px;
        font-weight: 700;
        line-height: 30px;
        margin-bottom: 1rem;
    }

    h4 {
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
        margin-bottom: 1rem;
    }

    p {
        font-size: 16px;
        line-height: 26px;
        margin-bottom: 2rem;

        a {
            color: var(--theme-one);
            text-decoration: underline;
        }
    }

    ul {
        padding: 0;
        margin-bottom: 2rem;

        li {
            list-style: disc inside none;
            font-size: 16px;
            line-height: 26px;

            a {
                color: var(--theme-one);
                text-decoration: underline;
            }
        }
    }

    @media (min-width: 960px) {
        margin: 5rem 0 3.5rem;

        ${(props) =>
            props.maxWidth &&
            css`
                margin: 5rem auto 3.5rem;
            `}

        figure {
            padding-right: 2rem;
        }

        h1 {
            font-size: 36px;
            line-height: 48px;
        }

        h2 {
            font-size: 28px;
            line-height: 38px;
        }
    }
`;

export const Form = styled.div`
    margin-bottom: 3.5rem;

    .form-group {
        position: relative;
    }

    button[type='submit'] {
        background: var(--theme-button);
        width: 100%;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        border-color: var(--theme-button);
        padding: 11px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover,
        &:active {
            background: var(--theme-button-hover) !important;
            border-color: var(--theme-button-hover) !important;
        }

        > div {
            margin: 0 15px 0 0 !important;
        }

        &.is-loading {
            cursor: default;
            opacity: 0.5;
        }
    }
`;

export const InputError = styled(Tooltip)`
    svg {
        color: var(--theme-error);
        margin: 0;
    }

    span {
        background: var(--theme-error);
        color: #fff;

        &::before {
            border-color: var(--theme-error) transparent;
        }
    }
`;
