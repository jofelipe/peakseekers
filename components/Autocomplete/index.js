import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import withTranslation from 'next-translate/withTranslation';

import { compose } from 'recompose';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';

import Flag from '../../components/Flag';

class AutoComplete extends Component {
    static propTypes = {
        hits: PropTypes.arrayOf(PropTypes.object).isRequired,
        currentRefinement: PropTypes.string.isRequired,
        refine: PropTypes.func.isRequired,
        onSuggestionSelected: PropTypes.func.isRequired,
        onSuggestionCleared: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.currentRefinement,
    };

    onChange = (_, { newValue }) => {
        if (!newValue) {
            this.props.onSuggestionCleared();
        }

        this.setState({
            value: newValue,
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.props.refine(value);
    };

    onSuggestionsClearRequested = () => {
        this.props.refine();
    };

    getSuggestionValue(hit) {
        return hit.name;
    }

    renderSuggestionFeet(hit) {
        return (
            <>
                <Flag country={hit.country} size={16} />
                <p>
                    <Highlight attribute="name" hit={hit} tagName="span" />
                </p>
                <span className="mountain-elevation">
                    {Math.floor(hit.elevation * 3.281)}ft
                </span>
            </>
        );
    }

    renderSuggestionMeters(hit) {
        return (
            <>
                <Flag country={hit.country} size={16} />
                <p>
                    <Highlight attribute="name" hit={hit} tagName="span" />
                </p>
                <span className="mountain-elevation">{hit.elevation}m</span>
            </>
        );
    }

    render() {
        const { hits, onSuggestionSelected } = this.props;
        const { value } = this.state;

        const { lang } = this.props.i18n;

        const inputProps = {
            placeholder:
                lang === 'pt' ? 'Pesquisar montanha...' : 'Search mountain...',
            onChange: this.onChange,
            value,
            autoFocus: this.props.autoFocus,
        };

        return (
            <AutoSuggest
                suggestions={hits}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={
                    this.props.useFeet
                        ? this.renderSuggestionFeet
                        : this.renderSuggestionMeters
                }
                inputProps={inputProps}
            />
        );
    }
}

export default compose(connectAutoComplete, withTranslation)(AutoComplete);
