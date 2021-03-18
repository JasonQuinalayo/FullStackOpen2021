import React, { useState } from 'react'

const Button = ({ handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Buttons = ({ feedbacks }) => (
  <>
  {
    Object
    .keys(feedbacks)
    .map(a=>
    (<Button key={feedbacks[a].text}handleClick={feedbacks[a].setter} text={feedbacks[a].text}/>))
  }
  </>
)
const Statistic = ({ text, value }) => (
  <tr><td>{text}</td><td>{parseFloat(value.toFixed(3))}</td></tr>
)
const Statistics = ({ feedbacks }) => {
  const {good, neutral, bad} = feedbacks;
  const sum = good.val + neutral.val + bad.val;
  const average = (good.val - bad.val) / sum;
  const positive = good.val / sum;
  const statistics = [
    ...(Object.keys(feedbacks).map((key) => ({text:feedbacks[key].text, value:feedbacks[key].val}))),
    {text:'all', value:sum},
    {text:'average', value:average},
    {text:'positive', value:positive}
  ]
  return (
    <>
    <h1>statistics</h1>
    { sum === 0 
      ? <span>No feedback given</span>
      :(
      <table>
        <tbody>
          {statistics.map((element) => (<Statistic key={element.text} text={element.text} value={element.value}/>))}
        </tbody>
      </table>
      )
    }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedbacks= {
    good: {text: "good", val: good, setter:() => setGood(good + 1)},
    neutral: {text: "neutral", val: neutral, setter:() => setNeutral(neutral + 1)},
    bad: {text: "bad", val: bad, setter:() =>  setBad(bad + 1)}
  }

  return (
    <>
      <h1>give feedback</h1>
      <Buttons feedbacks={feedbacks} />
      <Statistics feedbacks={feedbacks} />
    </>
  )
}

export default App