import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class SubTitle extends Component {
    render() {
      return(
        <div className={styles.wordcloud_name}> 
        유사한 상표 목록 </div>
      )
    }
  }

export default SubTitle;