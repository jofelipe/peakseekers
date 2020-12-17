import styled, { css } from 'styled-components';

interface EditorProps {
    language: string;
}

const border = css`
    border-bottom: 1px solid var(--theme-five);
`;

export const Wrapper = styled.section`
    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        margin-bottom: -87px;
    }

    @media (min-width: 1140px) and (max-width: 1366px) {
        padding-left: 90px;
    }
`;

export const PublishStory = styled.div`
    ${border}
    background: var(--theme-six);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    z-index: 10;

    .btn-publish {
        background: var(--theme-button);
        color: #fff;
        font-weight: 700;
        padding: 7px 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: var(--theme-button-hover) !important;
        }

        > div {
            margin: 0 15px 0 0 !important;
        }

        &.is-loading {
            cursor: default;
            opacity: 0.5;
        }
    }

    .saved {
        padding-left: 5px;
        opacity: 0;
        transition: all 0.3s ease-in-out;

        &-visible {
            opacity: 1;
        }

        p {
            color: var(--theme-success);
            font-size: 14px;
            margin-bottom: 0;
        }
    }

    @media (min-width: 768px) {
        border-bottom: 0;
        border-top: 1px solid var(--theme-five);
        padding: 15px 0;
        position: sticky;
        bottom: 0;
        order: 5;

        .btn-publish {
            padding: 7px 30px;
        }
    }

    @media (min-width: 960px) {
        .saved {
            p {
                font-size: 16px;
            }
        }
    }
`;

export const StoryTitle = styled.div`
    ${border}
    margin: -19px -15px 0;
    padding: 15px 15px 7px;

    textarea {
        background: none !important;
        border: 0;
        color: var(--theme-two);
        height: auto;
        border-radius: 0;
        font-size: 22px;
        font-weight: 700;
        padding: 0;
        width: 100%;
        resize: none;

        &::placeholder {
            color: var(--theme-three);
        }
    }

    @media (min-width: 960px) {
        margin: -30px 0 0;
        padding: 10px 0 5px;
    }
`;

export const SearchMountain = styled.div`
    ${border}
    margin: 0 -15px;
    position: relative;

    svg {
        color: var(--theme-three);
        position: absolute;
        top: 15px;
        left: 15px;
    }

    input {
        background: none !important;
        border-radius: 0;
        border: 0;
        color: var(--theme-two);
        padding: 15px 15px 15px 52px;
        height: auto;
        width: 100%;

        &::placeholder {
            color: var(--theme-three);
        }
    }

    .mountain-autocomplete {
        .react-autosuggest__suggestions-container {
            ${border};
            background: var(--theme-six);
            position: absolute;
            width: 100%;
            left: 0;
            top: 55px;
            z-index: 90;
        }

        ul {
            margin: 0;
            padding: 7px 0 7px;
        }

        li {
            display: flex;
            align-items: center;
            padding: 7px 15px;
        }

        img {
            width: 24px !important;
        }

        p {
            color: var(--theme-three);
            margin-left: 13px;
            margin-bottom: 0;

            .ais-Highlight-highlighted {
                color: var(--theme-one);
            }
        }

        .mountain-elevation {
            color: var(--theme-four);
            font-size: 80%;
            padding-left: 15px;
            margin-left: auto;
        }
    }

    @media (min-width: 960px) {
        margin: 0;

        svg {
            left: 0;
        }

        input {
            padding-left: 37px;
        }

        .mountain-autocomplete {
            margin-bottom: 1px;

            li {
                &:hover {
                    background: rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                }
            }
        }
    }
`;

export const AddImages = styled.div`
    .dropzone {
        background: var(--theme-add-images);
        color: var(--theme-three);
        cursor: pointer;
        text-align: center;
        padding: 15px 0;
        margin: 0 -15px;

        svg {
            margin-bottom: 3px;
        }

        span {
            font-size: 14px;
            display: block;
        }
    }

    .images-preview {
        ${border}
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 -15px;
        padding: 5px;

        .image {
            padding: 7px;
            width: 20%;
            display: flex;
            align-items: center;

            div {
                border: 1px solid var(--theme-five);
                padding: 3px;
                border-radius: 2px;
                position: relative;
            }

            button {
                border: 0;
                background: none;
                padding: 0;
            }
        }

        .remove-image {
            color: var(--theme-error);
            position: absolute;
            top: -13px;
            right: -6px;
        }

        img {
            border-radius: 2px;
            max-width: 100%;
            height: auto;
        }
    }

    @media (min-width: 960px) {
        .dropzone {
            padding: 25px 0;
            margin: 0;
        }

        .images-preview {
            margin: 0;
            padding: 10px 7px;

            .image {
                width: auto;
                margin-right: 10px;
            }

            img {
                max-height: 60px;
            }
        }
    }
`;

export const EditorWrapper = styled.div<EditorProps>`
    position: relative;
    margin: 0 -15px;

    .editor-loading {
        color: var(--theme-three);
        padding: 15px;
    }

    .ql-snow.ql-toolbar button:not(:last-child) {
        margin-right: 2px;
    }

    .ql-toolbar.ql-snow .ql-formats {
        margin-right: 0;
    }

    .ql-container {
        font-family: 'Roboto', Arial, sans-serif;
        padding-bottom: 60px;
    }

    .ql-toolbar.ql-snow {
        background: var(--theme-six);
        border: 0;
        ${border}
        padding: 10px;
        position: sticky;
        top: 71px;
        z-index: 10;
    }

    .ql-snow .ql-fill,
    .ql-snow .ql-stroke.ql-fill {
        fill: var(--theme-three);
    }

    .ql-snow .ql-stroke {
        stroke: var(--theme-three);
    }

    .ql-container.ql-snow {
        border: 0;
    }

    .ql-editor {
        padding: 25px 20px 0;
    }

    .ql-container > .ql-editor.ql-blank::before {
        font-size: 16px;
        font-style: normal;
        color: var(--theme-three);
        left: 20px;
        margin-top: 1px;
    }

    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: var(--theme-two);
    }

    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: var(--theme-two);
    }

    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: var(--theme-two);
    }

    .ql-snow .ql-tooltip {
        background-color: var(--theme-three);
        border: 0;
        box-shadow: none;
        padding: 10px;
        border-radius: 5px;
        color: var(--theme-six);
    }

    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: 'Link:';
    }

    .ql-snow .ql-tooltip input[type='text'] {
        border: 0;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.1);
        color: var(--theme-five);
    }

    .ql-snow .ql-tooltip a {
        color: var(--theme-six);
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        margin-left: 10px;
    }

    .ql-editor {
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
    }

    .ql-snow .ql-tooltip::before {
        content: '${(props) =>
            props.language === 'pt' ? 'Visitar URL' : 'Visit URL'}';
    }

    .ql-snow .ql-tooltip a.ql-action::after {
        content: '${(props) => (props.language === 'pt' ? 'Editar' : 'Edit')}';
    }

    .ql-snow .ql-tooltip a.ql-remove::before {
        content: '${(props) =>
            props.language === 'pt' ? 'Remover' : 'Remove'}';
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        content: '${(props) => (props.language === 'pt' ? 'Salvar' : 'Save')}';
    }

    .ql-snow .ql-tooltip a.ql-preview {
        max-width: 160px;
    }

    @media (min-width: 768px) {
        .ql-toolbar.ql-snow {
            padding: 15px;
            top: 0;
        }
    }

    @media (min-width: 960px) {
        margin: 0;

        .ql-container > .ql-editor.ql-blank::before {
            left: 5px;
            margin-top: 2px;
        }

        .ql-container {
            padding-bottom: 0;
        }

        .ql-editor {
            padding: 25px 5px 0;
        }

        .ql-toolbar.ql-snow {
            padding: 15px 0;
        }

        .ql-snow.ql-toolbar button:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

export const ModalCrop = styled.div`
    padding: 0 15px;
    position: relative;
    width: 100%;

    p {
        border-bottom: 1px solid var(--theme-modal-border);
        color: var(--theme-modal-text);
        margin: 0 -15px 15px;
        text-align: center;
        padding: 10px 0;
        font-size: 14px;
    }

    .cropper-modal {
        background: none;
        opacity: 0;
    }

    .footer-modal {
        border-top: 1px solid var(--theme-modal-border);
        padding: 15px;
        margin: 15px -15px 0;
    }

    .btn-crop {
        border: 0;
        background: var(--theme-modal-button);
        color: #fff;
        font-weight: 700;
        padding: 10px 0;
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
`;
