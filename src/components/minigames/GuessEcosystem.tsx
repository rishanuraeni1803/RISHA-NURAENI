import React, { useState } from 'react';
import { GUESS_ECOSYSTEM_DATA } from '../../data/gameData';
import { GuessQuestion, EcosystemType } from '../../types/game';
import { ArrowLeft, RotateCcw, CheckCircle2, HelpCircle, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface GuessEcosystemProps {
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const GuessEcosystem: React.FC<GuessEcosystemProps> = ({
  onComplete,
  onBack,
}) => {
  const [questions] = useState<GuessQuestion[]>(GUESS_ECOSYSTEM_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<EcosystemType | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleChoose = (type: EcosystemType) => {
    if (isAnswered) return;
    setSelectedType(type);
    setIsAnswered(true);

    const isCorrect = type === currentQ.correctType;
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
      setSelectedType(null);
      setIsAnswered(false);
    } else {
      sound.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setIsFinished(true);
      const points = (score + (selectedType === currentQ.correctType ? 1 : 0)) * 15;
      onComplete(points, 1);
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedType(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-2xl border-2 border-sky-300 shadow-sm">
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
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Mini-Game 6 • Teka-Teki Alam
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🧭 Tebak Ekosistem Misterius
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-sky-100 border border-sky-300 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold text-sky-900">
            Teka-Teki {currentIndex + 1} / {questions.length}
          </div>
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Mulai Ulang"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border-4 border-sky-400 shadow-xl space-y-5">
          {/* Mystery Riddle Box */}
          <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 p-5 rounded-2xl text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-100 tracking-wider uppercase">
              <Eye className="w-4 h-4" />
              <span>Petunjuk Pengamatan Lingkungan:</span>
            </div>
            <blockquote className="text-sm sm:text-base font-bold italic leading-relaxed">
              "{currentQ.clue}"
            </blockquote>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentQ.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/20 backdrop-blur px-2.5 py-1 rounded-full font-semibold text-white border border-white/30"
                >
                  ✨ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Question Prompt */}
          <div className="text-center font-black text-slate-800 text-base sm:text-lg font-heading">
            "Siapakah Aku?"
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt) => {
              const isChosen = selectedType === opt.type;
              const isCorrect = opt.type === currentQ.correctType;

              let style = 'bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-300';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-4 ring-emerald-300 scale-102';
                } else if (isChosen) {
                  style = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.type}
                  onClick={() => handleChoose(opt.type)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 transition flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm ${style}`}
                >
                  <span className="text-4xl sm:text-5xl">{opt.emoji}</span>
                  <span className="text-sm font-bold text-slate-900">{opt.name}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border-2 space-y-2 animate-fadeIn ${
              selectedType === currentQ.correctType
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>{selectedType === currentQ.correctType ? '🎉 Tebakanmu Tepat Sekali!' : '💡 Penjelasan:'}</span>
              </div>
              <p className="text-xs sm:text-sm">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-md game-btn cursor-pointer flex items-center gap-1.5"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Teka-Teki Berikutnya' : 'Selesai'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-sky-400 text-center shadow-xl space-y-4 animate-fadeIn">
          <div className="text-6xl animate-bounce">🧭 🌟 🗺️</div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Teka-Teki Ekosistem Terpecahkan!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            Kamu berhasil menebak <strong>{score} dari {questions.length}</strong> ekosistem dengan menggunakan kemampuan observasi yang tajam!
          </p>
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
