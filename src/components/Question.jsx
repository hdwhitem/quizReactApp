import Answer from "./Answer"
import { useContext, useRef } from "react"
import { QuizContext } from "../contexts/quiz"
import { useState } from "react";
import { useEffect } from "react";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
  const [progressBar, setProgressBar] = useState(quizState.progressBar)
  const [seconds, setSeconds] = useState(0)

  useEffect( ()=>{
    const interval = setInterval(()=>{
      if(seconds < 5){
        setProgressBar("shim-red active")
        setSeconds(prev=>prev +1)
      }else if (seconds ==5){
        console.log("end")
        setSeconds(0)
        setProgressBar("shim-red")
        dispatch({ type: "NEXT_QUESTION" })
      }
    },1000)

    return() =>{
      clearInterval(interval)    
    }

  },[seconds])

  return (
    <div>
      <div className="flex flex-col space-y-3">{seconds}
        <div className="relative w-full bg-gray-200 shim-red">
          <div className={`top-0 h-4 shim-red  ${progressBar}`} > </div>
        </div>
     </div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answer
            answerText={answer}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            key={index}
            index={index}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECT_ANSWER", payload: answerText })
              
            }
          />
        ))}
      </div>
      
    </div>
  );
};

export default Question