import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

interface MapPinProps {
    lat: number;
    lng: number;
    mountain: string;
    href?: string;
    size?: number;
}

import { Wrapper } from './styles';

const MapPin: React.FC<MapPinProps> = (props) => {
    const { lang } = useTranslation();

    return (
        <>
            {props.href ? (
                <Link href={props.href} lang={lang}>
                    <a title={props.mountain}>
                        <Wrapper size={props.size}>
                            <svg viewBox="0 0 24 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="path-one"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="path-two"
                                />
                            </svg>
                        </Wrapper>
                    </a>
                </Link>
            ) : (
                <Wrapper>
                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="path-one"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 13a3 3 0 100-6 3 3 0 000 6z"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="path-two"
                        />
                    </svg>
                </Wrapper>
            )}
        </>
    );
};

export default MapPin;
