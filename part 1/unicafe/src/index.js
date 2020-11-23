import ReactDOM from 'react-dom';
import React,{ useState } from 'react'
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const Header =()=>(  
  <div>
    <h1>Give Feedback</h1>
  </div>
  )

  const Statistics =({good,neutral,bad})=>(
  <div>
    <h1>Statistics</h1>
    <h3>good: {good}</h3>
    <h3>neutral: {neutral}</h3>
    <h3>bad: {bad}</h3>
    <h3>all: {good + neutral + bad}</h3>
    <h3>average: {(good*1+neutral*0+bad*-1)/(good + neutral + bad)}</h3>
    <h3>positive: {(good/(good + neutral + bad))* 100} % </h3>

  </div>
  )

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>netural</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
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
