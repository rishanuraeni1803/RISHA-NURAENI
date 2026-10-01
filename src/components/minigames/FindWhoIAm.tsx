import React, { useState, useEffect } from 'react';
import { EcosystemData, ComponentType, SceneObject } from '../../types/game';
import { Sparkles, HelpCircle, CheckCircle, ArrowLeft, RotateCcw, Award } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface FindWhoIAmProps {
  ecosystem: EcosystemData;
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const FindWhoIAm: React.FC<FindWhoIAmProps> = ({
  ecosystem,
  onComplete,
  onBack,
}) => {
  // Target is BIOTIK
  const targetType: ComponentType = 'biotik';
  const targetName = 'BIOTIK (Makhluk Hidup)';

  const allTargetObjects = ecosystem.sceneObjects.filter((o) => o.type === targetType);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    text: string;
    isCorrect: boolean;
    objectName?: string;
  } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleObjectClick = (obj: SceneObject) => {
    if (foundIds.includes(obj.id)) {
      setFeedback({
        text: `Kamu sudah menemukan ${obj.name} sebelumnya! Cari objek lainnya ya! 🔍`,
        isCorrect: true,
        objectName: obj.name,
      });
      return;
    }

    if (obj.type === targetType) {
      sound.playCorrect();
      sound.playStar();
      const updated = [...foundIds, obj.id];
      setFoundIds(updated);
      setFeedback({
        text: `Hebat! ${obj.name} adalah makhluk hidup (${targetType}). ${obj.description}`,
        isCorrect: true,
        objectName: obj.name,
      });

      if (updated.length === allTargetObjects.length) {
        sound.playFanfare();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
        setIsFinished(true);
        onComplete(50, 1);
      }
    } else {
      sound.playWrong();
      setFeedback({
        text: `Belum tepat! ${obj.name} termasuk komponen ABIOTIK (benda tak hidup). ${obj.hint}`,
        isCorrect: false,
        objectName: obj.name,
      });
    }
  };

  const handleReset = () => {
    sound.playPop();
    setFoundIds([]);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
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
              Mini-Game 1 • {ecosystem.name}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🔍 Temukan Siapa Aku?
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-900 flex items-center gap-1.5">
            <span>Ditemukan:</span>
            <span className="text-base text-emerald-700">
              {foundIds.length} / {allTargetObjects.length}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setShowHint(!showHint);
            }}
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
            title="Bantuan / Petunjuk"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Petunjuk</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Mulai Ulang"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Mission Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 sm:p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-bounce">🔎</div>
          <div>
            <div className="text-xs uppercase font-extrabold text-emerald-100 tracking-wide">
              MISI PETUALANG:
            </div>
            <div className="text-sm sm:text-base font-black font-heading">
              "Klik semua benda yang termasuk komponen {targetName} di bawah ini!"
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-xs bg-white/20 px-3 py-1.5 rounded-xl font-bold">
          Sentuh objek di layar
        </div>
      </div>

      {/* Hint Alert if opened */}
      {showHint && (
        <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2 animate-fadeIn">
          <span className="text-lg">💡</span>
          <div>
            <strong>Petunjuk Guru:</strong> Komponen <strong>BIOTIK</strong> adalah semua benda yang merupakan <strong>makhluk hidup</strong>. Mereka bisa bernapas, bergerak, butuh makan, bertumbuh, atau menghasilkan keturunan (contoh: pohon, kelinci, burung, kupu-kupu).
          </div>
        </div>
      )}

      {/* Interactive Ecosystem Scene Canvas */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-400 bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-300 select-none">
        {/* Background Ecosystem elements based on ecosystem ID */}
        {ecosystem.id === 'hutan' && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-10 left-5 text-6xl">🌲</div>
            <div className="absolute top-20 right-10 text-7xl">🌳</div>
            <div className="absolute bottom-6 left-1/3 text-6xl">🌿</div>
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-emerald-800 to-transparent" />
          </div>
        )}

        {ecosystem.id === 'laut' && (
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-b from-sky-300 via-cyan-400 to-blue-700">
            <div className="absolute top-8 left-12 text-5xl">🫧</div>
            <div className="absolute bottom-10 right-20 text-6xl">🪸</div>
            <div className="absolute bottom-4 left-10 text-6xl">🐚</div>
          </div>
        )}

        {ecosystem.id === 'gurun' && (
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-b from-amber-200 via-yellow-300 to-orange-400">
            <div className="absolute top-8 right-16 text-6xl">☀️</div>
            <div className="absolute bottom-6 left-12 text-7xl">🏜️</div>
          </div>
        )}

        {ecosystem.id === 'sawah' && (
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-b from-lime-200 via-green-300 to-emerald-500">
            <div className="absolute bottom-8 left-10 text-6xl">🌾</div>
            <div className="absolute bottom-12 right-12 text-7xl">🌾</div>
          </div>
        )}

        {/* Ambient clouds / sun */}
        <div className="absolute top-4 left-10 text-4xl opacity-70 animate-float pointer-events-none">☁️</div>
        <div className="absolute top-8 right-24 text-3xl opacity-70 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }}>☁️</div>

        {/* Objects rendered on coordinates */}
        {ecosystem.sceneObjects.map((obj) => {
          const isFound = foundIds.includes(obj.id);
          const isTarget = obj.type === targetType;

          return (
            <button
              key={obj.id}
              onClick={() => handleObjectClick(obj)}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: `translate(-50%, -50%) scale(${obj.scale || 1})`,
              }}
              className={`absolute p-2 rounded-2xl transition duration-200 cursor-pointer group flex flex-col items-center justify-center ${
                isFound
                  ? 'bg-emerald-400/80 ring-4 ring-yellow-300 animate-pulse-glow shadow-xl z-20'
                  : 'hover:scale-125 hover:bg-white/40 active:scale-95 z-10'
              }`}
            >
              <span className={`text-4xl sm:text-5xl drop-shadow-md select-none transition ${isFound ? 'animate-wiggle' : ''}`}>
                {obj.emoji}
              </span>
              <span className={`text-[10px] sm:text-xs font-extrabold px-1.5 py-0.5 rounded-full mt-0.5 whitespace-nowrap shadow-sm border ${
                isFound
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white/90 text-slate-800 border-slate-300 opacity-90 group-hover:opacity-100'
              }`}>
                {obj.name} {isFound ? '⭐' : ''}
              </span>
            </button>
          );
        })}

        {/* Floating feedback dialogue at bottom */}
        {feedback && (
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-30 animate-fadeIn">
            <div className={`p-3.5 sm:p-4 rounded-2xl shadow-xl border-2 flex items-start gap-3 backdrop-blur-md ${
              feedback.isCorrect
                ? 'bg-emerald-500/95 text-white border-emerald-300'
                : 'bg-rose-500/95 text-white border-rose-300'
            }`}>
              <div className="text-3xl shrink-0">
                {feedback.isCorrect ? '🌟' : '💡'}
              </div>
              <div className="flex-1 text-xs sm:text-sm font-semibold">
                <div className="font-bold text-sm sm:text-base font-heading mb-0.5">
                  {feedback.isCorrect ? 'Hebat Sekali! 👏' : 'Coba Perhatikan Lagi! 🔎'}
                </div>
                {feedback.text}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Target Progress Bar / Checklist */}
      <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Target Komponen Biotik di Wilayah Ini:
          </div>
          <span className="text-xs font-extrabold text-emerald-700">
            {foundIds.length} dari {allTargetObjects.length} ditemukan
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {allTargetObjects.map((target) => {
            const isFound = foundIds.includes(target.id);
            return (
              <div
                key={target.id}
                className={`p-2 rounded-xl border text-xs flex items-center gap-2 transition ${
                  isFound
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xl">{target.emoji}</span>
                <span className="truncate">{target.name}</span>
                {isFound && <CheckCircle className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Victory Card */}
      {isFinished && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 rounded-3xl border-4 border-amber-600 text-center shadow-xl space-y-3 animate-fadeIn">
          <div className="text-5xl animate-bounce">🏆 🌟 🌳</div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-heading">
            Luar Biasa! Misi Ditemukan Selesai!
          </h3>
          <p className="text-amber-950 font-medium max-w-lg mx-auto text-sm sm:text-base">
            Kamu telah berhasil menemukan semua komponen biotik di <strong>{ecosystem.name}</strong>! Kamu mendapatkan <strong>+50 Poin</strong> dan <strong>1 Bintang Emas ⭐</strong>!
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
