import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeDuration(e) {
    this.setState({ duration: e.target.value });
  }

  onChangeDate(date) {
    this.setState({ date: date });
  }

  onSubmit(e) {
    e.preventDefault(); // prevents the default HTML form submit behavior from taking place
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);
    axios
      .post("/exercises/add", exercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  }

  render() {
    return (
      <div className='container'>
        <h1>Create Exercise</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username:</label>
            <select
              className='form-control'
              required
              /*   ref='userInput' */
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Description:</label>
            <input
              className='form-control'
              type='text'
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className='form-group'>
            <label>Duration (in minutes):</label>
            <input
              className='form-control'
              type='text'
              required
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className='form-group'>
            <label>Date:</label>
            <div className=''>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className='form-group'>
            <input type='submit' className='btn btn-dark' value='Create' />
          </div>
        </form>
      </div>
    );
  }
}
