import React, { useState } from 'react';
import { MATCH_ITEMS } from '../../data/gameData';
import { MatchItem, ComponentType } from '../../types/game';
import { ArrowLeft, RotateCcw, CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface MatchingPairsProps {
  onComplete: (points: number, stars: number) => void;
  onBack: () => void;
}

export const MatchingPairs: React.FC<MatchingPairsProps> = ({
  onComplete,
  onBack,
}) => {
  const [items, setItems] = useState<MatchItem[]>(() => [...MATCH_ITEMS].slice(0, 8));
  const [selectedItem, setSelectedItem] = useState<MatchItem | null>(null);
  const [biotikSorted, setBiotikSorted] = useState<MatchItem[]>([]);
  const [abiotikSorted, setAbiotikSorted] = useState<MatchItem[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const remainingItems = items.filter(
    (i) => !biotikSorted.some((b) => b.id === i.id) && !abiotikSorted.some((a) => a.id === i.id)
  );

  const handleSelectCard = (item: MatchItem) => {
    sound.playPop();
    setSelectedItem(item);
  };

  const handleClassify = (targetType: ComponentType) => {
    if (!selectedItem) {
      sound.playWrong();
      setFeedback({
        text: 'Klik atau pilih salah satu kartu di sebelah kiri terlebih dahulu! 👈',
        isCorrect: false,
      });
      return;
    }

    if (selectedItem.type === targetType) {
      sound.playCorrect();
      sound.playStar();
      if (targetType === 'biotik') {
        setBiotikSorted((prev) => [...prev, selectedItem]);
      } else {
        setAbiotikSorted((prev) => [...prev, selectedItem]);
      }

      setFeedback({
        text: `Tepat Sekali! 👏 ${selectedItem.name} adalah komponen ${targetType.toUpperCase()}. ${selectedItem.detail}`,
        isCorrect: true,
      });

      // Check if all sorted
      const remainingCount = remainingItems.length - 1;
      if (remainingCount === 0) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
        setIsFinished(true);
        onComplete(50, 1);
      }

      setSelectedItem(null);
    } else {
      sound.playWrong();
      setFeedback({
        text: `Belum tepat! ${selectedItem.name} BUKAN komponen ${targetType.toUpperCase()}. Ingat ciri-cirinya: ${selectedItem.detail}`,
        isCorrect: false,
      });
    }
  };

  const handleReset = () => {
    sound.playPop();
    setBiotikSorted([]);
    setAbiotikSorted([]);
    setSelectedItem(null);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
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
              Mini-Game 2
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 font-heading">
              ⚖️ Pasangkan Teman Ekosistem
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Guide Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧩</span>
          <div>
            <div className="text-xs uppercase font-extrabold text-blue-100 tracking-wide">
              CARA BERMAIN:
            </div>
            <div className="text-sm sm:text-base font-black font-heading">
              "1. Klik salah satu kartu benda → 2. Klik kotak kategori BIOTIK atau ABIOTIK yang sesuai!"
            </div>
          </div>
        </div>
        <div className="text-xs bg-white/20 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap">
          Sisa: {remainingItems.length} Kartu
        </div>
      </div>

      {showHint && (
        <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2 animate-fadeIn">
          <span className="text-lg">💡</span>
          <div>
            <strong>Ingat Kuncinya:</strong> 🟢 <strong>BIOTIK</strong> = Segala makhluk yang bernapas, butuh makan, dan tumbuh (hewan & tumbuhan). 🔵 <strong>ABIOTIK</strong> = Benda mati/fisik alami (air, batu, tanah, udara, cahaya matahari).
          </div>
        </div>
      )}

      {/* Main Play Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Cards to Sort (5 Cols on md) */}
        <div className="md:col-span-5 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-md space-y-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center justify-between">
            <span>Pilih Kartu Benda:</span>
            <span className="text-xs font-semibold text-slate-500">
              {remainingItems.length > 0 ? 'Klik kartu di bawah' : 'Semua telah dipasangkan! 🎉'}
            </span>
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {remainingItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectCard(item)}
                  className={`p-3 rounded-2xl border-2 transition text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50/70 hover:border-amber-300'
                  }`}
                >
                  <span className="text-4xl animate-bounce">{item.emoji}</span>
                  <span className="text-xs font-black text-slate-800">{item.name}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                      Dipilih 👈
                    </span>
                  )}
                </button>
              );
            })}

            {remainingItems.length === 0 && (
              <div className="col-span-2 py-8 text-center text-slate-400 space-y-2">
                <div className="text-5xl">✨ 🏆 ✨</div>
                <div className="text-sm font-bold text-emerald-700">Semua kartu berhasil dipasangkan dengan benar!</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: The 2 Target Drop/Click Baskets (7 Cols on md) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Basket 1: BIOTIK */}
          <div
            onClick={() => handleClassify('biotik')}
            className={`bg-gradient-to-b from-emerald-50 to-emerald-100 border-4 rounded-3xl p-4 flex flex-col justify-between transition cursor-pointer shadow-md ${
              selectedItem ? 'border-emerald-500 hover:scale-[1.02] ring-2 ring-emerald-300' : 'border-emerald-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🟢</span>
                  <h4 className="text-lg font-black text-emerald-950 font-heading">
                    BIOTIK
                  </h4>
                </div>
                <span className="text-xs bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                  {biotikSorted.length} Benda
                </span>
              </div>
              <p className="text-xs text-emerald-800 mb-3">
                Makhluk hidup (hewan, tumbuhan, jamur) yang bernapas & bertumbuh.
              </p>

              {/* Sorted items list */}
              <div className="space-y-1.5 min-h-[140px]">
                {biotikSorted.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/90 p-2 rounded-xl border border-emerald-300 flex items-center justify-between text-xs font-bold text-emerald-950 shadow-sm animate-fadeIn"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.name}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs sm:text-sm shadow game-btn"
            >
              Masukkan ke Sini (Biotik) 📥
            </button>
          </div>

          {/* Basket 2: ABIOTIK */}
          <div
            onClick={() => handleClassify('abiotik')}
            className={`bg-gradient-to-b from-sky-50 to-sky-100 border-4 rounded-3xl p-4 flex flex-col justify-between transition cursor-pointer shadow-md ${
              selectedItem ? 'border-sky-500 hover:scale-[1.02] ring-2 ring-sky-300' : 'border-sky-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🔵</span>
                  <h4 className="text-lg font-black text-sky-950 font-heading">
                    ABIOTIK
                  </h4>
                </div>
                <span className="text-xs bg-sky-200 text-sky-900 px-2.5 py-0.5 rounded-full font-bold">
                  {abiotikSorted.length} Benda
                </span>
              </div>
              <p className="text-xs text-sky-800 mb-3">
                Benda tak hidup / lingkungan fisik (air, batu, sinar matahari, tanah, udara).
              </p>

              {/* Sorted items list */}
              <div className="space-y-1.5 min-h-[140px]">
                {abiotikSorted.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/90 p-2 rounded-xl border border-sky-300 flex items-center justify-between text-xs font-bold text-sky-950 shadow-sm animate-fadeIn"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.name}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-3 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-xl text-xs sm:text-sm shadow game-btn"
            >
              Masukkan ke Sini (Abiotik) 📥
            </button>
          </div>
        </div>
      </div>

      {/* Floating feedback message */}
      {feedback && (
        <div
          className={`p-3.5 sm:p-4 rounded-2xl shadow-lg border-2 flex items-center gap-3 text-xs sm:text-sm font-semibold animate-fadeIn ${
            feedback.isCorrect
              ? 'bg-emerald-500 text-white border-emerald-300'
              : 'bg-rose-500 text-white border-rose-300'
          }`}
        >
          <span className="text-2xl">{feedback.isCorrect ? '🎉' : '💡'}</span>
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Finished Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 rounded-3xl border-4 border-amber-600 text-center shadow-xl space-y-3 animate-fadeIn">
          <div className="text-5xl animate-bounce">🏅 🌟 ⚖️</div>
          <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-heading">
            Hebat! Semua Pasangan Cocok!
          </h3>
          <p className="text-amber-950 font-medium max-w-lg mx-auto text-sm sm:text-base">
            Kamu berhasil mengelompokkan komponen biotik dan abiotik dengan tepat. Kamu mendapatkan <strong>+50 Poin</strong> dan <strong>1 Bintang Emas ⭐</strong>!
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
