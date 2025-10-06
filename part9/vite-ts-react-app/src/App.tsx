interface IHeaderProps {
  courseName: string;
}

interface IContentProps {
  courseParts: { name: string; exerciseCount: number }[];
}

interface ITotalProps {
  totalExercises: number;
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const Header = (props: IHeaderProps) => {
    return <h1>{props?.courseName}</h1>;
  };

  const Content = (props: IContentProps) => {
    return (
      <div>
        {props?.courseParts?.map((v, index) => {
          return (
            <p>
              {v.name} {v.exerciseCount}
            </p>
          );
        })}
      </div>
    );
  };

  const Total = (props: ITotalProps) => {
    return <p>Number of exercises {props?.totalExercises || 0}</p>;
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
