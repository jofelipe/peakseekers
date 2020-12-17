import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    span {
        max-width: 200px;
        background: var(--theme-three);
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.4s;
        position: absolute;
        bottom: calc(100% + 12px);
        visibility: hidden;
        white-space: nowrap;

        left: 50%;
        transform: translateX(-50%);

        color: #312e38;
        &::before {
            content: '';
            border-style: solid;
            border-color: var(--theme-three) transparent;
            border-width: 6px 6px 0px 6px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover span {
        opacity: 100%;
        visibility: visible;
    }
`;
