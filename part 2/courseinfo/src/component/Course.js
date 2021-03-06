import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      {/* <Total course={course} /> */}
    </>
  );
};

const Header = ({ course }) => {
  console.log("Header", { course });
  return <h1>{course.name}</h1>;
};

// const Total = ({ parts }) => {
//   console.log("part22222", { parts });

// const exercisesCount = courseArr.parts.map((count) => count.exercises);
// const reducer = (acc, cur) => acc + cur;
// const sum = exercisesCount.reduce(reducer)

// var sum = exercisesCount.reduce((acc, cur) => acc + cur, 0);

//   return <p>Number of exercises </p>;
// };

const Part = ({ parts }) => {
  console.log("parts111", { parts });
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
  console.log("content", course[0].parts[0].name);
  // const partName = course.parts.map((part) => part.name);
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
