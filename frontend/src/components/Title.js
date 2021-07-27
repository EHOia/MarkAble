import React, { Component } from "react";
import Logo from "../images/logo.png";

/* import CSS */
import styles from "../style.module.css";

class Title extends Component {
  render() {
    return (
      <div className={styles.title}>
        {/* Welcome &nbsp;<span className={styles.text_gradient}>MARK-ABLE</span> */}
        <img className={styles.title_img} src={Logo} alt="Logo"></img>
      </div>
    );
  }
}

export default Title;
