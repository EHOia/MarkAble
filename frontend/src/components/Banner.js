import React, { Component } from "react";

import SearchImg from '../images/search_img.png';
import AiImg from '../images/ai_img.png';
import ClockImg from '../images/clock_img.png';
import ReportImg from '../images/report_img.png';

import styles from "../style.module.css";

var img_size = '40';
class Banner extends Component {
    render() {
        return (
            <div className={styles.banner}>
                <table className={styles.table}>
                    <tr>
                        <td>
                        <img 
                        src={SearchImg}
                        width= {img_size}
                        height= {img_size} />
                        <p>24시간 검색가능</p>
                        </td>
                        <td>
                        <img
                        src={AiImg}
                        width= {img_size}
                        height= {img_size} />
                        <p>상표 전문 Mark AI</p>
                        </td>
                        <td>
                        <img 
                        src={ClockImg}
                        width= {img_size}
                        height= {img_size} />
                        <p>5분내 예측완료</p>
                        </td>
                        <td>
                        <img
                        src={ReportImg}
                        width= {img_size}
                        height= {img_size} />
                        <p>Report 제공</p>
                        </td>
                    </tr>
                </table>
                
            </div>
        );
    }
}

export default Banner;