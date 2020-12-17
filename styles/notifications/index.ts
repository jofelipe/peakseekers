import styled from 'styled-components';

export const Wrapper = styled.section`
    max-width: 720px;
    margin: 0 auto;
`;

export const NotificationsList = styled.div`
    @media (min-width: 960px) {
        margin-bottom: 2rem;
    }
`;

export const Notification = styled.div`
    color: var(--theme-two);
    border-bottom: 1px solid var(--theme-five);
    display: flex;
    align-items: center;
    padding: 20px;

    img {
        border-radius: 50%;
        border: 5px solid var(--theme-six);
        box-shadow: 0px 0px 0px 1px var(--theme-five);
        width: 50px;
        height: 50px;
    }

    p {
        font-size: 16px;
        margin: 0 0 0 15px;

        a {
            color: var(--theme-two);
            font-weight: 700;
        }
    }

    time {
        color: var(--theme-four);
        font-size: 14px;
        font-weight: 300;
        flex: 1;
        margin-left: auto;
        text-align: right;
        padding-left: 15px;
        white-space: nowrap;
    }
`;

export const NoNotifications = styled.div`
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
