import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import styles from "./style.module.css";

import Title from "./components/Title";
import MostSimilarityTxt from "./components/MostSimilarityTxt";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleo } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [mode, setMode] = useState("welcome");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("undifined");
  const [list, setList] = useState("none");

  const [score, setScore] = useState(0);
  const [list1, setList1] = useState("none");
  const [list2, setList2] = useState("none");
  const [list3, setList3] = useState("none");
  const [list4, setList4] = useState("none");
  const [list5, setList5] = useState("none");

  const processText = e => {
    setText(e.target.value);
  };

  const codeText = e => {
    setCode(e.target.value);
  };

  // function validateCode(code) {
  //   var codeReg = new RegExp(/[g|s|S|G]\d{4}/);
  //   return codeReg.test(code);
  // }

  const sendData = () => {
    if (code === "") {
      alert("유사군코드가 선택되지 않았습니다.");
    } else if (text === "") {
      alert("상표명을 입력해주세요.");
      // } else if (!validateCode(code)) {
      //   alert("올바른 유사군코드를 입력해주세요.");
    } else {
      setMode("result");
      let form = new FormData();
      form.append("title", text);
      form.append("code", code);

      axios
        .post(`http://127.0.0.1:5000/trademark/api/data_transmit`, form)
        .then(response => {
          console.log("response : ", JSON.stringify(response, null, 2));

          console.log(response["data"]["results"]);

          var data_array = response["data"]["results"].split("[");
          setScore(data_array[1].split(",")[0]);

          var data_array1 = response["data"]["results"].split("'title': ");
          console.log(data_array1[1].split(",")[0]);
          setList1(data_array1[1].split(",")[0]);
          setList2(data_array1[2].split(",")[0]);
        })
        .catch(error => {
          console.log("failed", error);
        });

      // axios
      //   .get(`http://127.0.0.1:5000/trademark/api/show_data`)
      //   .then(response => {
      //     // console.log("response : ", JSON.stringify(response, null, 2));
      //     setData(response.data);
      //   })
      //   .catch(error => {
      //     console.log("failed", error);
      //   });
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
    setState("undefined");
    setText("");
    setCode("");
    setList("none");
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
      return <div className={styles.most_similarity_num}>{score}</div>;
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
          📝 List of Similar Trademarks of &nbsp;"{text}"
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
            <div className={styles.mark_name}>{list1}</div>
          </li>
          <li>
            <div className={styles.rank}>2</div>
            <div className={styles.mark_name}>{list2}</div>
          </li>
          <li>
            <div className={styles.rank}>3</div>
            <div className={styles.mark_name}>{list3}</div>
          </li>
          <li>
            <div className={styles.rank}>4</div>
            <div className={styles.mark_name}>{list4}</div>
          </li>
          <li>
            <div className={styles.rank}>5</div>
            <div className={styles.mark_name}>{list5}</div>
          </li>
        </ul>
      );
    }
  }

  const getList = () => {
    setList("obtained");
  };

  const getCode = () => {
    setMode("welcome");
    setState("defined");
    setCode("G0602"); // *****나중에 매핑테이블 오면 클릭한 글자로 가져가게 변수 바꾸기
  };

  const searchCode = () => {
    setMode("search");
  };

  var _list = null;
  if (list === "obtained") {
    _list = (
      <div>
        {/* 금속 가방
        <i onClick={getCode}>G0602</i> */}
        <div className={styles.table_block}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className={styles.th1}>류</th>
                  <th className={styles.th2}>상품명</th>
                  <th className={styles.th3}>유사군코드</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={getCode}>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">공업용콜라겐</td>
                  <td id="td3">G1001</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">의료용콜라겐</td>
                  <td id="td3">G1004</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">콜라주</td>
                  <td id="td3">G5202</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">가공된콜라드그린</td>
                  <td id="td3">G0204</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">공업용콜라겐</td>
                  <td id="td3">G1001</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">의료용콜라겐</td>
                  <td id="td3">G1004</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">콜라주</td>
                  <td id="td3">G5202</td>
                </tr>
                <tr>
                  <td className={styles.td1} id="td1">
                    1
                  </td>
                  <td id="td2">가공된콜라드그린</td>
                  <td id="td3">G0204</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  var _post = null;
  _post = (
    <button className={styles.code_inquery} onClick={searchCode}>
      <FontAwesomeIcon icon={faCircle} />
      유사군코드 조회
    </button>
  );

  if (state === "defined") {
    _post = (
      <span className={styles.code_complete}>
        <FontAwesomeIcon icon={faCircle} className="circle" />
        {code}
      </span>
    );
  }

  var _article = null;
  if (mode === "result") {
    _article = <ResultZone></ResultZone>;
  }

  if (mode === "welcome") {
    _article = (
      <div className={styles.input_zone}>
        {/* <div className={styles.category_options}>
          <p>
            <input
              className={styles.category_input}
              type="text"
              placeholder="유사군코드 입력"
              value={code}
              onChange={codeText} // onChange는 input 안의 값이 변경될 때에 발생
            />
          </p>
        </div> */}
        <div className={styles.similarity_check_btn}>
          <p>{_post}</p>
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

  if (mode == "search") {
    _article = (
      <div>
        <div className={styles.input_zone}>
          <div className={styles.input_name}>
            <p>
              <input type="text" placeholder="상품 명칭을 입력하세요." />
            </p>
          </div>
          <div className={styles.similarity_check_btn}>
            <p>
              <button onClick={getList}>유사군코드 조회</button>
            </p>
          </div>
        </div>
        <div className={styles.list_zone}>{_list}</div>
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
