import React, { useMemo, useEffect, useState } from 'react';
import ifEmoji from 'if-emoji';
import ReactCountryFlag from 'react-country-flag';
import countries from 'i18n-iso-countries';
import useTranslation from 'next-translate/useTranslation';

interface FlagProps {
    size?: number;
    country: string;
    text?: boolean;
}

const Flag: React.FC<FlagProps> = (props) => {
    const { lang } = useTranslation();

    const [countryName, setCountryName] = useState('');

    const firstCountry = props.country.split('/')[0];

    const countryEmoji = useMemo(() => {
        return firstCountry
            .toUpperCase()
            .replace(/./g, (char) =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
            );
    }, [firstCountry]);

    useEffect(() => {
        countries.registerLocale(
            require(`i18n-iso-countries/langs/${lang}.json`)
        );
        setCountryName(countries.getName(firstCountry, lang));
    }, [lang]);

    return (
        <>
            {props.text ? (
                countryName
            ) : ifEmoji(countryEmoji) ? (
                countryEmoji
            ) : (
                <ReactCountryFlag
                    countryCode={firstCountry}
                    style={{
                        fontSize: props.size ? props.size + 'px' : '24px',
                    }}
                    aria-label={countries.getName(firstCountry, lang)}
                    title={countries.getName(firstCountry, lang)}
                    svg
                />
            )}
        </>
    );
};

export default Flag;
