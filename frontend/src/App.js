import './App.css';
import React from 'react';

function App() {
  
    return (
    <div className="App">
      <p stype="text-align:center;">
        <h1>Welcome Trademark Verification</h1>
      </p>
      <p>
        <select  id="class">
          <optgroup label="상표 분류 선택">
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
      <p>
          <input type="text" placeholder="상표명 입력"/>
      </p>
      <p>
        <button>
          상표 유사도 확인
        </button>
      </p>
    </div>
  );
}

export default App;
