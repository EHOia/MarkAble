import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class SimilarityImg extends Component {
    render() {
      return(
        //   <img src="../wordcloud.png"></img>
        <div className={styles.similarity_top5}>
            <div>데</div>
            <div>이</div>
            <div>터</div>
            <div>받</div>
            <div>기</div>

        </div>
            )
    }
  }

export default SimilarityImg;