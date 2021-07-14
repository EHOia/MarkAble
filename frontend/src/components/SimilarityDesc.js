import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class SimilarityDesc extends Component {
    render() {
      return(
        <div className={styles.wordcloud_desc}>
          단어의 크기가 클수록 유사도가 높습니다.
        </div>
      )
    }
  }

export default SimilarityDesc;