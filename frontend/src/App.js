import React, { useState, Component } from "react";
import axios from "axios";

/* import CSS */
import styles from "./style.module.css";

/* import Components */
// 공통
import Title from "./components/Title";
import TitleDesc from "./components/TitleDesc";

// scene 1
// import CategoryOptions from "./components/CategoryOptions";

// scene 2
// import LoadingTxt from "./components/LoadingTxt";

// scene 3
import SimilarityText from "./components/SimilarityText";
import SubTitle from "./components/SubTitle";
import SimilarityImg from "./components/SimilarityImg";
import SimilarityDesc from "./components/SimilarityDesc";
// import RetryBtn from "./components/RetryBtn";

function App() {
  // mode 설정 변수
  const [mode, setMode] = useState("welcome");

  // text : 현재값 / setText : 변경할 값
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  // 상표명 입력받는 변수
  const processText = e => {
    setText(e.target.value);
  };

  // 상품 카테고리 입력받는 변수
  const codeText = e => {
    setCode(e.target.value);
  };
  
  // (공통) input-zone 백엔드에 데이터 주기
  const sendData = () => {
    if ( code === '' ) {
      alert("유사군코드를 반드시 입력해주세요.")
    }
    else if ( text === '' ){
      alert( "상표명을 반드시 입력해주세요." );
    }
    else {
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

  // Loading Effect
  const Loading = () => {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  const toWelcomeChange = () => {
    setMode("welcome");
  };

  // setMode 때문에 RetryBtn App.js 에 배치
  // class RetryBtn extends Component {
  //   render() {
  //     return (
  //       <button className={styles.rty_btn} onClick={toWelcomeChange}>
  //         Check Others
  //       </button>
  //     );
  //   }
  // }

  // 모드 변경
  var _article = null;
  if (mode === "result") {
    _article = (
      // <div className={styles.result_zone}>
      //   <SimilarityText per="50"></SimilarityText>
      //   <div className={styles.wordcloud_zone}>
      //     <SubTitle></SubTitle>
      //     <SimilarityImg></SimilarityImg>
      //     <SimilarityDesc></SimilarityDesc>
      //   </div>
      //   {/* <RetryBtn></RetryBtn> */}
      // </div>

      // 컴포넌트로 분리해야함
      <div className={styles.result_zone}>
        <div className={styles.report_zone1}>
          <div className={styles.most_similarity}>
            <div className={styles.most_similarity_txt}>
              Highest similarity probability
            </div>
            <div className={styles.most_similarity_num}>86.53%</div>
          </div>
        </div>
        <div className={styles.report_zone2}>
          <div className={styles.similar_list}>
            <div className={styles.list_title}>
              📝 List of Similar Trademarks
            </div>
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
          </div>
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
        {/* <TitleDesc></TitleDesc> */}
      </div>

      {/* input-zone : scene1 */}
      <div className={styles.input_zone}>
        <div className={styles.category_options}>
          {/* <CategoryOptions></CategoryOptions> */}
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

      {_article}

      {/* loading-zone : scene2 - 데이터 로딩 함수 찾아보기 */}
      {/* <div className={styles.loading_zone}>
        <div className={styles.loading_effect_zone}>
          <Loading />
        </div>
        <LoadingTxt></LoadingTxt>
        
      </div> */}

      {/* result-zone : scene3  - 데이터 (유사도 퍼센트, TOP5 or 워드클라우드 이미지 ) 백에서 받아오기 */}
      {/* _article로 대체 */}
    </div>
  );
}
export default App;
