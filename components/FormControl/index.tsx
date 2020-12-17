import React, { InputHTMLAttributes } from 'react';
import { IconProps } from '@primer/octicons-react';

import { FormControlContainer } from './styles';

interface FormControlProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<IconProps>;
    textarea?: boolean;
}

const FormControl: React.FC<FormControlProps> = ({
    icon: Icon,
    textarea,
    children,
}) => {
    return (
        <>
            <FormControlContainer className={textarea ? 'has-textarea' : ''}>
                {Icon && <Icon className="input-icon" size={24} />}
                {children}
            </FormControlContainer>
        </>
    );
};

export default FormControl;
