import styled, { css } from 'styled-components';

interface MainProps {
    isPrivateRoute?: boolean;
}

interface HeaderProps {
    isFixed?: boolean;
}

const HeaderButton = css`
    color: var(--theme-three);
`;

export const Header = styled.header<HeaderProps>`
    padding: 15px 0;
    border-bottom: 1px solid var(--theme-five);
    margin-bottom: 1rem;
    position: relative;

    ${(props) =>
        props.isFixed &&
        css`
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
        `}

    .logo {
        width: 132px;
        height: 28px;
        display: block;
        margin: 0 auto;
        text-indent: -9999px;
    }

    &.user-authenticated {
        .logo {
            display: none;
        }

        .container {
            display: flex;
            justify-content: space-between;
        }
    }

    @media (min-width: 960px) {
        padding: 15px 0;
        margin-bottom: 3rem;

        .logo {
            width: 188px;
            height: 37px;
        }
    }

    @media (max-width: 960px) and (min-width: 720px) {
        &.user-authenticated {
            .logo {
                position: relative;
                left: 40px;
            }
        }
    }

    @media (min-width: 768px) {
        &.user-authenticated {
            .logo {
                display: block;
            }

            .container {
                padding: 0;
            }
        }
    }
`;

export const BackButton = styled.div`
    button {
        background: none;
        border: 0;
        ${HeaderButton}
    }
`;

export const SettingsLink = styled.div`
    a {
        ${HeaderButton}
    }
`;

export const MainWrapper = styled.main<MainProps>`
    ${(props) =>
        props.isPrivateRoute &&
        css`
            padding: 15px 0 87px;
        `}

    @media (max-width: 960px) and (min-width: 720px) {
        ${(props) =>
            props.isPrivateRoute &&
            css`
                padding-left: 100px;
                padding-right: 15px;
            `}
    }

    @media (min-width: 960px) {
        ${(props) =>
            props.isPrivateRoute &&
            css`
                padding: 0 0 60px;
            `}
    }
`;

export const ErrorWrapper = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 3rem 30px;
    text-align: center;

    svg {
        margin-bottom: 2rem;
    }

    h1 {
        color: var(--theme-two);
        font-size: 26px;
        font-weight: 700;
    }

    p {
        color: var(--theme-three);
        font-size: 16px;
        line-height: 26px;
        margin-bottom: 2rem;
    }

    button {
        background: var(--theme-button);
        border: 0;
        border-radius: 5px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        border-color: var(--theme-button);
        padding: 11px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        transition: all 0.1s linear;

        &:hover,
        &:active {
            background: var(--theme-button-hover) !important;
            border-color: var(--theme-button-hover) !important;
        }
    }

    @media (min-width: 768px) {
        padding: 2rem 0;
    }
`;

export const LGPD = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    text-align: center;

    .alert {
        background: var(--theme-four);
        color: var(--theme-one);
        border-color: transparent;
    }

    button {
        background: var(--theme-five);
        border: 0;
        color: var(--theme-two);
        border-radius: 5px;
        padding: 10px;
        width: 100%;
    }

    a {
        color: var(--theme-one);
        text-decoration: underline;
    }

    @media (min-width: 768px) {
        text-align: left;

        .alert {
            display: flex;
            align-items: center;
        }

        p {
            margin-bottom: 0;

            br {
                display: none;
            }
        }

        button {
            padding: 5px 10px;
            width: auto;
            margin-left: auto;
        }
    }
`;
