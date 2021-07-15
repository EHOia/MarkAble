import React, { Component } from "react";

/* import CSS */
import styles from "../style.module.css";

class ListTitle extends Component {
  render() {
    return (
      <div className={styles.list_title}>📝 List of Similar Trademarks</div>
    );
  }
}

export default ListTitle;
