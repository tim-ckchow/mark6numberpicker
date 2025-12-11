import { useState } from 'react'
import './App.css'

function App() {
  const [listOflistofNumbers, setListOfListOfNumbers] = useState<number[][]>([]);
  const [luckyNumbers, setLuckyNumbers] = useState(0);
  //create and init a list that has 1 - 49 numbers
  const poolNumbers: number[] = [];
  for (let i = 1; i <= 49; i++) {
    poolNumbers.push(i);
  }

  const shuffleNumbers = (list: number[]) => {
    //shuffle the numbers array
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
  }

  const generateNumbers = () => {
      let tmpList: number[] = [...poolNumbers];
      shuffleNumbers(tmpList);
      const randomIndex = Math.floor(Math.random() * tmpList.length);
    const currLuckynumber =  tmpList[randomIndex]; 
    setLuckyNumbers(luckynumber);
      tmpList.splice(randomIndex, 1);
      const tmpListOfListOfNumbers: number[][] = [];
      for (let i = 0; i < 6; i++) {
        const listOfNumbers: number[] = [];
        for (let j = 0; j < 6; j++) {
          const randomIndex = Math.floor(Math.random() * tmpList.length);
          listOfNumbers.push(tmpList[randomIndex]);
          tmpList.splice(randomIndex, 1);
        }
        listOfNumbers.sort((a, b) => a - b);
        tmpListOfListOfNumbers.push(listOfNumbers);
      }
      tmpList = poolNumbers.filter(num => num !== luckyNumbers);
      //7th list use lucky number and random
      shuffleNumbers(tmpList);
      const seventhList: number[] = [currLuckynumber];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * tmpList.length);
        seventhList.push(tmpList[randomIndex]);
        tmpList.splice(randomIndex, 1);
      }
      seventhList.sort((a, b) => a - b);
      tmpListOfListOfNumbers.push(seventhList);
      setListOfListOfNumbers(tmpListOfListOfNumbers);
      
  }
  return (
    <>
      <div className="App">
        <h1>Mark 6 Number Generator</h1>
        <button onClick={generateNumbers}>Generate Lucky Number</button>
    
        {listOflistofNumbers.length > 0 && (
          <div>
            <h2>Lucky Number: {luckyNumbers}</h2>
            {listOflistofNumbers.map((list, index) => (
              <div key={index}>
                <h3>Set {index + 1}:</h3>
                <p>{list.join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
