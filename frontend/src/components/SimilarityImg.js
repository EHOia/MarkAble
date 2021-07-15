import React, { Component } from "react";

/* import CSS */
import styles from "../style.module.css";

class SimilarityImg extends Component {
  render() {
    return (
      //   <img src="../wordcloud.png"></img>
      <div className={styles.similarity_top5}>
        <div>📝 Coca-Cola</div>
        <div>📝 COLO</div>
        <div>📝 CORA</div>
        <div>📝 JONNY COTA</div>
        <div>📝 COL D'ORCIA</div>
      </div>
    );
  }
}

export default SimilarityImg;
