import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from 'recharts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sensor1: 0,
      sensor1alldata: [],
      errors: ''
    };
  }

  dofilter(inarray) {
    var array = [];
    var i = 0;
    inarray.forEach(obj => {
      array.push({
        seq: ++i,
        value: obj.value
      });
    });
    this.setState({ sensor1alldata: array });
  }

  componentDidMount() {
    setInterval(() => {
      axios
        .get('/getsensor1')
        .then(result => {
          this.setState({ sensor1: result.data });
        })
        .catch(err => {
          this.setState({ errors: err.response.data });
        });
    }, 3000);
    setInterval(() => {
      axios
        .get('/getallsensor1')
        .then(result => {
          this.dofilter(result.data);
        })
        .catch(err => {
          this.setState({ errors: err.response.data });
        });
    }, 5000);
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center header">
          <h1>Sensor Data</h1>
          <p>Displays sensor data received from NodeMCU</p>
        </div>

        <div className="container">
          <div className="row">
            <div className="text-center col-sm-6">
              <div className="sensorvalue">
                <label>Sensor1 Value</label>
                <br />
                <label>{this.state.sensor1} </label>
              </div>
            </div>
            <div className="text-center col-sm-6">
              <div className="sensortable">
                <label>Sensor1 Table</label>
                <br />
                <label>{this.state.sensor1} </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="dummy">
              <label> </label>
            </div>
          </div>

          <div className="row mt-5">
            <div className="text-center col-sm-12">
              <div className="sensorgraph">
                <label>Sensor1 Graph</label>
                <br />
                <LineChart
                  width={800}
                  height={400}
                  data={this.state.sensor1alldata}
                >
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  <XAxis dataKey="seq">
                    <Label position="insideBottomRight" dy={10}>
                      Sequence
                    </Label>
                  </XAxis>
                  <YAxis dataKey="value">
                    <Label position="insideTopLeft" dx={-10}>
                      Value
                    </Label>
                  </YAxis>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
