import styled, { css } from 'styled-components';

const transition = css`
    transition: all 0.1s linear;
`;

export const FooterElement = styled.footer`
    border-top: 1px solid var(--theme-five);
    padding: 1.5rem 0;

    .footer-logo {
        width: 140px;
        height: 28px;
        display: block;
        margin: 0 auto 1.5rem;
    }

    .peakseekers-mail {
        color: var(--theme-three);
        font-weight: 700;
        display: block;
        text-align: center;
        margin-bottom: 1.5rem;
        ${transition}

        &:hover {
            color: var(--theme-two);
            text-decoration: none;
        }
    }

    .instagram-link {
        width: 24px;
        height: 24px;
        display: block;
        margin: 0 auto;

        svg path {
            ${transition}
        }

        &:hover {
            svg path {
                fill: var(--theme-two);
            }
        }
    }

    @media (min-width: 960px) {
        padding: 3rem 0;

        .footer-logo {
            margin: 0;
        }

        .peakseekers-mail {
            float: left;
            margin-bottom: 0;
        }

        .instagram-link {
            float: right;
            margin-bottom: 0;
        }
    }
`;

export const FooterMenu = styled.nav`
    margin-bottom: 1.5rem;

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        list-style: none;
        text-align: center;
        font-size: 14px;
    }

    li:not(:last-child) {
        margin-bottom: 0.75rem;
    }

    a {
        color: var(--theme-three);
        ${transition}

        &:hover {
            text-decoration: none;
            color: var(--theme-two);
        }
    }

    @media (min-width: 960px) {
        margin-bottom: 0;

        ul {
            display: flex;
            justify-content: center;
        }

        li {
            font-size: 16px;
        }

        li:not(:last-child) {
            margin-bottom: 0;
            margin-right: 2rem;
        }
    }

    @media (min-width: 1440px) {
        li:not(:last-child) {
            margin-right: 3rem;
        }
    }
`;
