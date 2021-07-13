import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class SimilarityImg extends Component {
    render() {
      return(
        //   <img src="../wordcloud.png"></img>
        <div className={styles.similarity_top5}>
            <div>📝 유사상표명1</div>
            <div>📝 유사상표명2</div>
            <div>📝 유사상표명3</div>
            <div>📝 유사상표명4</div>
            <div>📝 유사상표명5</div>

        </div>
            )
    }
  }

export default SimilarityImg;