
import { Question, QuestionType } from './types';

export const AUDIO_URL = "https://tinyurl.com/ieltsliau";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: QuestionType.FILL_BLANK,
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    text: "The courses will begin on the ______ of March.",
    answers: ["5th", "5", "fifth"]
  },
  {
    id: 2,
    type: QuestionType.FILL_BLANK,
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    text: "Each course lasts for ______ weeks.",
    answers: ["10", "ten"]
  },
  {
    id: 3,
    type: QuestionType.FILL_BLANK,
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    text: "Classes are held from 6:30 to ______ p.m.",
    answers: ["8:30", "8.30", "eight thirty"]
  },
  {
    id: 4,
    type: QuestionType.FILL_BLANK,
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    text: "The Basic Computer Skills course costs ______ dollars.",
    answers: ["120", "one hundred and twenty", "one hundred twenty"]
  },
  {
    id: 5,
    type: QuestionType.FILL_BLANK,
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    text: "The Photography course requires students to bring their own ______.",
    answers: ["camera"]
  },
  {
    id: 6,
    type: QuestionType.MULTIPLE_CHOICE,
    instruction: "Choose the correct answer A, B, or C.",
    text: "Who is the Basic Computer Skills course designed for?",
    choices: [
      { label: "A. Advanced users", value: "A" },
      { label: "B. Office workers", value: "B" },
      { label: "C. Beginners", value: "C" }
    ],
    answers: ["C"]
  },
  {
    id: 7,
    type: QuestionType.MULTIPLE_CHOICE,
    instruction: "Choose the correct answer A, B, or C.",
    text: "Which course is held on Wednesdays?",
    choices: [
      { label: "A. Basic Computer Skills", value: "A" },
      { label: "B. Spoken English for Travel", value: "B" },
      { label: "C. Photography for Beginners", value: "C" }
    ],
    answers: ["B"]
  },
  {
    id: 8,
    type: QuestionType.MULTIPLE_CHOICE,
    instruction: "Choose the correct answer A, B, or C.",
    text: "What is the focus of the Spoken English course?",
    choices: [
      { label: "A. Academic writing", value: "A" },
      { label: "B. Grammar rules", value: "B" },
      { label: "C. Everyday travel situations", value: "C" }
    ],
    answers: ["C"]
  },
  {
    id: 9,
    type: QuestionType.MULTIPLE_CHOICE,
    instruction: "Choose the correct answer A, B, or C.",
    text: "Which course is the most expensive?",
    choices: [
      { label: "A. Computer Skills", value: "A" },
      { label: "B. Spoken English", value: "B" },
      { label: "C. Photography", value: "C" }
    ],
    answers: ["C"]
  },
  {
    id: 10,
    type: QuestionType.MULTIPLE_CHOICE,
    instruction: "Choose the correct answer A, B, or C.",
    text: "How can people register for the courses?",
    choices: [
      { label: "A. By phone only", value: "A" },
      { label: "B. At the centre or online", value: "B" },
      { label: "C. By email only", value: "C" }
    ],
    answers: ["B"]
  }
];
