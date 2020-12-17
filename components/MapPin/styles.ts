import styled from 'styled-components';

interface WrapperProps {
    size?: number;
}

export const Wrapper = styled.div<WrapperProps>`
    width: ${(props) => (props.size ? props.size : 24)}px;
    height: ${(props) => (props.size ? props.size : 24)}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .path-one {
        fill: var(--theme-two);
        stroke: var(--theme-two);
    }

    .path-two {
        fill: var(--theme-six);
        stroke: var(--theme-two);
    }
`;
