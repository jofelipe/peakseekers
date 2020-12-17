import React from 'react';

import { SkeletonTheme } from 'react-loading-skeleton';

import { Wrapper } from './styles';

interface SkeletonWrapperProps {
    hasBorder?: boolean;
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
    children,
    ...rest
}) => {
    return (
        <>
            <Wrapper {...rest}>
                <SkeletonTheme>{children}</SkeletonTheme>
            </Wrapper>
        </>
    );
};

export default SkeletonWrapper;
