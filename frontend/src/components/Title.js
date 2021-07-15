import React, { Component } from "react";

/* import CSS */
import styles from "../style.module.css";

class Title extends Component {
  render() {
    return (
      <div className={styles.title}>
        Welcome{" "}
        <span className={styles.text_gradient}>TRADEMARK VERIFICATION</span>
      </div>
    );
  }
}

export default Title;
