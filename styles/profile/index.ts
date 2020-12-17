import styled from 'styled-components';

export const Wrapper = styled.section`
    &.user-authenticated {
        margin-bottom: 57px;
    }

    @media (min-width: 1140px) and (max-width: 1366px) {
        &.user-authenticated {
            padding-left: 90px;
        }
    }
`;

export const Sticky = styled.div`
    @media (min-width: 767px) {
        position: sticky;
        top: 0;
        padding: 2rem 0;
    }

    @media (min-width: 960px) {
        margin-top: -2rem;
    }
`;

export const ProfileHeader = styled.header`
    display: flex;
    align-items: center;
    padding: 0.5rem 5px;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        flex-direction: column;
        padding-top: 0;
    }
`;

export const ProfileAvatar = styled.div`
    min-width: 100px;

    img {
        border-radius: 50%;
        border: 5px solid var(--theme-six);
        box-shadow: 0px 0px 0px 1px var(--theme-five);
        width: 100px;
        height: 100px;
    }

    @media (min-width: 768px) {
        flex: 1;
        margin-bottom: 1.5rem;
    }
`;

export const ProfileInfo = styled.div`
    padding-left: 20px;

    h1 {
        color: var(--theme-two);
        font-size: 22px;
        line-height: 28px;
        font-weight: 700;
        margin-bottom: 0.5rem;

        span {
            margin-right: 10px;
        }

        img {
            font-size: 22px !important;
            position: relative;
            top: -2px;
        }
    }

    p {
        color: var(--theme-three);
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 0.5rem;
    }

    a {
        color: var(--theme-four);
    }

    @media (min-width: 768px) {
        text-align: center;
        padding-left: 0;
    }
`;

export const EditProfile = styled.div`
    padding: 0 5px;

    .btn-edit-profile {
        background: none;
        border: 1px solid var(--theme-three);
        color: var(--theme-three);
        margin-bottom: 1.5rem;

        &:hover {
            background: var(--theme-four);
            border-color: var(--theme-four);
            color: var(--theme-one);
        }
    }
`;

export const ProfileStats = styled.div`
    display: flex;
    margin-bottom: 1.5rem;

    button {
        background: none;
        border: 0;
        color: var(--theme-three);
        padding: 0;
    }

    .counter {
        color: var(--theme-three);
        flex: 33.3%;
    }

    strong {
        font-size: 22px;
        font-weight: 700;
    }

    p {
        font-size: 14px;
        line-height: 14px;
        margin: 0;
    }

    @media (min-width: 768px) {
        margin-bottom: 2rem;

        p {
            font-size: 12px;
        }
    }
`;

export const ProfileMap = styled.section`
    border-top: 1px solid var(--theme-five);
    height: 25vh;
    margin: 0 -15px;
    overflow: hidden;

    .alignment {
        width: 100%;
        height: 100%;
    }

    .gmnoprint, a[href*="https://maps.google.com/maps?ll"] div img
    {
        display: none;
    }

    @media (min-width: 768px) {
        border-top: 0;
        margin: 0;
    }

    @media (min-width: 960px) {
        height: 300px;
    }
`;

export const LayoutSelector = styled.div`
    background: var(--theme-six);
    border-top: 1px solid var(--theme-five);
    border-bottom: 1px solid var(--theme-five);
    margin: 0 -15px;
    display: flex;
    position: sticky;
    top: 0;
    overflow: hidden;

    button {
        background: none;
        border: 0;
        padding: 10px 0;
        flex: 50%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        float: left;

        svg rect {
            fill: var(--theme-five);
        }

        svg path {
            stroke: var(--theme-five);
        }

        &.active svg rect {
            fill: var(--theme-two);
        }

        &.active svg path {
            stroke: var(--theme-two);
        }
    }
`;

export const Stories = styled.section`
    margin: 0 -15px;
    overflow: hidden;

    &.grid-layout {
        article {
            float: left;
            width: 33.3%;
        }
    }

    @media (min-width: 768px) {
        margin: 1.5rem -15px 0;
        display: flex;
        align-items: left;
        justify-content: left;
        flex-direction: row;
        flex-wrap: wrap;
        flex-flow: row wrap;
        align-content: flex-end;
    }

    @media (min-width: 960px) {
        max-width: 720px;
        margin: 0 auto;
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

            img {
                font-size: 16px !important;
            }

            span {
                margin-left: 10px;
            }
        }
    }

    @media (min-width: 768px) {
        display: inline-block;
        width: 50%;
        padding: 0 15px;
        margin-bottom: 2rem;

        a {
            display: block;
        }

        .story-info {
            padding: 15px 0;

            h2 {
                font-size: 20px;
                line-height: 28px;
            }
        }
    }
`;

export const Bucketlist = styled.ul`
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

        span {
            margin-left: 15px;
        }

        &:hover {
            text-decoration: none;
        }
    }
`;

export const NoStories = styled.div`
    width: 100%;
    max-width: 420px;
    text-align: center;
    margin: 0 auto;
    padding: 30px 30px 0;
    margin-bottom: 3rem;

    svg {
        margin-bottom: 2rem;
    }

    h5 {
        color: var(--theme-two);
        font-size: 22px;
        font-weight: 700;
    }

    p {
        color: var(--theme-three);
        margin-bottom: 0;
    }
`;
