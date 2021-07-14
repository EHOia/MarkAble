import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class TitleDesc extends Component {
    render() {
      return(
          <div className={styles.title_desc}>
            상표 출원 전, 유사도 문제 국내 최초 상표 분석 인공지능에게 물어보세요
          </div>
        
      )
    }
  }

export default TitleDesc;