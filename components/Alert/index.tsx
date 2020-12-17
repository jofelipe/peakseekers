import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { AlertMessage } from '../../hooks/alert';
import AlertElement from './Element';

interface AlertProps {
    messages: AlertMessage[];
}

const Alert: React.FC<AlertProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages,
        (message) => message.id,
        {
            from: { top: '-150px', opacity: 0 },
            enter: { top: '0%', opacity: 1 },
            leave: { top: '-150%', opacity: 0 },
        }
    );

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => (
                <AlertElement key={key} style={props} message={item} />
            ))}
        </Container>
    );
};

export default Alert;
