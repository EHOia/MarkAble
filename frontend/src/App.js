import React, { useState, Component } from "react";
import axios from "axios";

import styles from "./style.module.css";

import Title from "./components/Title";
import MostSimilarityTxt from "./components/MostSimilarityTxt";
import Loading from "./components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [mode, setMode] = useState("welcome");
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState("undifined");
  const [list, setList] = useState("none");
  const [loading, setLoading] = useState("true");

  const [score, setScore] = useState("");
  const [list1, setList1] = useState("none");
  const [list2, setList2] = useState("none");
  const [list3, setList3] = useState("none");
  const [list4, setList4] = useState("none");
  const [list5, setList5] = useState("none");

  const [keyword, setKeyword] = useState("");
  // const [keyword_code, setKeywordCode] = useState("");

  const [category1, setCategory1] = useState("");
  const [name1, setName1] = useState("");
  const [similar_code1, setSimilarCode1] = useState("");
  const [category2, setCategory2] = useState("");
  const [name2, setName2] = useState("");
  const [similar_code2, setSimilarCode2] = useState("");
  const [category3, setCategory3] = useState("");
  const [name3, setName3] = useState("");
  const [similar_code3, setSimilarCode3] = useState("");
  const [category4, setCategory4] = useState("");
  const [name4, setName4] = useState("");
  const [similar_code4, setSimilarCode4] = useState("");
  const [category5, setCategory5] = useState("");
  const [name5, setName5] = useState("");
  const [similar_code5, setSimilarCode5] = useState("");
  const [category6, setCategory6] = useState("");
  const [name6, setName6] = useState("");
  const [similar_code6, setSimilarCode6] = useState("");
  const [category7, setCategory7] = useState("");
  const [name7, setName7] = useState("");
  const [similar_code7, setSimilarCode7] = useState("");
  const [category8, setCategory8] = useState("");
  const [name8, setName8] = useState("");
  const [similar_code8, setSimilarCode8] = useState("");
  const [category9, setCategory9] = useState("");
  const [name9, setName9] = useState("");
  const [similar_code9, setSimilarCode9] = useState("");
  const [category10, setCategory10] = useState("");
  const [name10, setName10] = useState("");
  const [similar_code10, setSimilarCode10] = useState("");

  const processText = e => {
    setText(e.target.value);
  };

  const processKeyword = e => {
    setKeyword(e.target.value);
  }

  const onKeyPress1 = (e) => {
    if (e.key === 'Enter'){
      sendData();
    }
  }

  const onKeyPress2 = (e) => {
    if (e.key === 'Enter'){
      getList();
    }
  }
  // const codeText = e => {
  //   setCode(e.target.value);
  // };

  const sendData = () => {
    if (code === "") {
      alert("유사군코드가 선택되지 않았습니다.");
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

          console.log(response["data"]["results"]);
          var data_split = JSON.stringify(response["data"]["results"]);
          console.log(data_split);

          setScore("");
          setList1("none");
          setList2("none");
          setList3("none");
          setList4("none");
          setList5("none");

          setLoading(false);

          var score_split = data_split.split("score");
          if (score_split[1].split(",")[0].split("[")[1].split("]")[0] === ""){
            setScore("No Similar Name");
          }
          else {
            setScore(score_split[1].split(",")[0].split("[")[1].split("]")[0]);
          }

          var list_split = data_split.split("title");

          if (text === list_split[1].split(",")[0].split(":")[1].split("}")[0].split("\"")[1]){
            setList1("none");
          } else {
            setList1(list_split[1].split(",")[0].split(":")[1].split("}")[0]);
          }
          
          setList2(list_split[2].split(",")[0].split(":")[1].split("}")[0]);
          setList3(list_split[3].split(",")[0].split(":")[1].split("}")[0]);
          setList4(list_split[4].split(",")[0].split(":")[1].split("}")[0]);
          setList5(list_split[5].split(",")[0].split(":")[1].split("}")[0]);
        })
        .catch(error => {
          console.log("failed", error);
        });

    }
  };

  const toWelcomeChange = () => {
    setMode("welcome");
    setState("undefined");
    setText("");
    setCode("");
    setList("none");
    setLoading("true")
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
    setLoading(true);
    setList("obtained");
    let keywordform = new FormData();
    keywordform.append("keyword", keyword);

      axios
        .post(`http://127.0.0.1:5000/trademark/api/keyword_transmit`, keywordform)
        .then(response => {
          console.log("response : ", JSON.stringify(response, null, 2));

          console.log(response);

          setCategory1("");
          setName1("");
          setSimilarCode1("");
          setCategory2("");
          setName2("");
          setSimilarCode2("");
          setCategory3("");
          setName3("");
          setSimilarCode3("");
          setCategory4("");
          setName4("");
          setSimilarCode4("");
          setCategory5("");
          setName5("");
          setSimilarCode5("");
          setCategory6("");
          setName6("");
          setSimilarCode6("");
          setCategory7("");
          setName7("");
          setSimilarCode7("");
          setCategory8("");
          setName8("");
          setSimilarCode8("");
          setCategory9("");
          setName9("");
          setSimilarCode9("");
          setCategory10("");
          setName10("");
          setSimilarCode10("");

          var data_split = JSON.stringify(response["data"]["results"]);
          
          setCategory1(data_split.split("category")[1].split(",")[0].split("\"")[2]);
          setName1(data_split.split("name")[1].split(",")[0].split("\"")[2]);
          setSimilarCode1(data_split.split("similiar_code")[1].split(",")[0].split("\"")[2]);

          setCategory2(data_split.split("category")[2].split(",")[0].split("\"")[2]);
          setName2(data_split.split("name")[2].split(",")[0].split("\"")[2]);
          setSimilarCode2(data_split.split("similiar_code")[2].split(",")[0].split("\"")[2]);

          setCategory3(data_split.split("category")[3].split(",")[0].split("\"")[2]);
          setName3(data_split.split("name")[3].split(",")[0].split("\"")[2]);
          setSimilarCode3(data_split.split("similiar_code")[3].split(",")[0].split("\"")[2]);

          setCategory4(data_split.split("category")[4].split(",")[0].split("\"")[2]);
          setName4(data_split.split("name")[4].split(",")[0].split("\"")[2]);
          setSimilarCode4(data_split.split("similiar_code")[4].split(",")[0].split("\"")[2]);

          setCategory5(data_split.split("category")[5].split(",")[0].split("\"")[2]);
          setName5(data_split.split("name")[5].split(",")[0].split("\"")[2]);
          setSimilarCode5(data_split.split("similiar_code")[5].split(",")[0].split("\"")[2]);

          setCategory6(data_split.split("category")[6].split(",")[0].split("\"")[2]);
          setName6(data_split.split("name")[6].split(",")[0].split("\"")[2]);
          setSimilarCode6(data_split.split("similiar_code")[6].split(",")[0].split("\"")[2]);

          setCategory7(data_split.split("category")[7].split(",")[0].split("\"")[2]);
          setName7(data_split.split("name")[7].split(",")[0].split("\"")[2]);
          setSimilarCode7(data_split.split("similiar_code")[7].split(",")[0].split("\"")[2]);

          setCategory8(data_split.split("category")[8].split(",")[0].split("\"")[2]);
          setName8(data_split.split("name")[8].split(",")[0].split("\"")[2]);
          setSimilarCode8(data_split.split("similiar_code")[8].split(",")[0].split("\"")[2]);

          setCategory9(data_split.split("category")[9].split(",")[0].split("\"")[2]);
          setName9(data_split.split("name")[9].split(",")[0].split("\"")[2]);
          setSimilarCode9(data_split.split("similiar_code")[9].split(",")[0].split("\"")[2]);

          setCategory10(data_split.split("category")[10].split(",")[0].split("\"")[2]);
          setName10(data_split.split("name")[10].split(",")[0].split("\"")[2]);
          setSimilarCode10(data_split.split("similiar_code")[10].split(",")[0].split("\"")[2]);

          setLoading(false);
        })
        .catch(error => {
          console.log("failed", error);
          setCategory1("");
          setName1("");
          setSimilarCode1("");
          setCategory2("");
          setName2("");
          setSimilarCode2("");
          setCategory3("");
          setName3("");
          setSimilarCode3("");
          setCategory4("");
          setName4("");
          setSimilarCode4("");
          setCategory5("");
          setName5("");
          setSimilarCode5("");
          setCategory6("");
          setName6("");
          setSimilarCode6("");
          setCategory7("");
          setName7("");
          setSimilarCode7("");
          setCategory8("");
          setName8("");
          setSimilarCode8("");
          setCategory9("");
          setName9("");
          setSimilarCode9("");
          setCategory10("");
          setName10("");
          setSimilarCode10("");
        });
  };

  const getCode1 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code1);
  };

  const getCode2 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code2);
  };

  const getCode3 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code3);
  };

  const getCode4 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code4);
  };

  const getCode5 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code5);
  };

  const getCode6 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code6);
  };

  const getCode7 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code7);
  };

  const getCode8 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code8);
  };

  const getCode9 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code9);
  };

  const getCode10 = () => {
    setMode("welcome");
    setLoading(true);
    setState("defined");
    setCode(similar_code10);
  };

  const searchCode = () => {
    setMode("search");
    setKeyword("");
  };

  var _list = null;
  if (list === "obtained") {
    _list = (
      <div>
        {loading ? <Loading /> :
        <div className={styles.table_block}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className={styles.th1}>Category</th>
                  <th className={styles.th2}>Name</th>
                  <th className={styles.th3}>Similar group code</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr onClick={getCode, setSimilarCode({similar_code1})}>
                 */}
                 <tr onClick={getCode1}>
                  <td className={styles.td1} id="td1">
                    {category1}
                  </td>
                  <td className={styles.td2} id="td2">{name1}</td>
                  <td className={styles.td3} id="td3">{similar_code1}</td>
                </tr>
                <tr onClick={getCode2}>
                  <td className={styles.td1} id="td1">
                  {category2}
                  </td>
                  <td className={styles.td2} id="td2">{name2}</td>
                  <td className={styles.td3} id="td3">{similar_code2}</td>
                </tr>
                <tr onClick={getCode3}>
                  <td className={styles.td1} id="td1">
                  {category3}
                  </td>
                  <td className={styles.td2} id="td2">{name3}</td>
                  <td className={styles.td3} id="td3">{similar_code3}</td>
                </tr>
                <tr onClick={getCode4}>
                  <td className={styles.td1} id="td1">
                  {category4}
                  </td>
                  <td className={styles.td2} id="td2">{name4}</td>
                  <td className={styles.td3} id="td3">{similar_code4}</td>
                </tr>
                <tr onClick={getCode5}>
                  <td className={styles.td1} id="td1">
                  {category5}
                  </td>
                  <td className={styles.td2} id="td2">{name5}</td>
                  <td className={styles.td3} id="td3">{similar_code5}</td>
                </tr>
                <tr onClick={getCode6}>
                  <td className={styles.td1} id="td1">
                  {category6}
                  </td>
                  <td className={styles.td2} id="td2">{name6}</td>
                  <td className={styles.td3} id="td3">{similar_code6}</td>
                </tr>
                <tr onClick={getCode7}>
                  <td className={styles.td1} id="td1">
                  {category7}
                  </td>
                  <td className={styles.td2} id="td2">{name7}</td>
                  <td className={styles.td3} id="td3">{similar_code7}</td>
                </tr>
                <tr onClick={getCode8}>
                  <td className={styles.td1} id="td1">
                  {category8}
                  </td>
                  <td className={styles.td2} id="td2">{name8}</td>
                  <td className={styles.td3} id="td3">{similar_code8}</td>
                </tr>
                <tr onClick={getCode9}>
                  <td className={styles.td1} id="td1">
                  {category9}
                  </td>
                  <td className={styles.td2} id="td2">{name9}</td>
                  <td className={styles.td3} id="td3">{similar_code9}</td>
                </tr>
                <tr onClick={getCode10}>
                  <td className={styles.td1} id="td1">
                  {category10}
                  </td>
                  <td className={styles.td2} id="td2">{name10}</td>
                  <td className={styles.td3} id="td3">{similar_code10}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  }
      </div>
    );
  }

  var _post = null;
  var _circle = null;
  _post = (
    <button className={styles.code_inquery} onClick={searchCode}>
      
      유사군코드 조회
      <FontAwesomeIcon icon={faCheckCircle} />
    </button>
  );

  _circle = (
    <FontAwesomeIcon icon={faCheckCircle} /> 
  )

  if (text === "") {
    _circle = (
    <FontAwesomeIcon icon={faCheckCircle} /> 
  )
  }
  else {
    _circle = (
    <span className={styles.green_circle}>
      <FontAwesomeIcon icon={faCheckCircle} /> 
    </span>
  )
  }

  if (state === "defined") {
    _post = (
      <span className={styles.code_complete}>
        
        {code}
        <FontAwesomeIcon icon={faCheckCircle} className="circle" />
      </span>
    );
  }

  var _article = null;
  if (mode === "result") {
    _article = (
    <div>
      {loading ? <Loading /> : 
      <ResultZone />}
    </div>
    );
  }

  if (mode === "welcome") {
    _article = (
      <div className={styles.input_zone}>
        <div className={styles.similarity_check_btn}>
          <p>{_post}</p>
        </div>
        <div className={styles.input_name}>
          <p>
            <input
              type="text"
              placeholder="상표명 입력"
              value={text}
              onKeyPress={onKeyPress1}
              onChange={processText} 
            /> 
            {/* <FontAwesomeIcon icon={faCheckCircle} />  */}
            {_circle}
          </p>
        </div>
        <div className={styles.similarity_check_btn}>
          <p>
            <button onClick={sendData}>유사도검사</button>
          </p>
        </div>
      </div>
    );
  }

  if (mode === "search") {
    _article = (
      <div>
        <div className={styles.input_zone}>
          <div className={styles.input_name}>
            <p>
              <input type="text" value={keyword}
              onKeyPress={onKeyPress2}
              onChange={processKeyword} placeholder="상품 명칭 입력" />
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
