import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
    type?: 'success' | 'error' | 'info';
    description: number;
}

const toastTypeVariations = {
    info: css`
        background: var(--theme-button);
    `,
    success: css`
        background: var(--theme-success);
    `,
    error: css`
        background: var(--theme-error);
    `,
};

export const Container = styled(animated.div)<ContainerProps>`
    width: 100%;
    position: relative;
    padding: 12px 15px 14px;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    color: #fff;

    & + div {
        margin-top: 10px;
    }

    ${(props) => toastTypeVariations[props.type || 'info']}

    > svg {
        margin-right: 15px;
    }

    div {
        flex: 1;

        p {
            font-size: 13px;
            opacity: 0.8;
            line-height: 16px;
            margin: 0;
        }
    }

    button {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0.8;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${(props) =>
        !props.description &&
        css`
            align-items: center;

            svg {
                margin-top: 0;
            }
        `}
`;
