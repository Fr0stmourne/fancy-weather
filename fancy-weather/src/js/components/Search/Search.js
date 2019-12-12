import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SpeechRecognition from 'react-speech-recognition';
import styles from './search.module.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    this.props.stopListening();
  }

  componentDidUpdate(prevProps) {
    if (this.props.finalTranscript && prevProps.finalTranscript !== this.props.finalTranscript) {
      this.props.searchBtnHandler(this.props.finalTranscript);
    }
  }

  render() {
    return (
      <section className={styles.search}>
        <input
          placeholder={'Search city'}
          ref={this.searchInputRef}
          className={styles.search__input}
          type="search"
          name="location"
          id="search"
        />
        <button
          className={styles.search__btn}
          onClick={() => {
            this.props.searchBtnHandler(this.searchInputRef.current.value || undefined);
          }}
        >
          Search
        </button>
        <button
          onClick={() => this.props.startListening()}
          className={classnames(
            styles.search__voice,
            window.SpeechRecognition || window.webkitSpeechRecognition ? '' : styles['search__voice--hide'],
          )}
        ></button>
      </section>
    );
  }
}

Search.propTypes = {
  searchBtnHandler: PropTypes.func,
  finalTranscript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  listening: PropTypes.bool,
};

const options = {
  autostart: false,
  continuous: false,
};

export default SpeechRecognition(options)(Search);
