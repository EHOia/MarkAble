// import React, { useState, Component } from 'react';
// import axios from "axios";

// /* import CSS */
// import styles from '../style.module.css';

// class CategoryOptions extends Component {
//     render() {

//         const [number, setNumber] = useState(0);

//         const processNumber = (e) => {
//             setNumber(e.target.value);
//           };

//           const sendData = () => {
//             let form = new FormData();
//             form.append("title", text);
//             form.append("category", number);
        
//             axios
//               .post(`http://127.0.0.1:5000/api/data_transmit`, form)
//               .then((response) => {
//                 console.log("response : ", JSON.stringify(response, null, 2));
//               })
//               .catch((error) => {
//                 console.log("failed", error);
//               });
//           };

//       return(
//         <p>
//             <select id="class" onChange={processNumber}>
//               <option value="">상표 분류 선택</option>
//               <optgroup label="카테고리">
//                 <option value="1">제1류</option>
//                 <option value="2">제2류</option>
//                 <option value="3">제3류</option>
//                 <option value="4">제4류</option>
//                 <option value="5">제5류</option>
//                 <option value="6">제6류</option>
//                 <option value="7">제7류</option>
//                 <option value="8">제8류</option>
//                 <option value="9">제9류</option>
//                 <option value="10">제10류</option>
//                 <option value="11">제11류</option>
//                 <option value="12">제12류</option>
//                 <option value="13">제13류</option>
//                 <option value="14">제14류</option>
//                 <option value="15">제15류</option>
//                 <option value="16">제16류</option>
//                 <option value="17">제17류</option>
//                 <option value="18">제18류</option>
//                 <option value="19">제19류</option>
//               </optgroup>
//             </select>
//           </p>
//       )
//     }
//   }

        

// export default CategoryOptions;