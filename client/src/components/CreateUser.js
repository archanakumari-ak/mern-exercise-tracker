import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);
    axios.post("/users/add", user).then((res) => console.log(res.data));
    window.location = "/";
  }

  render() {
    return (
      <div className='container'>
        <h1>Create User</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username:</label>
            <input
              className='form-control'
              type='text'
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className='form-group'>
            <input type='submit' className='btn btn-dark' value='Create' />
          </div>
        </form>
      </div>
    );
  }
}
