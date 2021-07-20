import React, { useState, useEffect ,Component } from "react";
import axios from "axios";

import styles from "./style.module.css";

import Title from "./components/Title";
import MostSimilarityTxt from "./components/MostSimilarityTxt";

function App() {
  const [mode, setMode] = useState("welcome");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const[data, setData] = useState("");

  const processText = e => {
    setText(e.target.value);
  };

  const codeText = e => {
    setCode(e.target.value);
  };

  function validateCode(code) {
    var codeReg = new RegExp(/[g|s|S|G]\d{4}/);
    return codeReg.test(code);
  }

  const sendData = () => {
    if (code === "") {
      alert("유사군코드를 입력해주세요.");
    } else if (text === "") {
      alert("상표명을 입력해주세요.");
    } else if (!validateCode(code)) {
      alert("올바른 유사군코드를 입력해주세요.");
    } else {
      setMode("result");
      let form = new FormData();
      form.append("title", text);
      form.append("code", code);

      axios
        .post(`http://127.0.0.1:5000/trademark/api/data_transmit`, form)
        .then(response => {
          console.log("response : ", JSON.stringify(response, null, 2));
        })
        .catch(error => {
          console.log("failed", error);
        });

      axios
        .get(`http://127.0.0.1:5000/trademark/api/show_data`)
        .then(response => {
          // console.log("response : ", JSON.stringify(response, null, 2));
          setData(response.data);
        })
        .catch(error => {
          console.log("failed", error);
        });
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:5000/trademark/api/show_data`)
  //     .then(response => {
  //       // console.log("response : ", JSON.stringify(response, null, 2));
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.log("failed", error);
  //     });
  // }, []);

  const toWelcomeChange = () => {
    setMode("welcome");
    setText("");
    setCode("");
  };

  class ResultZone extends Component {
    render() {
      return (
        <div className={styles.result_zone}>
          <ReportZone1></ReportZone1>
          <ReportZone2></ReportZone2>
        </div>
      );
    }
  }

  class ReportZone1 extends Component {
    render() {
      return (
        <div className={styles.report_zone1}>
          <MostSimilarity></MostSimilarity>
        </div>
      );
    }
  }

  class MostSimilarity extends Component {
    render() {
      return (
        <div className={styles.most_similarity}>
          <MostSimilarityTxt></MostSimilarityTxt>
          <MostSimilarityNum></MostSimilarityNum>
        </div>
      );
    }
  }

  class MostSimilarityNum extends Component {
    render() {
      return <div className={styles.most_similarity_num}>86.53%</div>;
    }
  }

  class ReportZone2 extends Component {
    render() {
      return (
        <div className={styles.report_zone2}>
          <SimilarList></SimilarList>
        </div>
      );
    }
  }

  class ListTitle extends Component {
    render() {
      return (
        <div className={styles.list_title}>
          📝 List of Similar Trademarks of &nbsp;{text}
        </div>
      );
    }
  }

  class SimilarList extends Component {
    render() {
      return (
        <div className={styles.similar_list}>
          <ListTitle></ListTitle>
          <Ul></Ul>
        </div>
      );
    }
  }

  class Ul extends Component {
    render() {
      return (
        <ul>
          <li>
            <div className={styles.rank}>1</div>
            <div>{data}</div>
          </li>
          <li>
            <div className={styles.rank}>2</div>
            <div className={styles.mark_name}>similar_titles2</div>
          </li>
          <li>
            <div className={styles.rank}>3</div>
            <div className={styles.mark_name}>similar_titles3</div>
          </li>
          <li>
            <div className={styles.rank}>4</div>
            <div className={styles.mark_name}>similar_titles4</div>
          </li>
          <li>
            <div className={styles.rank}>5</div>
            <div className={styles.mark_name}>similar_titles5</div>
          </li>
        </ul>
      );
    }
  }

  var _article = null;
  if (mode === "result") {
    _article = <ResultZone></ResultZone>;
  }

  if (mode === "welcome") {
    _article = (
      <div className={styles.input_zone}>
        <div className={styles.category_options}>
          <p>
            <input
              className={styles.category_input}
              type="text"
              placeholder="유사군코드 입력"
              value={code}
              onChange={codeText} // onChange는 input 안의 값이 변경될 때에 발생
            />
          </p>
        </div>
        <div className={styles.input_name}>
          <p>
            <input
              type="text"
              placeholder="상표명 입력"
              value={text}
              onChange={processText} // onChange는 input 안의 값이 변경될 때에 발생
            />
          </p>
        </div>
        <div className={styles.similarity_check_btn}>
          <p>
            <button onClick={sendData}>Check similarity</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* title-zone */}
      <div className={styles.title_zone}>
        <div onClick={toWelcomeChange}>
          <Title></Title>
        </div>
      </div>
      {_article}
    </div>
  );
}
export default App;
