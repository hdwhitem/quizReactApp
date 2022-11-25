import { useContext } from "react"
import { QuizContext } from "../contexts/quiz"

const Reading = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex]
  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        <p>text reading</p>
      <div onClick={() => dispatch({ type: "START_QUIZ" })} className="next-button">
        Start Quiz
      </div>
      </div>
    </div>
  );
};

export default Reading