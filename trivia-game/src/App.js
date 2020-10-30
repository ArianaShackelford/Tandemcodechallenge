
import './App.css';
import React, {useState} from 'react';
import jsonData from './data/Apprentice_TandemFor400_Data.json';


function App() {
  
const [curQuest, setCurQuest] = useState(0);
const [points, setPoints] = useState(0);
const [showPoints, setShowPoints] = useState(false);
const [answered, setAnswered] = useState(false);

const shuffleAns = (ans) =>{
  var curIndex = ans.length, tempVal, randIn;
  while (0 !== curIndex){
    randIn = Math.floor(Math.random() * curIndex);
    curIndex -= 1;
    tempVal = ans[curIndex];
    ans[curIndex] = ans[randIn];
    ans[randIn] = tempVal;

  }
  return ans
}
const current = jsonData[curQuest]
const answers = shuffleAns([...current.incorrect, current.correct])
const answOpt = answers.map((option) => option)

const handleAnswer = (answer) => {
  setAnswered(true);
  if (answer === current.correct){
    setPoints(points + 1)
    console.log('answer',answer)
  }
  const nextQuest = curQuest + 1;
  if (nextQuest < jsonData.length){
    setTimeout( () => {
      setAnswered(false)
      setCurQuest(nextQuest)
    },1000);
  }else{
    setShowPoints(true)
  }

}

  return (
    <>
      <div className='App'>
        {showPoints ? (
        <div className='scorecard'>🎉  You scored {points} out of {jsonData.length} trivia questions! 🎉</div>
      ):(
        <>
        <h1 className='title'>Trivia Game</h1>
      <h2>{curQuest + 1}/{jsonData.length}</h2>
        <div className='question'>{current.question}</div>
        <div className='btnbox'>
        { answOpt.map((answer, i) => {
         return (<button className='answerbtn' onClick={() => handleAnswer(answer, i)} key={i}>{answer}</button>
        )})}
        </div>
        {answered ? (
          <h3>{current.correct}</h3>
        ):(
          <h5>The correct Answer will show here</h5>
        )}
        
      </>
      )}
    
    </div>
    </>

  );
}

export default App;
