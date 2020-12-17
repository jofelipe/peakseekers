import styled, { css } from 'styled-components';

const IconHover = css`
    transition: all 0.1s linear;

    &:hover,
    &.active {
        color: var(--theme-two);
    }
`;

const TapbarButton = css`
    position: absolute;
    left: 0;

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const TapbarWrapper = styled.footer`
    background: var(--theme-six);
    border-top: 1px solid var(--theme-five);
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        background: var(--theme-five);
        border-top: 0;
        border-right: 1px solid var(--theme-five);
        left: 0;
        top: 0;
        height: 100%;
        width: auto;
    }
`;

export const TapbarContainer = styled.div`
    width: 100%;

    ul {
        margin: 0;
        padding: 0;
        display: flex;
    }

    li {
        flex: 20%;
        list-style: none;
    }

    a {
        color: var(--theme-three);
        display: block;
        text-align: center;
        padding: 15px 0;

        &.active {
            color: var(--theme-two);
        }
    }

    .bullet-wrapper {
        position: relative;
        width: 24px;
        height: 24px;
        margin: 0 auto;

        span {
            background: var(--theme-error);
            width: 10px;
            height: 10px;
            display: block;
            border-radius: 50%;
            position: absolute;
            top: -3px;
            right: 1px;
        }
    }

    svg {
        width: 24px;
        height: 24px;
    }

    @media (min-width: 768px) {
        ul {
            display: inline;
        }

        a {
            ${IconHover}
            color: var(--theme-three);
            padding: 21px 30px;
        }
    }
`;

export const BackButton = styled.div`
    ${TapbarButton}
    top: 0;

    button {
        background: none;
        border: 0;
        color: var(--theme-three);
        padding: 21px 30px;
        ${IconHover}
    }
`;

export const SettingsLink = styled.div`
    ${TapbarButton}
    bottom: 0;

    a {
        color: var(--theme-three);
        display: block;
        padding: 21px 30px;
        ${IconHover}
    }
`;
