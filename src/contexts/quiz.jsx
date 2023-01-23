import React, { createContext, useReducer, useState, useEffect} from "react"
import questions from "../data"

import { shuffleAnswers } from "../helpers"
import { useRef } from "react"



const initialState = {
  questions,
  currentQuestionIndex: 0,
  currentAnswer: "",
  answers: shuffleAnswers(questions[0]),
  showResults: false,
  reading: true,
  correctAnswersCount: 0,
  progressBar: "shim-red active",
  stop: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "START_QUIZ":{
        const reading = false
        return {
            ...state,
            reading,
          }
    }
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount
      const stop = true
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
        stop,
      }
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex])
      const stop = false
      const progressBar = "shim-red active"
      return {
        ...state,
        currentAnswer: "",
        showResults,
        currentQuestionIndex,
        answers,
        stop,
        progressBar,
      }
    }
    case "RESTART": {
      return initialState
    }
    default:
      return state
  }
}

export const QuizContext = createContext()

export const QuizProvider = ({ children }) => {

  const value = useReducer(reducer, initialState)

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}