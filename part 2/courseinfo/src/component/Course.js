import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      {/* <Total/> */}
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

// const Total = ({ parts }) => {
// const exercisesCount = courseArr.parts.map((count) => count.exercises);
// const reducer = (acc, cur) => acc + cur;
// const sum = exercisesCount.reduce(reducer)
// var sum = exercisesCount.reduce((acc, cur) => acc + cur, 0);
//   return <p>Number of exercises </p>;
// };

const Part = ({ parts }) => {
  const sum = parts.map((x) => x.exercises).reduce((a, b) => a + b, 0);

  return (
    <>
      {parts.map((ele) => (
        <div key={ele.id}>
          <p>
            {ele.name} {ele.exercises}
          </p>
        </div>
      ))}
      {<b>total of {sum} exercises</b>}
    </>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.map((el) => (
        <div key={el.id}>
          <h1>{el.name}</h1>
          {/* course.parts的内容传给Part组件，单独拿是拿不到的，遍历过后拿到数据再传给组件 */}
          <Part parts={el.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
