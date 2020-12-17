import styled from 'styled-components';

interface SkeletonWrapperProps {
    hasBorder?: boolean;
}

export const Wrapper = styled.div<SkeletonWrapperProps>`
    .react-loading-skeleton {
        ${(props) => props.hasBorder && `border: 1px solid var(--theme-five)`}
    }
`;
