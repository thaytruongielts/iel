
import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS, AUDIO_URL } from '../constants';
import { UserAnswers, QuestionType } from '../types';

export const ListeningApp: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleInputChange = (id: number, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswer = useCallback((id: number, userVal: string) => {
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question || !userVal) return false;

    const normalizedUser = userVal.trim().toLowerCase();
    return question.answers.some(
      (ans) => ans.toLowerCase() === normalizedUser
    );
  }, []);

  const handleSubmit = () => {
    let correctCount = 0;
    QUESTIONS.forEach((q) => {
      if (checkAnswer(q.id, answers[q.id] || "")) {
        correctCount++;
      }
    });

    const calculatedScore = (10 * correctCount) / QUESTIONS.length;
    setScore(calculatedScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const renderQuestions = (startIndex: number, endIndex: number, title: string) => {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-6">
          {title}
        </h2>
        <p className="text-sm font-medium text-gray-500 mb-6 bg-blue-50 p-3 rounded-md italic">
          {QUESTIONS[startIndex].instruction}
        </p>
        <div className="space-y-8">
          {QUESTIONS.slice(startIndex, endIndex).map((q) => (
            <div key={q.id} className={`p-4 rounded-lg transition-all ${submitted ? (checkAnswer(q.id, answers[q.id] || "") ? 'bg-green-50' : 'bg-red-50') : 'bg-white shadow-sm border border-gray-100'}`}>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {q.id}
                </span>
                <div className="flex-grow">
                  <div className="mb-4 text-gray-800 leading-relaxed font-medium">
                    {q.type === QuestionType.FILL_BLANK 
                      ? q.text.split('______').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <input
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                disabled={submitted}
                                className={`mx-2 border-b-2 outline-none px-2 py-1 w-32 bg-transparent transition-colors focus:border-blue-500 ${submitted ? (checkAnswer(q.id, answers[q.id] || "") ? 'border-green-500 text-green-700 font-bold' : 'border-red-500 text-red-700 font-bold') : 'border-gray-300'}`}
                                placeholder="Answer"
                              />
                            )}
                          </React.Fragment>
                        ))
                      : q.text
                    }
                  </div>

                  {q.type === QuestionType.MULTIPLE_CHOICE && (
                    <div className="grid grid-cols-1 gap-3 ml-2">
                      {q.choices?.map((choice) => (
                        <label
                          key={choice.value}
                          className={`flex items-center p-3 rounded-md cursor-pointer transition-colors border ${
                            answers[q.id] === choice.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          } ${submitted && answers[q.id] === choice.value ? (checkAnswer(q.id, answers[q.id]) ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100') : ''}`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={choice.value}
                            checked={answers[q.id] === choice.value}
                            onChange={() => handleInputChange(q.id, choice.value)}
                            disabled={submitted}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 mr-3"
                          />
                          <span className={`${submitted && answers[q.id] === choice.value ? (checkAnswer(q.id, answers[q.id]) ? 'text-green-800 font-semibold' : 'text-red-800 font-semibold') : 'text-gray-700'}`}>
                            {choice.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {submitted && (
                    <div className={`mt-3 flex items-center gap-2 text-sm font-bold ${checkAnswer(q.id, answers[q.id] || "") ? 'text-green-600' : 'text-red-600'}`}>
                      {checkAnswer(q.id, answers[q.id] || "") ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Đúng (Correct)
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          Sai (Incorrect)
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
          IELTS Listening Practice
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Community Education Center - Course Enquiries. Listen to the audio and answer the questions below.
        </p>
      </header>

      {/* Audio Action Bar */}
      <div className="sticky top-4 z-50 bg-white shadow-xl border border-blue-100 rounded-2xl p-4 mb-10 flex flex-col md:flex-row items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-full text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 3v9.13a4.482 4.482 0 00-2 .87 4.5 4.5 0 105 3.68V7.32l8-1.6V11.13a4.482 4.482 0 00-2 .87 4.5 4.5 0 105 3.68V3z"></path>
          </svg>
        </div>
        <div className="flex-grow w-full">
          <a 
            href={AUDIO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
          >
            <span className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Click để mở Audio trong tab mới</span>
            </span>
            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        {submitted && score !== null && (
          <div className="bg-blue-50 px-6 py-2 rounded-xl border-2 border-blue-200 min-w-[140px] text-center">
            <span className="text-xs uppercase font-bold text-blue-400 block tracking-wider">Your Score</span>
            <span className="text-2xl font-black text-blue-700">{score.toFixed(1)} / 10</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {renderQuestions(0, 5, "Questions 1–5")}
        {renderQuestions(5, 10, "Questions 6–10")}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 border-t pt-8">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Nộp bài (Submit)
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-10 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95"
          >
            Làm lại (Reset)
          </button>
        )}
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm pb-10">
        <p>© Community Education Center | Listening Practice Module</p>
      </footer>
    </div>
  );
};
