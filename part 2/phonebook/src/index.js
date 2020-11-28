import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  console.log({ course });
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  console.log({ course });

  return (
    <div>
      <p>{course.parts[0].name}</p>
      <p>{course.parts[0].exercises}</p>
      <p>{course.parts[1].name}</p>
      <p>{course.parts[1].exercises}</p>
      <p>{course.parts[2].name}</p>
      <p>{course.parts[2].exercises}</p>
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <div>
      <p>
        {course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  // const part = ['Fundamentals of React','Using props to pass data','State of a component'];
  // const exercises = [10,7,14];

  // const course = "Half Stack application development";
  // const part1 = {
  //   name: "Fundamentals of React",
  //   exercises: 10,
  // };
  // const part2 = {
  //   name: "Using props to pass data",
  //   exercises: 7,
  // };
  // const part3 = {
  //   name: "State of a component",
  //   exercises: 14,
  // };

  // const course = "Half Stack application development";
  // const parts = [
  //   {
  //     name: "Fundamentals of React",
  //     exercises: 10,
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exercises: 7,
  //   },
  //   {
  //     name: "State of a component",
  //     exercises: 14,
  //   },
  // ];

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
