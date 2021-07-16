import React, { useState, Component } from "react";
import axios from "axios";

import styles from "./style.module.css";

import Title from "./components/Title";
import MostSimilarityTxt from "./components/MostSimilarityTxt";
import ListTitle from "./components/ListTitle";

function App() {
  const [mode, setMode] = useState("welcome");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const processText = e => {
    setText(e.target.value);
  };

  const codeText = e => {
    setCode(e.target.value);
  };

  const sendData = () => {
    if (code === "") {
      alert("유사군코드를 입력해주세요.");
    } else if (text === "") {
      alert("상표명을 입력해주세요.");
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
    }
  };

  const toWelcomeChange = () => {
    setMode("welcome");
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
            <div className={styles.mark_name}>Coca-Cola</div>
          </li>
          <li>
            <div className={styles.rank}>2</div>
            <div className={styles.mark_name}>COLO</div>
          </li>
          <li>
            <div className={styles.rank}>3</div>
            <div className={styles.mark_name}>CORA</div>
          </li>
          <li>
            <div className={styles.rank}>4</div>
            <div className={styles.mark_name}>JONNY COTA</div>
          </li>
          <li>
            <div className={styles.rank}>5</div>
            <div className={styles.mark_name}>COL D'ORCIA</div>
          </li>
        </ul>
      );
    }
  }

  class InputZone extends Component {
    render() {
      return (
        <div className={styles.input_zone}>
          <CategoryOptions />
          <InputName />
          <CheckButton />
        </div>
      );
    }
  }

  class CategoryOptions extends Component {
    render () {
      return (
        <div className={styles.category_options}>
          <p>
            <input
              className={styles.category_input}
              type="text"
              placeholder="유사군코드 입력"
              value={code}
              onChange={codeText}
            />
          </p>
          
      </div>
      )
    }
  }

  class CheckButton extends Component {
    render () {
      return (
        <div className={styles.similarity_check_btn}>
          <p>
            <button onClick={sendData}>Check similarity</button>
          </p>
        </div>
      )
    }
  }

  class InputName extends Component {
    render () {
      return (
        <div className={styles.input_name}>
          <p>
            <input
              type="text"
              placeholder="상표명 입력"
              value={text}
              onChange={processText}
            />
          </p>
          
        </div>
      )
    }
  }
  var _article = null;
  if (mode === "result") {
    _article = <ResultZone></ResultZone>;
  }

  var _inputZone = null;
  if (mode === "welcome") {
    _inputZone = <InputZone />
  }

  return (
    <div className="App">
      {/* title-zone */}
      <div className={styles.title_zone}>
        <div onClick={toWelcomeChange}>
          <Title></Title>
        </div>
      </div>
      {_inputZone}
      {_article}
    </div>
  );
}
export default App;
