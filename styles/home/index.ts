import styled from 'styled-components';

export const Wrapper = styled.section`
    margin: -31px -15px 0;

    .loader {
        margin: 0 auto;
        width: 48px;
    }

    @media (min-width: 768px) {
        margin: 0;

        & > div:first-child {
            display: flex;
            flex-wrap: wrap;
        }
    }

    @media (min-width: 1140px) and (max-width: 1366px) {
        padding-left: 80px;
    }
`;

export const StoryWrapper = styled.div`
    @media (min-width: 768px) {
        flex: 0 50%;
        padding: 0 20px;
        margin-bottom: 1rem;
    }
`;

export const Story = styled.article`
    a:hover {
        text-decoration: none;
    }

    .story-image {
        width: 100%;
        text-align: center;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .story-info {
        color: var(--theme-two);
        padding: 25px 30px 30px;
        display: flex;
        align-items: center;

        .story-text {
            flex: 1;
        }

        h2 {
            font-size: 24px;
            line-height: 32px;
            font-weight: 700;
        }

        p {
            color: var(--theme-three);
            font-size: 14px;
            font-weight: 300;
            display: flex;
            align-items: center;
            margin-bottom: 0;
        }

        img {
            font-size: 16px !important;
        }

        span {
            margin-left: 10px;
        }
    }

    .story-author {
        margin-left: 15px;
        flex: 0 0 50px;

        img {
            border-radius: 50%;
            border: 5px solid var(--theme-six);
            box-shadow: 0px 0px 0px 1px var(--theme-five);
            width: 50px;
            height: 50px;
        }
    }

    @media (min-width: 768px) {
        .story-info {
            padding: 20px 0 30px;
        }
    }
`;

export const NoMoreItems = styled.div`
    width: 100%;
    max-width: 300px;
    background: var(--theme-five);
    margin: 0 auto;
    border-radius: 5px;
    text-align: center;
    padding: 10px 0;
    opacity: 0.5;

    p {
        margin-bottom: 0;
    }

    svg {
        margin-right: 10px;
    }
`;

export const Error = styled.div`
    padding: 0 30px;
    text-align: center;
    padding: 3rem 30px;

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
`;
