import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td> {props.exercise.username} </td>
    <td> {props.exercise.description} </td>
    <td> {props.exercise.duration} </td>
    <td> {props.exercise.date} </td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>
        <i className='fa fa-pencil'></i> Edit
      </Link>{" "}
      |{" "}
      <a
        href='#'
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        <i className='fa fa-trash' style={{ color: "red" }}></i> Delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    axios
      .get("/exercises")
      .then((res) => this.setState({ exercises: res.data }))
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete(`/exercises/${id}`)
      .then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exercisesList() {
    return this.state.exercises.map((exercise) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          key={exercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div className='container'>
        <h1>Exercises List</h1>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
