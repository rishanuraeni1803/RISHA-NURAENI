import React, { useState } from 'react';
import { QuizQuestion, EcosystemData } from '../../types/game';
import { ArrowLeft, RotateCcw, HelpCircle, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface QuickQuizProps {
  ecosystem: EcosystemData;
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const QuickQuiz: React.FC<QuickQuizProps> = ({
  ecosystem,
  onComplete,
  onBack,
}) => {
  const questions: QuizQuestion[] = ecosystem.quizQuestions;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isQuizDone, setIsQuizDone] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      sound.playStar();
      setScore((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Quiz finished
      sound.playFanfare();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsQuizDone(true);
      const earnedPoints = (score + (selectedOption === currentQ.correctIndex ? 1 : 0)) * 10;
      onComplete(earnedPoints, 1);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsQuizDone(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-2xl border-2 border-amber-300 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Mini-Game 4 • Kuis Cepat IPAS
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🧠 Kuis Cepat: {ecosystem.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-100 border border-amber-300 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold text-amber-900">
            Soal {currentIndex + 1} / {questions.length}
          </div>
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Mulai Ulang Kuis"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isQuizDone ? (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border-4 border-amber-400 shadow-xl space-y-5">
          {/* Question Header */}
          <div className="flex items-start gap-4">
            {currentQ.imageEmoji && (
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0 shadow-sm animate-bounce">
                {currentQ.imageEmoji}
              </div>
            )}
            <div className="flex-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pertanyaan #{currentIndex + 1}
              </span>
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                {currentQ.question}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isChosen = selectedOption === idx;
              const isCorrectOpt = idx === currentQ.correctIndex;

              let btnClass = 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800';
              if (isAnswered) {
                if (isCorrectOpt) {
                  btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (isChosen && !isCorrectOpt) {
                  btnClass = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-3.5 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition cursor-pointer flex items-center gap-3 ${btnClass}`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                    isAnswered && isCorrectOpt
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : isAnswered && isChosen
                      ? 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}>
                    {letter}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {isAnswered && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && isChosen && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Hint Trigger */}
          {!isAnswered && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setShowHint(!showHint);
                }}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHint ? 'Sembunyikan Petunjuk' : 'Perlu Bantuan / Petunjuk?'}</span>
              </button>
            </div>
          )}

          {showHint && !isAnswered && (
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs text-amber-900 animate-fadeIn">
              💡 <strong>Petunjuk:</strong> {currentQ.hint}
            </div>
          )}

          {/* Explanation after answer */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border-2 space-y-2 animate-fadeIn ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>{selectedOption === currentQ.correctIndex ? '🎉 Jawabanmu Benar!' : '💡 Penjelasan Guru:'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-md game-btn cursor-pointer flex items-center gap-1.5"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 text-center shadow-xl space-y-4 animate-fadeIn">
          <div className="text-6xl animate-bounce">🏆 ⭐ 🧠</div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Kuis Selesai dengan Hebat!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            Kamu berhasil menjawab <strong>{score} dari {questions.length}</strong> pertanyaan dengan tepat!
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto py-2">
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl">
              <div className="text-xs text-amber-800 font-bold">Poin Kuis</div>
              <div className="text-2xl font-black text-amber-600">+{score * 10} 🪙</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl">
              <div className="text-xs text-emerald-800 font-bold">Bintang Juara</div>
              <div className="text-2xl font-black text-emerald-600">⭐ +1</div>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                onBack();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl shadow-md game-btn cursor-pointer text-sm"
            >
              Kembali ke Menu Wilayah 🗺️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
