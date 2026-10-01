import React, { useState } from 'react';
import { RescueMission, EcosystemData } from '../../types/game';
import { ArrowLeft, RotateCcw, CheckCircle2, Sparkles, Heart, Trash2, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface EcoRescueProps {
  ecosystem: EcosystemData;
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const EcoRescue: React.FC<EcoRescueProps> = ({
  ecosystem,
  onComplete,
  onBack,
}) => {
  const mission: RescueMission = ecosystem.rescueMission;
  const [cleanedTrashIds, setCleanedTrashIds] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isMissionSolved, setIsMissionSolved] = useState<boolean>(false);

  const remainingTrash = mission.trashItems.filter((t) => !cleanedTrashIds.includes(t.id));

  const handlePickTrash = (trashId: string) => {
    sound.playPop();
    const updated = [...cleanedTrashIds, trashId];
    setCleanedTrashIds(updated);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === mission.correctIndex) {
      sound.playFanfare();
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
      });
      setIsMissionSolved(true);
      onComplete(60, 1);
    } else {
      sound.playWrong();
    }
  };

  const handleReset = () => {
    sound.playPop();
    setCleanedTrashIds([]);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsMissionSolved(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-2xl border-2 border-emerald-300 shadow-sm">
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
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Mini-Game 5 • Aksi Peduli Lingkungan
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🛡️ Misi Menyelamatkan Ekosistem
            </h2>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          title="Ulangi Misi"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Scenario Brief */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">⚠️</span>
          <h3 className="text-lg sm:text-xl font-black font-heading">
            {mission.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
          {mission.scenario}
        </p>
      </div>

      {/* Interactive Cleanup Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
          <span>Langkah 1: Klik & Pungut semua sampah di area ini!</span>
          <span className="text-emerald-700">
            Tersisa: {remainingTrash.length} sampah
          </span>
        </div>

        <div className={`relative h-64 sm:h-80 rounded-3xl border-4 overflow-hidden shadow-inner transition-all duration-700 ${
          isMissionSolved
            ? 'bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-200 border-emerald-500'
            : 'bg-gradient-to-b from-slate-300 via-amber-200/60 to-stone-400 border-amber-600'
        }`}>
          {/* Ambient scenery */}
          {isMissionSolved ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
              <div className="text-6xl animate-bounce mb-2">🌿 ✨ 🐟 🦜</div>
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl border-2 border-emerald-400 shadow-md">
                <div className="text-base font-black text-emerald-900 font-heading">
                  Alam Kembali Bersih, Sehat, dan Segar!
                </div>
                <div className="text-xs text-emerald-700">
                  Komponen biotik dan abiotik kini hidup berdampingan dengan damai.
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
              <div className="text-5xl">🌫️ 🥀 🪰</div>
            </div>
          )}

          {/* Interactive Trash Elements */}
          {remainingTrash.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePickTrash(item.id)}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute p-2 rounded-2xl bg-white/80 hover:bg-rose-100 border-2 border-rose-400 shadow-lg cursor-pointer transform hover:scale-125 active:scale-95 transition flex flex-col items-center group z-20"
              title={`Klik untuk bersihkan ${item.name}`}
            >
              <span className="text-3xl animate-bounce">{item.emoji}</span>
              <span className="text-[10px] font-black text-rose-700 bg-white px-1.5 py-0.5 rounded-full border border-rose-300 shadow-sm mt-0.5">
                Pungut! 🗑️
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Decision Question */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Langkah 2: Keputusan Bijak Penjelajah Alam
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {mission.question}
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {mission.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isChosen = selectedOption === idx;
            const isCorrect = idx === mission.correctIndex;

            let btnStyle = 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-800';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
              } else if (isChosen) {
                btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`p-3.5 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm transition cursor-pointer flex items-center gap-3 ${btnStyle}`}
              >
                <span className="w-7 h-7 rounded-xl bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {letter}
                </span>
                <span className="flex-1">{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback dialogue */}
        {isAnswered && (
          <div className={`p-4 rounded-2xl border-2 space-y-2 animate-fadeIn ${
            selectedOption === mission.correctIndex
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{selectedOption === mission.correctIndex ? 'Misi Berhasil Diselamatkan! 🌟' : 'Pikirkan Kembali Sahabat!'}</span>
            </div>
            <p className="text-xs sm:text-sm">
              {mission.explanation}
            </p>
            <div className="text-xs bg-white/70 p-2.5 rounded-xl border border-emerald-200 text-emerald-800 font-semibold">
              💌 <strong>Pesan Moral:</strong> {mission.moralLesson}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  sound.playPop();
                  onBack();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md game-btn cursor-pointer text-xs sm:text-sm"
              >
                Kembali ke Menu Wilayah 🗺️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
