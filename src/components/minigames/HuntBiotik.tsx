import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, HelpCircle, Star, Footprints, Sparkles } from 'lucide-react';
import { EcosystemData } from '../../types/game';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface HuntBiotikProps {
  ecosystem: EcosystemData;
  playerAvatar: string;
  playerName: string;
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

interface HuntItem {
  id: string;
  name: string;
  type: 'biotik' | 'abiotik';
  emoji: string;
  hint: string;
  captured?: boolean;
}

export const HuntBiotik: React.FC<HuntBiotikProps> = ({
  ecosystem,
  playerAvatar,
  playerName,
  onComplete,
  onBack,
}) => {
  // Pool of trail encounters
  const initialTrailItems: HuntItem[] = [
    { id: 'h1', name: 'Burung Berkicau', type: 'biotik', emoji: '🐦', hint: 'Burung bernapas, terbang, dan bertelur.' },
    { id: 'h2', name: 'Batu Karang', type: 'abiotik', emoji: '🪨', hint: 'Batu adalah benda mati alami, tidak bernapas.' },
    { id: 'h3', name: 'Kupu-Kupu Indah', type: 'biotik', emoji: '🦋', hint: 'Kupu-kupu menghisap nektar dan berkembang biak.' },
    { id: 'h4', name: 'Aliran Air', type: 'abiotik', emoji: '💧', hint: 'Air adalah cairan tak hidup penyokong makhluk hidup.' },
    { id: 'h5', name: 'Pohon Mangga', type: 'biotik', emoji: '🌳', hint: 'Pohon berfotosintesis dan bertumbuh tinggi.' },
    { id: 'h6', name: 'Cahaya Matahari', type: 'abiotik', emoji: '☀️', hint: 'Matahari adalah sumber cahaya dan energi panas tak hidup.' },
    { id: 'h7', name: 'Kelinci Ceria', type: 'biotik', emoji: '🐇', hint: 'Kelinci adalah mamalia yang melompat dan beranak.' },
    { id: 'h8', name: 'Tanah Subur', type: 'abiotik', emoji: '🌱', hint: 'Tanah adalah lingkungan fisik tempat menancapnya akar.' },
    { id: 'h9', name: 'Bunga Mawar', type: 'biotik', emoji: '🌹', hint: 'Bunga adalah bagian tumbuhan hidup yang mekar.' },
  ];

  const targetCount = 5;
  const [trailItems, setTrailItems] = useState<HuntItem[]>(initialTrailItems);
  const [capturedCount, setCapturedCount] = useState<number>(0);
  const [characterStep, setCharacterStep] = useState<number>(0); // 0 to 5
  const [message, setMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleCapture = (item: HuntItem) => {
    if (item.captured) return;

    if (item.type === 'biotik') {
      sound.playCorrect();
      sound.playStar();
      const newCaptured = capturedCount + 1;
      const nextStep = Math.min(characterStep + 1, targetCount);

      setCapturedCount(newCaptured);
      setCharacterStep(nextStep);

      // mark item as captured
      setTrailItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, captured: true } : i))
      );

      setMessage({
        text: `Keren! 🎯 Kamu berhasil menangkap ${item.name}! (${item.hint})`,
        isCorrect: true,
      });

      if (newCaptured >= targetCount) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        setIsFinished(true);
        onComplete(50, 1);
      }
    } else {
      sound.playWrong();
      setMessage({
        text: `Belum tepat! ${item.name} termasuk komponen ABIOTIK (benda tak hidup). ${item.hint}`,
        isCorrect: false,
      });
    }
  };

  const handleReset = () => {
    sound.playPop();
    setTrailItems(initialTrailItems);
    setCapturedCount(0);
    setCharacterStep(0);
    setMessage(null);
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
              Mini-Game 3 • Petualangan Rimba
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              🏃 Berburu Biotik di Alam Bebas
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-900 flex items-center gap-1.5">
            <span>Ditangkap:</span>
            <span className="text-emerald-700 text-base">{capturedCount} / {targetCount} ⭐</span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setShowHint(!showHint);
            }}
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
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

      {/* Mission Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-3 sm:p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl animate-bounce">🎒</div>
          <div>
            <div className="text-xs uppercase font-extrabold text-emerald-100 tracking-wide">
              MISI SAFARI:
            </div>
            <div className="text-sm sm:text-base font-black font-heading">
              "Tangkap 5 komponen BIOTIK (makhluk hidup) di sepanjang jalan setapak!"
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-xs bg-white/20 px-3 py-1.5 rounded-xl font-bold">
          Setiap biotik membuatmu maju!
        </div>
      </div>

      {showHint && (
        <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2 animate-fadeIn">
          <span className="text-lg">💡</span>
          <div>
            <strong>Petunjuk:</strong> Tangkap hewan atau tumbuhan (seperti burung, kupu-kupu, pohon, kelinci). Hindari benda mati seperti batu, air, atau matahari.
          </div>
        </div>
      )}

      {/* Safari Walkway Path Display */}
      <div className="bg-gradient-to-r from-emerald-100 via-amber-100 to-emerald-200 p-4 sm:p-6 rounded-3xl border-4 border-emerald-400 shadow-lg relative overflow-hidden">
        {/* Sky / Ambient */}
        <div className="flex justify-between items-center mb-6 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Footprints className="w-4 h-4 text-emerald-600" />
            <span>Jalur Penjelajahan: Pos Awal</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-800">
            <span>Pos Akhir (Garis Finish 🏁)</span>
          </div>
        </div>

        {/* Trail Track with Character */}
        <div className="relative h-20 bg-amber-200/80 rounded-2xl border-2 border-dashed border-amber-400 flex items-center px-4 my-4 shadow-inner">
          {/* Track markers */}
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              style={{ left: `${(step / 5) * 88 + 4}%` }}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  characterStep >= step
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white text-slate-400 border border-slate-300'
                }`}
              >
                {step === 5 ? '🏁' : step}
              </div>
            </div>
          ))}

          {/* Animated Player Explorer Pin */}
          <div
            style={{
              left: `${(characterStep / 5) * 88 + 4}%`,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-2xl shadow-xl animate-bounce">
              {playerAvatar}
            </div>
            <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-full border border-amber-400 shadow text-amber-950 whitespace-nowrap mt-1">
              {playerName}
            </span>
          </div>
        </div>

        {/* Encounter Cards on Trail */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>Benda yang Kamu Temukan di Perjalanan:</span>
            <span className="text-emerald-700">Pilih komponen BIOTIK! 🎯</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {trailItems.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleCapture(item)}
                  disabled={item.captured || isFinished}
                  className={`p-2.5 rounded-2xl border-2 transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    item.captured
                      ? 'bg-emerald-100 border-emerald-400 opacity-60 scale-95'
                      : 'bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-400 hover:scale-105 active:scale-95 shadow-sm'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl">{item.emoji}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 text-center truncate w-full">
                    {item.name}
                  </span>
                  {item.captured && (
                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                      Tertangkap ⭐
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating feedback message */}
      {message && (
        <div
          className={`p-3.5 sm:p-4 rounded-2xl shadow-md border-2 flex items-center gap-3 text-xs sm:text-sm font-semibold animate-fadeIn ${
            message.isCorrect
              ? 'bg-emerald-500 text-white border-emerald-300'
              : 'bg-rose-500 text-white border-rose-300'
          }`}
        >
          <span className="text-2xl">{message.isCorrect ? '🎯' : '💡'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Finished Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 rounded-3xl border-4 border-amber-600 text-center shadow-xl space-y-3 animate-fadeIn">
          <div className="text-5xl animate-bounce">🏃 🌟 🏁</div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-heading">
            Luar Biasa! Kamu Sampai di Garis Akhir!
          </h3>
          <p className="text-amber-950 font-medium max-w-lg mx-auto text-sm sm:text-base">
            Kamu berhasil menangkap 5 komponen biotik dengan cermat dan menyelesaikan rute penjelajahan. Kamu mendapatkan <strong>+50 Poin</strong> dan <strong>1 Bintang Emas ⭐</strong>!
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
