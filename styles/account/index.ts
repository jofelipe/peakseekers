import styled from 'styled-components';

import Tooltip from '../../components/Tooltip';

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

export const FormWrapper = styled.section`
    max-width: 720px;
    margin: 0 auto;

    .btn-update-profile {
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

    .form-group {
        position: relative;
    }

    .username-loading {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 20px;
        height: 26px;
    }

    hr {
        margin: 2rem auto;
        border-top-color: var(--theme-five);
        width: 50%;
        opacity: 0.5;
    }

    @media (min-width: 960px) {
        .btn-update-profile {
            padding: 15px 0;
        }

        hr {
            margin: 3rem auto;
        }
    }
`;

export const AvatarContainer = styled.div`
    text-align: center;

    img {
        border-radius: 50%;
        width: 175px;
        height: 175px;
        display: block;
        margin: 0 auto 15px;
        border: 10px solid var(--theme-six);
        box-shadow: 0px 0px 0px 1px var(--theme-five);
    }

    label {
        color: var(--theme-three);
        cursor: pointer;
        display: table;
        margin: 0 auto;
    }

    input {
        display: none;
    }

    span {
        opacity: 0.3;
    }
`;

export const DeleteAccount = styled.button`
    border: 1px solid var(--theme-error);
    background: none;
    color: var(--theme-error);
    padding: 10px 0;
    width: 50%;
    border-radius: 5px;
    transition: all 0.1s linear;

    &:hover {
        background: var(--theme-error);
        color: #fff;
    }
`;

export const ModalCrop = styled.div`
    padding: 0 15px;
    position: relative;
    width: 100%;

    p {
        border-bottom: 1px solid var(--theme-modal-border);
        color: var(--theme-three);
        margin: 0 -15px;
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
        margin: 0 -15px;
    }

    .btn-crop {
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
`;
