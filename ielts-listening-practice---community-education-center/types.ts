
export enum QuestionType {
  FILL_BLANK = 'FILL_BLANK',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export interface Choice {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  instruction: string;
  text: string;
  choices?: Choice[];
  answers: string[]; // Support multiple variations of correct answers
}

export interface UserAnswers {
  [key: number]: string;
}

export interface QuestionResult {
  isCorrect: boolean;
  userAnswer: string;
}
