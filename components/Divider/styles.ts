import styled from 'styled-components';

interface DividerProps {
    isFull?: boolean;
    margin?: number;
}

const handleMargin = (margin) => {
    switch (margin) {
        case 1:
            return '.25rem';
        case 2:
            return '.5rem';
        case 3:
            return '1rem';
        case 4:
            return '1.5rem';
        case 5:
            return '3rem';
        case 6:
            return '4.5rem';
        case 7:
            return '6rem';
        default:
            return '0';
    }
};

export const DividerElement = styled.hr<DividerProps>`
    border-top-color: var(--theme-five);
    max-width: ${(props) => (props.isFull ? 'none' : '150px')};
    margin: 1.5rem auto;

    @media (min-width: 720px) {
        margin: 3rem auto;
    }

    @media (min-width: 960px) {
        margin: ${(props) => (props.margin ? handleMargin(props.margin) : '0')}
            auto;
        max-width: ${(props) => (props.isFull ? 'none' : '300px')};
    }
`;
