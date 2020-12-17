import styled from 'styled-components';

import Modal from 'styled-react-modal';

export const ModalBackground = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 90;
    opacity: 1;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-modal);
`;

export const StyledModal = Modal.styled`
    width: 80%;
    max-width: 460px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-modal-window);

    .confirmation {
        color: var(--theme-two);
        text-align: center;
        padding: 30px;

        p {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: .5rem;
        }

        span {
            color: var(--theme-three);
            display: block;
            margin-bottom: 2rem;
        }

        .btn-delete {
            background: var(--theme-error);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 30px 10px 10px;
            margin: 0 auto 1rem;

            &:hover {
                background: var(--theme-error-hover);
            }

            > div {
                width: 50px !important;
                height: 30px !important;
                transform: scale(3);
            }
        }

        .btn-link {
            color: var(--theme-two);
            font-size: 14px;
            text-decoration: underline;
            padding: 0;
            margin-bottom: 0;
        }
    }
`;
