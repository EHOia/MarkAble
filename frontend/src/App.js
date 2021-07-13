import React, { useState, Component } from "react";
import axios from "axios";

/* import CSS */
import styles from './style.module.css';

/* import Components */
// 공통
import Title from "./components/Title";
import TitleDesc from "./components/TitleDesc";

// scene 1
import CategoryOptions from "./components/CategoryOptions"

// scene 2
import LoadingTxt from "./components/LoadingTxt";

// scene 3
import SimilarityText from "./components/SimilarityText";
import SubTitle from "./components/SubTitle";
import SimilarityImg from "./components/SimilarityImg";
import SimilarityDesc from "./components/SimilarityDesc";


function App() {

  // mode 설정 변수
  const [mode, setMode] = useState("welcome");

  // text : 현재값 / setText : 변경할 값
  const [text, setText] = useState("");
  const [number, setNumber] = useState(0);

  // 상표명 입력받는 변수
  const processText = (e) => {
    setText(e.target.value);
  };

  // 상품 카테고리 입력받는 변수
  const processNumber = (e) => {
    setNumber(e.target.value);
  };

  // (공통) input-zone 백엔드에 데이터 주기
  const sendData = () => {
    console.log('senddata'); // 확인용 >> 나중에 지우기
    setMode("result");
    let form = new FormData();
    form.append("title", text);
    form.append("category", number);

    axios
      .post(`http://127.0.0.1:5000/api/data_transmit`, form)
      .then((response) => {
        console.log("response : ", JSON.stringify(response, null, 2));
      })
      .catch((error) => {
        console.log("failed", error);
      });
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

  return (
    <div className="App">

      {/* title-zone */}
      <div className={styles.title_zone}>
        <Title></Title>
        <TitleDesc></TitleDesc>
      </div>

      {/* input-zone : scene1 */} 
      <div className={styles.input_zone}>
        <div className={styles.category_options}>
          {/* <CategoryOptions></CategoryOptions> */}
          <p>
            <select id="class" onChange={processNumber}> // onChange는 input 안의 값이 변경될 때에 발생
              <option value="">상표 분류 선택</option>
              <optgroup label="카테고리">
                <option value="1">제1류</option>
                <option value="2">제2류</option>
                <option value="3">제3류</option>
                <option value="4">제4류</option>
                <option value="5">제5류</option>
                <option value="6">제6류</option>
                <option value="7">제7류</option>
                <option value="8">제8류</option>
                <option value="9">제9류</option>
                <option value="10">제10류</option>
                <option value="11">제11류</option>
                <option value="12">제12류</option>
                <option value="13">제13류</option>
                <option value="14">제14류</option>
                <option value="15">제15류</option>
                <option value="16">제16류</option>
                <option value="17">제17류</option>
                <option value="18">제18류</option>
                <option value="19">제19류</option>
              </optgroup>
            </select>
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

      {/* loading-zone : scene2 - 데이터 로딩 함수 찾아보기 */}
      <div className={styles.loading_zone}>
        <div className={styles.loading_effect_zone}>
          <Loading />
        </div>
        <LoadingTxt></LoadingTxt>
        
      </div>

      {/* result-zone : scene3  - 데이터 (유사도 퍼센트, TOP5 or 워드클라우드 이미지 ) 백에서 받아오기 */}
      {/* props로 데이터 받아오기 */}
      <div className={styles.result_zone}>
        <SimilarityText per="50"></SimilarityText> 
        <div className={styles.wordcloud_zone}>
          <SubTitle></SubTitle>
          <SimilarityImg></SimilarityImg>
          <SimilarityDesc></SimilarityDesc>
        </div>
      </div>
    
    </div>
  );
}
export default App;
