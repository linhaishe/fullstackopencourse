import ReactDOM from 'react-dom';
import React,{ useState } from 'react'
import './index.css';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const Header =()=>(  
  <div>
    <h1>Give Feedback</h1>
  </div>
  )

  const Statistics =({good,neutral,bad})=>{
    const feedbackValue = good+neutral+bad
    console.log(feedbackValue);
    const hasFeed = feedbackValue<=0?'none':'block'
    const noFeed = feedbackValue>0?'none':'block'
    return (
      <div>
        <h1>Statistics 1.9</h1>
        <h3>good {good}</h3>
        <h3>neutral {neutral}</h3>
        <h3>bad {bad}</h3>
        <h3>all {good + neutral + bad}</h3>
        <h3 style={{ display: hasFeed }}>average {(good*1+neutral*0+bad*-1)/(good + neutral + bad)}</h3>
        <h3 style={{ display: hasFeed }}>positive {(good/(good + neutral + bad))* 100} % </h3>
        <h3 style={{ display: noFeed }}>no feedback given</h3>
      </div>
      )
  }

  const Header2 =()=>(
    <div>
      <h1>Statistics 1.10</h1>
    </div>
  )

  const Statistics2 =({good,neutral,bad,text,value})=>{
    //calculate AVERAGE AND POSOTIVE
    const feedbackValue = good+neutral+bad
    console.log(feedbackValue);
    const hasFeed2 = feedbackValue<=0?'none':'block'
    // const noFeed2 = feedbackValue>0?'none':'block'

    return(
<>
    {/* <Table responsive="sm">
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
</Table> */}
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>{text}</th>
      <th>{value}</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>{text}</td>
      <td>{value}</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
</>
    )
  }

  const FeedbackText =({good,neutral,bad,text,value})=>{
    const feedbackValue = good+neutral+bad
    console.log(feedbackValue);
    // const hasFeed2 = feedbackValue<=0?'none':'block'
    const noFeed2 = feedbackValue>0?'none':'block'
return (
  <h3 style={{ display: noFeed2 }}>no feedback given</h3>

)
  }
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good*1+neutral*0+bad*-1)/(good + neutral + bad)
  const positive = (good/(good + neutral + bad))* 100 + "%"
  return (
    <div>
      <Header/>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>netural</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>

      <Header2/>
      <Statistics2 text="good" value ={good}/>
      <Statistics2 text="neutral" value ={neutral}/>
      <Statistics2 text="bad" value ={bad}/>
      <Statistics2 text="all" value ={all}/>
      <Statistics2 text="average" value ={average} good={good} neutral={neutral} bad={bad}/>
      <Statistics2 text="positive" value ={positive} good={good} neutral={neutral} bad={bad}/>
      <FeedbackText good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
