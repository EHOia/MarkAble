import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class SimilarityText extends Component {
    render() {
      return(
        <div className={styles.result_txt}>
            🧐 입력하신 상표와 기존 상표 데이터와의 유사도는 {this.props.per}% 입니다.
        </div>
      )
      
    }
  }

export default SimilarityText;