import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomInt = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
  //不含最大值，含最小值
}

const Votes = ({voteCount}) => {
  if (voteCount === 1) {
    return (
      <div>has 1 vote</div>
    )
  }

  return (
    <div>has {voteCount} votes</div>
  )
}


//投票累计
// const anecdotesVote = function(){
//   const ary = new Uint8Array(10);
//   const copy = [...ary];
//   copy[selected]+=1
// }

const AnecdotesItem =({selected,voted,setVoted,copy})=>{
  console.log('格言',anecdotes[selected])

  return <div>
    
  <p>{anecdotes[selected]}</p>
  </div>
  
}

  //vote array
  const ary = new Uint8Array(6);
  const copy = [...ary];
  //不能自动加1，需要在按钮按下之后才加1


  console.log('votearray',copy)


const App = () => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(0)
  // copy[selected]+=1
  //我需要将VOTE按钮触发=投票数增加=为出现的箴言投票 = voted+1
  //q:投票数量未根据箴言进行变化，而是在原有的基础上不断增加

  //需要vote的数量根据箴言进行显示...?????
  //将VOTE放在一个数组里，根据 数组[SELECTED] 可输出投票数，

  //此时，可得到 箴言序列+投票数量
  //记录投票数量，放进ARRAY中保存
  //用数组显示投票数量

  return (
    <div>
      <AnecdotesItem selected={selected} voted={voted} setVoted={setVoted} copy={copy}/>
      <Votes voteCount={votes[selected]}/>
      <button onClick={()=>setVoted(voted+1)}>vote</button>
      <button onClick={()=>setSelected(getRandomInt(0,6))}>next anecdotes</button>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
