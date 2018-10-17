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
      sensor1: '',
      data: [
        {
          seq: 1,
          sensor1: 10,
          value: 10
        },
        {
          seq: 2,
          sensor1: 15,
          value: 20
        },
        {
          seq: 3,
          sensor1: 30,
          value: 30
        }
      ]
    };
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
            <div className="jumbotron text-center sensorvalue col-sm-6">
              <label htmlFor="sensor1">Sensor1 Value</label>
              <br />
              <label>{this.state.sensor1} </label>
            </div>
            <div className="jumbotron text-center sensortable col-sm-6">
              <label htmlFor="sensor6">Sensor1 Table</label>
              <br />
              <label>{this.state.sensor1} </label>
            </div>
          </div>
          <div className="jumbotron text-center sensorgraph">
            <label htmlFor="sensor1">Sensor1 Graph</label>
            <br />
            <LineChart width={400} height={400} data={this.state.data}>
              <Line type="monotone" dataKey="sensor1" stroke="#8884d8" />
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
    );
  }
}

export default App;
