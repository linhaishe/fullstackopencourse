import React from "react";
import ReactDOM from "react-dom";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const Header = ({ course }) => {
  console.log(course);
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const exercisesCount = course.parts.map((count) => count.exercises);
  // const reducer = (acc, cur) => acc + cur;
  // const sum = exercisesCount.reduce(reducer)

  var sum = exercisesCount.reduce((acc, cur) => acc + cur, 0);

  return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
