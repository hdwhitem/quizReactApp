import Answer from "./Answer"
import { useContext, useRef } from "react"
import { QuizContext } from "../contexts/quiz"
import { useState } from "react";
import { useEffect } from "react";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
  const timer = useRef(null)
  const [progressBar, setProgressBar] = useState("shim-red active")
  const stop = useRef(false)

  function goToNextQuestion() {
    
    if(timer.current){
      setTimeout(()=>{
        setProgressBar("shim-red")
      console.log("2.",progressBar, stop.current)
      },0)
      setTimeout(()=>{
        setProgressBar("shim-red active")
      console.log("3.",progressBar, stop.current)
      },0)
      setTimeout(()=>{
        dispatch({ type: "NEXT_QUESTION" })
      stop.current = false
      },0)
      
      
      
    }
  }

  useEffect(()=>{
      if (quizState.reading === false && stop.current === false){
          timer.current=setTimeout(goToNextQuestion, 10*1000)
          console.log("1.",progressBar)         
      }      
  },[progressBar])


  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="relative w-full bg-gray-200 shim-red">
          <div className={`top-0 h-4  ${progressBar}`}> </div>
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