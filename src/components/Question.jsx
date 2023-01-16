import Answer from "./Answer"
import { useContext, useRef } from "react"
import { QuizContext } from "../contexts/quiz"
import { useState } from "react";
import { useEffect } from "react";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
  const active = quizState.progressBar
  const timer = useRef(null)

  function goToNextQuestion() {

    console.log("next question 10s. ",timer.current)
    dispatch({ type: "NEXT_QUESTION" })
    if(timer.current){
      clearTimeout(timer.current)
    }
  }

  useEffect(()=>{
      timer.current=setTimeout(goToNextQuestion, 10*1000)
  })


  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="relative w-full bg-gray-200 shim-red">
          <div className={`top-0 h-4 shim-red ${active ? 'active' : ''}`}> </div>
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