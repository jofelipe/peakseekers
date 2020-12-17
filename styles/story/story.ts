import styled, { css } from 'styled-components';

interface StoryMountainProps {
    isAddedToBucketlist?: boolean;
}

const storyInfo = css`
    border-top: 1px solid var(--theme-five);
    padding: 30px 20px;
    border-bottom: 1px solid var(--theme-five);
    color: var(--theme-two);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -20px;
`;

export const Wrapper = styled.section`
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

export const StoryTitle = styled.header`
    position: relative;
    padding: 10px 0 30px;

    h1 {
        color: var(--theme-two);
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        margin-bottom: 0;
        padding-right: 20px;
    }

    time {
        color: var(--theme-two);
        font-size: 14px;
        font-weight: 300;
        display: flex;
        align-items: center;
        padding-right: 20px;

        svg {
            color: var(--theme-three);
            margin-right: 7px;
        }
    }

    .btn-group {
        position: absolute;
        top: 20px;
        right: -15px;

        .btn-secondary {
            padding: 15px;
            background: none !important;
            border: 0;
        }

        .btn-secondary .fill {
            background: var(--theme-two);
            width: 4px;
            height: 4px;
            display: block;
            border-radius: 50%;

            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }

        .dropdown-menu {
            background: var(--theme-six);
            min-width: auto;
            padding: 7px 0;
            margin-top: 12px;
            border: 1px solid var(--theme-five);
            transform: translate3d(-77px, 0px, 0px) !important;

            &:before,
            &:after {
                content: '';
                display: inline-block;
                vertical-align: middle;
                width: 0;
                height: 0;
                position: absolute;
                top: 5px;
            }

            &:before {
                right: -7px;
                z-index: 2;

                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 7px solid var(--theme-six);
            }

            &:after {
                right: -8px;
                z-index: 1;

                border-top: 7px solid transparent;
                border-bottom: 7px solid transparent;
                border-left: 7px solid var(--theme-five);
            }
        }

        .dropdown-item {
            color: var(--theme-three);
            padding: 3px 15px;

            &:hover {
                background: none;
            }

            a {
                color: var(--theme-three);
                text-decoration: none;
            }
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

export const StoryImages = styled.div`
    margin: 0 -20px 1.5rem;

    .carousel-root {
        outline: none;
    }

    .carousel {
        position: relative;
        width: 100%;
    }

    .carousel img {
        width: 100%;
        display: inline-block;
        pointer-events: none;
    }

    .carousel .carousel {
        position: relative;
    }

    .carousel.carousel-slider {
        position: relative;
        margin: 0;
        overflow: hidden;
    }

    .carousel .slider-wrapper {
        overflow: hidden;
        margin: auto;
        width: 100%;
        transition: height 0.15s ease-in;
    }

    .carousel .slider-wrapper.axis-horizontal .slider {
        -ms-box-orient: horizontal;
        display: flex;
    }

    .carousel .slider-wrapper.axis-horizontal .slider .slide {
        flex-direction: column;
        flex-flow: column;
    }

    .carousel .slider-wrapper.axis-vertical {
        -ms-box-orient: horizontal;
        display: flex;
    }

    .carousel .slider-wrapper.axis-vertical .slider {
        -webkit-flex-direction: column;
        flex-direction: column;
    }

    .carousel .slider {
        margin: 0;
        padding: 0;
        position: relative;
        list-style: none;
        width: 100%;
    }

    .carousel .slider.animated {
        transition: all 0.35s ease-in-out;
    }

    .carousel .slide {
        min-width: 100%;
        margin: 0;
        position: relative;
        text-align: center;
        background: var(--theme-story-photos);
    }

    .carousel .slide > div {
        min-height: 375px;
        display: flex;
        align-items: center;
    }

    .carousel .slide img {
        width: 100%;
        vertical-align: top;
        border: 0;
        position: relative;
    }

    .carousel .control-dots {
        padding: 0;
        margin: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        left: 0;
        bottom: 0;
        padding: 20px 0;
        width: 100%;

        .dot {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            overflow: hidden;

            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    }

    .carousel .control-dots .dot.selected,
    .carousel .control-dots .dot:hover {
        background: rgba(255, 255, 255, 0.75);
    }

    .control-arrow,
    .carousel-status {
        display: none;
    }

    @media (min-width: 960px) {
        margin-bottom: 2.5rem;
    }
`;

export const StoryContent = styled.article`
    color: var(--theme-two);

    h1 {
        font-size: 22px;
        font-weight: 700;
        line-height: 32px;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
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

    blockquote {
        border-left-color: var(--theme-two);
        margin-bottom: 2rem;
        font-size: 18px;
        font-style: italic;
    }

    ol {
        padding: 0;
        margin-bottom: 2rem;

        li {
            list-style: decimal inside none;
            font-size: 16px;
            line-height: 26px;

            a {
                color: var(--theme-one);
                text-decoration: underline;
            }
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
`;

export const StoryMountain = styled.div<StoryMountainProps>`
    ${storyInfo}
    background: var(--theme-add-images);
    color: ${(props) =>
        props.isAddedToBucketlist ? 'var(--theme-gold)' : 'var(--theme-two)'};
    display: block;
    transition: color 0.1s linear;

    h5 {
        font-size: 22px;
        line-height: 32px;
        font-weight: 700;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;

        a {
            color: ${(props) =>
                props.isAddedToBucketlist
                    ? 'var(--theme-gold)'
                    : 'var(--theme-two)'};
            display: flex;
            align-items: center;

            &:hover {
                text-decoration: none;
            }
        }

        svg {
            fill: ${(props) =>
                props.isAddedToBucketlist
                    ? 'var(--theme-gold)'
                    : 'var(--theme-two)'};
            margin-right: 10px;
            width: 32px;
            transition: fill 0.1s linear;
        }
    }

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        list-style: none;
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
        margin: 0;
        padding: 30px;
    }
`;

export const StoryAuthor = styled.div`
    ${storyInfo}
    border-bottom: 0;

    .author-info {
        display: flex;
        align-items: center;

        img {
            border-radius: 50%;
            border: 5px solid var(--theme-six);
            box-shadow: 0px 0px 0px 1px var(--theme-five);
            width: 50px;
            height: 50px;
        }

        .author-info-space {
            padding-left: 15px;
        }

        span {
            font-size: 14px;
            font-weight: 300;
        }

        p {
            font-size: 18px;
            line-height: 20px;
            font-weight: 700;
            margin-bottom: 0;

            a {
                color: var(--theme-two);

                &:hover {
                    text-decoration: none;
                }
            }
        }
    }

    @media (min-width: 768px) {
        margin: 0;
        padding: 40px 0 30px;
    }
`;

export const StoryActions = styled.div`
    margin-left: 15px;
    display: flex;
    align-items: center;
    min-width: 95px;
    justify-content: flex-end;

    button {
        border: 0;
        background: none;
        color: #9d9d9d;
    }

    .like-story {
    }
`;

export const StoryShare = styled.div`
    background-color: var(--theme-modal-window);
    border-radius: 15px 15px 0 0;
    color: var(--theme-two);
    padding: 40px 30px 30px;
    position: relative;
    text-align: center;
    overflow: hidden;

    p {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 1.5rem;
    }

    .input-url {
        opacity: 0;
        padding: 0;
        font-size: 10px;
    }

    .btn-copy-link {
        background: var(--theme-modal-button);
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            margin-right: 10px;
            font-weight: 400;
        }

        &:hover {
            background: var(--theme-modal-button-hover) !important;
        }
    }

    @media (min-width: 960px) {
        border-radius: 5px;
    }
`;

export const StoryShareWrapper = styled.div`
    max-width: 440px;
    margin: 0 auto;
`;

export const ShareButtons = styled.div`
    display: flex;
    margin: 0 -15px 1.5rem;

    button {
        border: 0;
        background: none;
        color: inherit;
        width: 25%;
        padding: 0 15px !important;

        i {
            display: block;
            width: 100%;
            padding-bottom: 100%;
            border-radius: 100%;
            margin-bottom: 5px;

            &.ico-facebook {
                background: url(/static/assets/svg/facebook.svg) no-repeat
                    center #4267b2;
            }

            &.ico-instagram {
                background: url(/static/assets/svg/instagram.svg) no-repeat
                    center #e1306c;
            }

            &.ico-linkedin {
                background: url(/static/assets/svg/linkedin.svg) no-repeat
                    center #0077b5;
            }

            &.ico-whatsapp {
                background: url(/static/assets/svg/whatsapp.svg) no-repeat
                    center #4ac959;
            }
        }

        span {
            font-size: 14px;
            font-weight: 300;
        }
    }
`;

export const InstagramShareModal = styled.div`
    padding: 0 15px;
    text-align: center;
    width: 100%;

    p {
        border-bottom: 1px solid var(--theme-modal-border);
        color: var(--theme-modal-text);
        text-align: center;
        margin: 0 -15px 15px;
        padding: 10px;
        font-size: 14px;
    }

    .image-wrapper {
        height: 400px;
        position: relative;

        div {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
        }

        img {
            width: auto;
            max-height: 100%;
            position: relative;
            z-index: 5;
            border-radius: 5px;
            padding: 5px;
            border: 1px dashed var(--theme-four);
        }
    }

    .footer-modal {
        border-top: 1px solid var(--theme-modal-border);
        padding: 15px;
        margin: 15px -15px 0;
    }

    .btn-download {
        border: 0;
        background: var(--theme-modal-button);
        color: #fff;
        font-weight: 700;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: var(--theme-modal-button-hover) !important;
        }
    }
`;

export const Comments = styled.section`
    margin-bottom: 15px;
`;
