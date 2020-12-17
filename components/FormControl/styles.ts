import styled, { css } from 'styled-components';

interface FormControlContainerProps {
    textarea?: boolean;
}

export const FormControlContainer = styled.div<FormControlContainerProps>`
    position: relative;

    input {
        background: none;
        border: 2px solid var(--theme-five);
        padding: 11px 15px 11px 50px;
        height: auto;
        border-radius: 5px;
        color: var(--theme-two) !important;

        &:focus {
            background: none;
            border-color: var(--theme-three);
        }

        &.has-error {
            border-color: var(--theme-error);
        }
    }

    .input-icon {
        color: var(--theme-four);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        margin: auto;
    }

    &.has-textarea .input-icon {
        top: 17px;
        margin: 0;
    }

    select {
        background: none;
        border: 2px solid var(--theme-five);
        padding: 11px 15px 11px 50px;
        height: auto;
        border-radius: 5px;
        color: var(--theme-two) !important;

        &:focus {
            background: none;
            border-color: var(--theme-three);
        }

        &.has-error {
            border-color: var(--theme-error);
        }
    }

    option {
        background: var(--theme-six);
        padding: 5px 10px;
    }

    textarea {
        background: none;
        border: 2px solid var(--theme-five);
        padding: 11px 15px 11px 50px;
        height: auto;
        border-radius: 5px;
        color: var(--theme-two) !important;
        height: 125px;

        &:focus {
            background: none;
            border-color: var(--theme-three);
        }

        &.has-error {
            border-color: var(--theme-error);
        }
    }

    .input-icons {
        display: flex;
        position: absolute;
        height: 100%;
        right: 0;
        padding-right: 15px;
        top: 0;
        align-items: center;
    }

    .toggle-password {
        color: var(--theme-four);
        border: 0;
        background: none;
        margin-right: 5px;
    }

    .toggle-password:only-child {
        margin-right: 0;
    }

    .react-select__control {
        background: none;
        box-shadow: none;
        border: 2px solid var(--theme-five);

        &:hover {
            border-color: var(--theme-five);
        }
    }

    .react-select__indicator-separator {
        background: var(--theme-six);
    }

    .react-select__indicator {
        color: var(--theme-four);
    }

    .react-select__menu {
        background: var(--theme-six);
        display: block !important;
        color: var(--theme-two);
    }

    .react-select__option:hover,
    .react-select__option--is-focused,
    .react-select__option--is-selected {
        background: var(--theme-five);
        color: var(--theme-two);
    }

    .react-select__value-container {
        padding: 9px 15px 9px 45px;
    }

    .react-select__placeholder,
    .react-select__single-value {
        color: var(--theme-two);
    }

    @media (min-width: 960px) {
        min-height: 58px;

        input,
        select,
        textarea {
            padding: 15px 15px 15px 50px;
        }

        .react-select__value-container {
            padding: 11px 15px 11px 45px;
        }
    }

    @media (max-width: 767px) {
        .input-icons {
            svg + span {
                display: none !important;
            }
        }
    }
`;
