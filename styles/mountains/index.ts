import styled from 'styled-components';

export const Wrapper = styled.section`
    color: var(--theme-two);
    max-width: 720px;
    margin: 0 auto;
    padding: 0 20px;

    @media (min-width: 768px) and (max-width: 960px) {
        &.space-md {
            padding-left: 105px;
        }
    }

    .space-user-authenticated {
        margin-bottom: 3.5rem;
    }
`;

export const MountainTitle = styled.header`
    position: relative;
    padding: 10px 0 30px;

    h1 {
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        margin-bottom: 0;
        padding-right: 20px;
    }

    p {
        color: var(--theme-two);
        font-size: 14px;
        font-weight: 300;
        display: flex;
        align-items: center;
        margin-bottom: 0;

        svg {
            color: var(--theme-three);
            margin-right: 7px;
        }
    }

    @media (min-width: 960px) {
        margin-bottom: 1rem;

        h1 {
            font-size: 38px;
            line-height: 48px;
        }
    }
`;

export const MountainMap = styled.div`
    margin: 0 -20px;
    height: 40vh;

    .gmnoprint, a[href*="https://maps.google.com/maps?ll"] div img
    {
        display: none;
    }

    @media (min-width: 768px) {
        margin: 0;
        max-height: 300px;
    }
`;

export const MountainInfo = styled.div`
    display: flex;
    border-bottom: 1px solid var(--theme-five);
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px 20px 20px;
    margin: 0 -20px;

    .elevation {
        p {
            font-size: 16px;
            margin-bottom: 0;
        }

        svg {
            margin-right: 10px;
        }

        strong {
            font-size: 22px;
        }
    }

    .add-bucketlist {
        margin: -20px 0 0 15px;

        button {
            > div {
                margin: 0 auto -10px;
            }

            border: 0;
            background: none;
            color: var(--theme-gold);
            max-width: 100px;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 600;
            line-height: 18px;
        }
    }

    @media (min-width: 768px) {
        padding: 15px 0;
        margin: 0;
    }
`;

export const MountainText = styled.article`
    border-bottom: 1px solid var(--theme-five);
    margin: 0 -20px;
    padding: 20px;

    p {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 1rem;
    }

    .btn-google-maps {
        color: var(--theme-two);
        display: inline-flex;
        align-items: center;
        padding: 0;

        i {
            background: url(/static/assets/svg/google-maps.svg);
            width: 17px;
            height: 17px;
            margin-right: 10px;
        }

        &:hover {
            color: var(--theme-one);
        }
    }

    @media (min-width: 768px) {
        padding: 30px 0;
        margin: 0;
    }

    @media (min-width: 960px) {
        padding: 60px 0;

        p {
            margin-bottom: 2rem;
        }
    }
`;

export const StoryContainer = styled.section`
    margin: 0 -20px;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;

        h2 {
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }
    }

    .all-stories button {
        background: none;
        border: 0;
        color: var(--theme-two);
        line-height: 22px;
        padding: 0;

        strong {
            display: block;
            font-size: 20px;
        }
    }

    @media (min-width: 768px) {
        margin: 0;

        header {
            padding: 30px 0;
        }
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
        }

        p {
            color: var(--theme-three);
            font-size: 14px;
            font-weight: 300;
            display: flex;
            align-items: center;
            margin-bottom: 0;
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
            padding: 25px 0 30px;
        }
    }
`;

export const MountainSource = styled.footer`
    border-top: 1px solid var(--theme-five);
    margin: 0 -20px;
    padding: 20px;

    p {
        color: var(--theme-three);
        font-size: 14px;
        line-height: 22px;
    }

    a {
        color: var(--theme-three);
        font-weight: 700;
    }

    .btn-report-error {
        background: none;
        border: 1px solid var(--theme-three);
        color: var(--theme-three);
        margin-bottom: 1.5rem;
        font-weight: 400;

        &:hover {
            background: var(--theme-four);
            border-color: var(--theme-four);
            color: var(--theme-one);
        }
    }

    @media (min-width: 768px) {
        padding: 30px 0;
        margin: 0;
        text-align: center;

        a {
            max-width: 300px;
            margin: 0 auto;
        }
    }
`;

export const MountainStories = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;

    li {
        list-style: none;
        font-size: 18px;
        font-weight: 700;

        &:not(:last-child) {
            border-bottom: 1px solid var(--theme-modal-border);
        }
    }

    a {
        color: var(--theme-two);
        display: flex;
        align-items: center;
        padding: 15px 20px;

        img {
            border-radius: 50%;
            border: 5px solid var(--theme-five);
            box-shadow: 0px 0px 0px 1px var(--theme-four);
            width: 50px;
            height: 50px;
            margin-right: 15px;
        }

        &:hover {
            text-decoration: none;
        }
    }
`;
