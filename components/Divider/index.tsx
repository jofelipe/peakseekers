import React from 'react';

import { DividerElement } from './styles';

interface DividerProps {
    isFull?: boolean;
    margin?: number;
}

const Divider: React.FC<DividerProps> = (props) => {
    return (
        <>
            <DividerElement {...props} />
        </>
    );
};

export default Divider;
