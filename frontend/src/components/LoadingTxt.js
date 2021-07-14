import React, { Component } from 'react';

/* import CSS */
import styles from '../style.module.css';

class LoadingTxt extends Component {
    render() {
      return(
        <div className={styles.loading_txt}>
          loading ...
        </div>
      )
    }
  }

export default LoadingTxt;