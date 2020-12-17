import React, { useEffect } from 'react';

import {
    IssueOpenedIcon,
    CheckCircleIcon,
    InfoIcon,
    XIcon,
} from '@primer/octicons-react';
import { AlertMessage, useAlert } from '../../../hooks/alert';

import { Container } from './styles';

interface AlertProps {
    message: AlertMessage;
    style: object;
}

const icons = {
    info: <InfoIcon size={24} />,
    error: <IssueOpenedIcon size={24} />,
    success: <CheckCircleIcon size={24} />,
};

const AlertElement: React.FC<AlertProps> = ({ message, style }) => {
    const { removeAlert } = useAlert();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeAlert(message.id);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [removeAlert, message.id]);

    return (
        <Container
            type={message.type}
            description={message.description ? 1 : 0}
            style={style}
        >
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeAlert(message.id)} type="button">
                <XIcon size={15} />
            </button>
        </Container>
    );
};

export default AlertElement;
