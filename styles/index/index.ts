import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../../components/Tooltip';

const titleHome = css`
    font-size: 24px;
    color: var(--theme-one);
    font-weight: 700;

    span {
        display: block;
        font-weight: 400;
        font-size: 16px;
        color: var(--theme-three);
    }

    @media (min-width: 960px) {
        font-size: 48px;

        span {
            font-size: 24px;
        }
    }
`;

const transition = css`
    transition: all 0.1s linear;
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

export const HomeContainer = styled.section`
    .text-home {
        overflow: hidden;
    }

    h1 {
        color: var(--theme-one);
        font-size: 36px;
        line-height: 46px;
        font-weight: 700;
        position: relative;
        z-index: 10;
    }

    p {
        font-size: 16px;
        line-height: 26px;
        color: var(--theme-three);
    }

    @media (min-width: 340px) {
        h1 {
            font-size: 42px;
            line-height: 50px;
        }
    }

    @media (min-width: 720px) {
        .text-home {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .text-home > div:nth-child(1) {
            order: 2;
        }

        .text-home > div:nth-child(2) {
            order: 1;
        }

        > .row {
            display: flex;
            align-items: center;
        }
    }

    @media (min-width: 960px) {
        h1 {
            font-size: 66px;
            line-height: 76px;
            max-width: 500px;
        }

        p {
            font-size: 18px;
            line-height: 28px;
        }
    }
`;

export const MountainsContainer = styled.div`
    position: relative;
`;

export const MountainsWrapper = styled.div`
    height: 156px;
    width: 342px;
    position: absolute;
    top: 0;
    left: -70px;

    @media (min-width: 720px) {
        width: 242px;
        height: 110px;
        position: static;
    }
`;

export const FormContainer = styled.div`
    text-align: center;

    p {
        font-size: 16px;
        color: var(--theme-four);
    }

    .forgot-password {
        display: flex;
        float: left;
        margin-bottom: 1rem;
        color: var(--theme-three);
        cursor: pointer;
    }

    .btn-facebook {
        background: #4267b2;
        color: #fff;
        font-size: 18px;
        padding: 11px 0;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        i {
            background: url(/static/assets/svg/facebook-logo.svg) no-repeat;
            width: 11px;
            height: 21px;
            display: block;
            margin-right: 15px;
        }

        > div {
            margin: 0 15px 0 0 !important;
        }

        &.is-loading {
            cursor: default;
            opacity: 0.5;
        }

        &:hover {
            background: ${shade(0.2, '#4267b2')};
        }
    }

    .btn-start {
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

    .btn-light {
        background: none;
        border: 0;
        color: var(--theme-two);
        text-decoration: underline;

        &:hover,
        &:active {
            background: none !important;
            color: var(--theme-one);
        }
    }

    @media (min-width: 960px) {
        .btn-facebook,
        .btn-start {
            padding: 15px 0;
        }

        .btn-light {
            margin-bottom: 0;
        }
    }
`;

export const FocusedStories = styled.section`
    margin-bottom: 3rem;

    h2 {
        ${titleHome}
        margin-bottom: 3rem;
    }

    @media (min-width: 960px) {
        margin-bottom: 5rem;

        h2 {
            margin-bottom: 6rem;
        }
    }
`;

export const FocusedStoriesFeature = styled.div`
    text-align: center;

    &:not(:last-child) {
        margin-bottom: 2rem;
    }

    h3 {
        color: var(--theme-two);
        font-size: 18px;
        font-weight: 700;

        svg {
            margin-right: 10px;
        }
    }

    p {
        font-size: 14px;
        color: var(--theme-three);
        line-height: 24px;
        margin-bottom: 0;
    }

    @media (min-width: 960px) {
        text-align: left;
        padding-left: 30px;

        h3 {
            font-size: 24px;

            svg {
                position: relative;
                top: -3px;
            }
        }

        p {
            font-size: 16px;
        }
    }
`;

export const FocusedStoriesMountainsNumber = styled.ul`
    margin: 2rem 0 0;
    padding: 0;
    display: flex;
    justify-content: center;

    li {
        font-size: 14px;
        color: var(--theme-three);
        list-style: none;

        img {
            display: block !important;
            margin: 0 auto 5px;
        }
    }

    li:not(:last-child) {
        margin-right: 2rem;
    }

    @media (min-width: 960px) {
        justify-content: start;

        li {
            font-size: 16px;

            img {
                display: inline !important;
                margin: -2px 5px 0 0;
                width: 24px !important;
                height: 18px !important;
            }
        }

        li:not(:last-child) {
            margin-right: 3rem;
        }
    }
`;

export const Application = styled.section`
    margin-bottom: 2rem;

    h4 {
        ${titleHome}
        margin-bottom: 1.5rem;
    }

    p {
        color: var(--theme-three);
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 960px) {
        margin-bottom: 6rem;

        h4 {
            margin-bottom: 3rem;
        }

        p {
            font-size: 16px;
            line-height: 26px;
            max-width: 700px;
            margin: 0 auto 3rem;
        }
    }
`;

export const ApplicationButtons = styled.ul`
    margin: 0;
    padding: 0;

    li {
        list-style: none;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    a {
        border: 2px solid var(--theme-button-app);
        border-radius: 5px;
        color: var(--theme-button-app-text) !important;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
        display: flex;
        width: 200px;
        justify-content: center;
        align-items: center;

        opacity: 0.2;

        svg {
            margin-right: 15px;
            height: 28px;
        }

        svg path {
            ${transition}
        }

        span {
            display: block;
            font-size: 12px;
            font-weight: 400;
            margin-bottom: -5px;
        }

        __&:hover {
            background: var(--theme-button-app);
            color: #fff;

            svg path {
                fill: #fff;
            }
        }
    }

    @media (min-width: 720px) {
        display: flex;
        justify-content: center;

        li:not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`;

export const Privacy = styled.section`
    border-top: 1px solid var(--theme-five);
    background: var(--theme-privacy);
    padding: 1.5rem 0;

    h5 {
        color: var(--theme-two);
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
        margin-bottom: 1.5rem;

        strong {
            display: block;
        }
    }

    p {
        color: var(--theme-three);
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 0;

        a {
            color: var(--theme-three);
            text-decoration: underline;
            ${transition}

            &:hover {
                color: var(--theme-two);
            }
        }
    }

    p:not(:last-child) {
        margin-bottom: 1.5rem;
    }

    @media (min-width: 960px) {
        padding: 3rem;

        h5 {
            font-size: 24px;
        }

        p {
            font-size: 16px;
            line-height: 26px;
        }
    }
`;

export const ResetPassword = styled.div`
    padding: 20px 15px 0;

    p {
        color: var(--theme-two);
        text-align: center;
        font-size: 14px;
        padding: 0 15px;
        margin-bottom: 1.5rem;
    }

    .form-group {
        margin: 0 15px;
    }

    input {
        border-color: var(--theme-modal-border);
        margin-bottom: 1.5rem;
    }

    .footer-modal {
        border-top: 1px solid var(--theme-modal-border);
        padding: 15px;
        margin: 0 -15px;
    }

    .btn-reset {
        border: 0;
        background: var(--theme-modal-button);
        color: #fff;
        font-weight: 700;
        padding: 7px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        > div {
            margin: 0 15px 0 0 !important;
        }

        &.is-loading {
            cursor: default;
            opacity: 0.5;
        }

        &:hover {
            background: var(--theme-modal-button-hover) !important;
        }
    }

    @media (min-width: 960px) {
        .btn-reset {
            padding: 11px 0;
        }
    }
`;
