import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.onChangeHostName = this.onChangeHostName.bind(this);
        this.onChangePort = this.onChangePort.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            port: ''
        }
    }
    onChangeHostName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangePort(e) {
        this.setState({
            port: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const api= {
            name: this.state.name,
            port: this.state.port
        }
        axios.post('localhost:5000/api/data_transmit ', api)
        .then(res => console.log(res.data));
        
        this.setState({
            name: '',
            port: ''
        });
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <form>
                    <div className="form-group">
                      <p stype="text-align:center;">
                        <label>상표 분류를 입력해주세요 ex)제1류  </label>
                      </p> 
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <p stype="text-align:center;">
                        <label>상표명을 입력해주세요 </label>
                      </p>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <p stype="text-align:center;">
                        <input type="submit" value="상표 유사도 확인🔎" className="btn btn-primary"/>
                      </p>
                    </div>
                </form>
            </div>
        )
    }
}