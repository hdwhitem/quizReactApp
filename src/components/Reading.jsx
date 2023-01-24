import { useContext } from "react"
import { QuizContext } from "../contexts/quiz"

const Reading = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  return (
    <div>
      <div className="question">Quiz about CSS</div>
      <div className="answers">
      <div onClick={() => dispatch({ type: "START_QUIZ" })} className="next-button">
        Start Quiz
      </div>
      </div>
    </div>
  );
};

export default Reading