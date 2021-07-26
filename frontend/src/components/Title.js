import React, { Component } from "react";
import Logo from "../images/logo.jpg";

/* import CSS */
import styles from "../style.module.css";

class Title extends Component {
  render() {
    return (
      <div className={styles.title}>
        {/* Welcome{" "}
        <span className={styles.text_gradient}>MARK SURE</span> */}
        <img className={styles.title_img} src={Logo}></img>
      </div>
    );
  }
}

export default Title;
