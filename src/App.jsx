import './App.css'
import { Quiz } from './components'
import { QuizProvider } from "./contexts/quiz";


function App() {

  return (
    <div>
    <QuizProvider>
      <Quiz />
    </QuizProvider>
    </div>
  )
}

export default App
