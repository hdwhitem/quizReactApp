import './App.css'
import { Quiz } from './components'
import { QuizProvider } from "./contexts/quiz";

function App() {

  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  )
}

export default App
