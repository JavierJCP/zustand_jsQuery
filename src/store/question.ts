import { create } from 'zustand';
import { type Question } from '../interfaces/interface';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0, // -> posicion del array de Questions

        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/data.json');
          const data = await res.json();
          const questions = data
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          // const state = get();
          const { questions } = get();
          // usar el structuredClone para clonar el objeto
          const newQuestions = structuredClone(questions);
          // encontramos el índice de la pregunta
          const questionIndex = newQuestions.findIndex(
            (q: Question) => q.id === questionId
          );
          // obtenemos la información de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // averiguamos si el usuario ha seleccionado la respuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;

          if (isCorrectUserAnswer) confetti();

          //cambiamos la informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // actualizamos el estado
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },

        reset: () => {
          set({ questions: [], currentQuestion: 0 });
        },
      };
    },
    {
      name: 'question',
    }
  )
);
