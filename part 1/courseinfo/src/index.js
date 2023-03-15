import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((x) => (
        <span>
          <p>{x.name}</p>
          <p>{x.exercises}</p>
        </span>
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <div>{course.parts.reduce((sum, part) => sum + part.exercises, 0)}</div>
  );
};

const App = () => {
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
