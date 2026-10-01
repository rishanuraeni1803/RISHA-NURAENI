import React, { useState } from 'react';
import { WHEEL_CHALLENGES } from '../../data/gameData';
import { WheelChallenge } from '../../types/game';
import { ArrowLeft, RotateCcw, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface FortuneWheelProps {
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const FortuneWheel: React.FC<FortuneWheelProps> = ({
  onComplete,
  onBack,
}) => {
  const challenges: WheelChallenge[] = WHEEL_CHALLENGES;
  const numSegments = challenges.length;
  const degreesPerSegment = 360 / numSegments;

  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedChallenge, setSelectedChallenge] = useState<WheelChallenge | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [roundsCompleted, setRoundsCompleted] = useState<number>(0);

  const handleSpin = () => {
    if (isSpinning) return;

    sound.playPop();
    setIsSpinning(true);
    setSelectedChallenge(null);
    setSelectedOption(null);
    setIsAnswered(false);

    // Pick random target segment index
    const targetIndex = Math.floor(Math.random() * numSegments);
    // Number of full spins (4 to 7 full rotations)
    const fullSpins = 360 * (5 + Math.floor(Math.random() * 3));
    // Calculate final degree
    const targetDeg = fullSpins + (360 - (targetIndex * degreesPerSegment + degreesPerSegment / 2));

    // Play tick sounds during spin
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sound.playSpinTick();
      tickCount++;
      if (tickCount > 25) clearInterval(tickInterval);
    }, 120);

    setRotation((prev) => prev + targetDeg);

    setTimeout(() => {
      clearInterval(tickInterval);
      sound.playStar();
      setIsSpinning(false);
      setSelectedChallenge(challenges[targetIndex]);
    }, 3800);
  };

  const handleAnswer = (index: number) => {
    if (!selectedChallenge || isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === selectedChallenge.correctIndex) {
      sound.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setRoundsCompleted((prev) => prev + 1);
      onComplete(selectedChallenge.rewardPoints, 1);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-2xl border-2 border-pink-300 shadow-sm">
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
            <div className="text-xs font-bold text-pink-700 uppercase tracking-wider">
              Mini-Game 7 • Tantangan Seru
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🎡 Roda Keberuntungan Ekosistem
            </h2>
          </div>
        </div>

        <div className="bg-pink-100 border border-pink-300 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-pink-900">
          Tantangan Terselesaikan: {roundsCompleted} ⭐
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Wheel Side (Left on md) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-white rounded-3xl border-2 border-slate-200 shadow-md">
          {/* Pointer indicator */}
          <div className="relative flex flex-col items-center">
            <div className="w-8 h-8 -mb-4 z-20 text-rose-600 text-3xl filter drop-shadow-md animate-bounce">
              🔻
            </div>

            {/* Circular Wheel */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-amber-400 shadow-2xl overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.95, 0.35, 1)' : 'none',
              }}
            >
              {/* Segments rendered as conic slices / overlay icons */}
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #22c55e 0deg 51.4deg,
                    #3b82f6 51.4deg 102.8deg,
                    #15803d 102.8deg 154.2deg,
                    #06b6d4 154.2deg 205.6deg,
                    #f59e0b 205.6deg 257deg,
                    #84cc16 257deg 308.4deg,
                    #ec4899 308.4deg 360deg
                  )`,
                }}
              />

              {/* Segment Labels radiating from center */}
              {challenges.map((c, i) => {
                const angle = i * degreesPerSegment + degreesPerSegment / 2;
                return (
                  <div
                    key={c.id}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                    className="absolute inset-0 flex justify-center pt-3 pointer-events-none"
                  >
                    <span className="text-[11px] font-black text-white drop-shadow-md select-none">
                      {c.category}
                    </span>
                  </div>
                );
              })}

              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-amber-400 shadow-lg flex items-center justify-center text-2xl z-10">
                🎯
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`mt-6 w-full max-w-xs py-3 px-6 rounded-2xl font-black text-base shadow-xl game-btn transition transform cursor-pointer flex items-center justify-center gap-2 ${
              isSpinning
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 active:scale-95'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSpinning ? 'RODA BERPUTAR... 💫' : 'PUTAR RODA SEKARANG! 🎡'}</span>
          </button>
        </div>

        {/* Challenge / Question Side (Right on md) */}
        <div className="md:col-span-6">
          {selectedChallenge ? (
            <div className="bg-white p-5 sm:p-6 rounded-3xl border-4 border-pink-400 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span
                  style={{ backgroundColor: selectedChallenge.color }}
                  className="text-white text-xs font-black px-3 py-1 rounded-full shadow-sm"
                >
                  Kategori: {selectedChallenge.category}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">
                  Hadiah: +{selectedChallenge.rewardPoints} Poin 🪙
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                {selectedChallenge.question}
              </h4>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {selectedChallenge.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === selectedChallenge.correctIndex;

                  let style = 'bg-slate-50 hover:bg-pink-50 border-slate-200 text-slate-800';
                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    } else if (isChosen) {
                      style = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                    } else {
                      style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                      className={`p-3 rounded-xl border-2 text-left font-medium text-xs sm:text-sm transition cursor-pointer flex items-center gap-2.5 ${style}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {letter}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm space-y-2 animate-fadeIn ${
                  selectedOption === selectedChallenge.correctIndex
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  <div className="font-bold">
                    {selectedOption === selectedChallenge.correctIndex ? '🎉 Luar Biasa! Jawabanmu Tepat!' : '💡 Jawaban Belum Tepat!'}
                  </div>
                  <p>{selectedChallenge.explanation}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleSpin}
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow game-btn cursor-pointer"
                    >
                      Putar Lagi! 🔄
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/80 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-pink-300 text-center space-y-3">
              <div className="text-5xl animate-bounce">🎁 🌟 🎡</div>
              <h3 className="text-lg font-bold text-slate-800">
                Siap Menantang Keberuntunganmu?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Tekan tombol <strong>"PUTAR RODA SEKARANG!"</strong> di sebelah kiri untuk memutar roda dan menjawab pertanyaan kuis berhadiah poin emas!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
