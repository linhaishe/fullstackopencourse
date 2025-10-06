import { courseParts, type CoursePart } from './data';

interface IHeaderProps {
  courseName: string;
}

interface IContentProps {
  courseParts: CoursePart[];
}

interface ITotalProps {
  totalExercises: number;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  // const courseParts = [
  //   {
  //     name: 'Fundamentals',
  //     exerciseCount: 10,
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exerciseCount: 7,
  //   },
  //   {
  //     name: 'Deeper type usage',
  //     exerciseCount: 14,
  //   },
  // ];

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
          if (v.kind === 'background') {
            return (
              <div>
                <h3>
                  {v?.name} {v?.exerciseCount}
                </h3>
                <p>{v?.description}</p>
                <p>{v?.backgroundMaterial}</p>
                <p></p>
                <br />
              </div>
            );
          } else if (v.kind === 'group') {
            return (
              <div>
                <h3>
                  {v?.name} {v?.exerciseCount}
                </h3>
                <br />
              </div>
            );
          } else if (v.kind === 'basic') {
            return (
              <div>
                <h3>
                  {v?.name} {v?.exerciseCount}
                </h3>
                <p>{v?.description}</p>
                <p></p>
                <br />
              </div>
            );
          } else if (v.kind === 'special') {
            return (
              <div>
                <h3>
                  {v?.name} {v?.exerciseCount}
                </h3>
                <p>{v?.description}</p>
                <p>
                  required skills:
                  {v?.requirements?.map?.((v, i) => (
                    <span>{v},</span>
                  ))}
                </p>
                <p></p>
                <br />
              </div>
            );
          } else {
            return assertNever(v);
          }
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
      <br />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
