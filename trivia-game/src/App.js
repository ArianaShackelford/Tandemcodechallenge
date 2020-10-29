
import './App.css';
import React, {useState} from 'react';
import jsonData from './data/Apprentice_TandemFor400_Data.json';


function App() {
const loadData = () => JSON.parse(JSON.stringify(jsonData));
const triviaList = loadData()

//map through results of loadData and display questions
const [curQuest, setCurQuest] = useState(0);
const [points, setPoints] = useState(0);
// const [answers, setAnswer] = useState([])

const shuffleAns = (ans) =>{
  let curIndex = ans.length, tempVal, randIn;
  
  while (0 !== curIndex){
    randIn = Math.floor(Math.random() * curIndex);
    curIndex -= 1;
    tempVal = ans[curIndex];
    ans[curIndex] = ans[randIn];
    ans[randIn] = tempVal;
  }
  return ans
}

const answers = triviaList[curQuest].incorrect.concat(triviaList[curQuest].correct)
// console.log(answers)

const answOpt = answers.map((option) => option)
const correct = triviaList[curQuest].correct
// console.log('correct',correct)


const handleAnswer = (answer) => {
  // console.log()
  if (toString(answer) === toString(correct)){
    setPoints(points + 1)
  }
  const nextQuest = curQuest + 1;
  setCurQuest(nextQuest);
}
// console.log('score', points)
// console.log('answers', answers)
// console.log('answer options', answOpt)
console.log('incorrect', triviaList[curQuest])
  return (
    <>
    <div>Trivia Game</div>
    <div>{triviaList[curQuest].question}</div>
    <div>
    { answOpt.map((answer, i) => {
    return (<button onClick={handleAnswer(answer)} key={i}>{answer}</button>
    )
    })}
    </div>
    </>

  );
}

export default App;
