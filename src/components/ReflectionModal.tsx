import React, { useState } from 'react';
import { X, Sparkles, Heart, CheckCircle2, Award } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (bonusPoints: number) => void;
  isAlreadyCompleted?: boolean;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const [learnedNote, setLearnedNote] = useState<string>('');
  const [selectedBiotik, setSelectedBiotik] = useState<string[]>([]);
  const [selectedAbiotik, setSelectedAbiotik] = useState<string[]>([]);
  const [careReason, setCareReason] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(isAlreadyCompleted);

  if (!isOpen) return null;

  const biotikOptions = ['Pohon 🌳', 'Kelinci 🐇', 'Ikan Badut 🐠', 'Penyu 🐢', 'Burung 🐦', 'Kaktus 🌵', 'Padi 🌾'];
  const abiotikOptions = ['Air Sungai 💧', 'Batu Karang 🪨', 'Sinar Matahari ☀️', 'Tanah Lumpur 🟤', 'Udara / Angin 💨', 'Pasir Laut 🏖️'];
  const careReasons = [
    'Agar makhluk hidup dan lingkungan tetap seimbang dan lestari 🌱',
    'Agar hewan dan tumbuhan tidak punah dan air tetap bersih 💧',
    'Sebagai rasa syukur kita kepada Tuhan atas keindahan alam semesta 🌟',
    'Supaya anak cucu kita kelak masih bisa menikmati bumi yang sehat 🌎'
  ];

  const handleToggleBiotik = (item: string) => {
    sound.playPop();
    if (selectedBiotik.includes(item)) {
      setSelectedBiotik(selectedBiotik.filter((i) => i !== item));
    } else {
      if (selectedBiotik.length < 2) {
        setSelectedBiotik([...selectedBiotik, item]);
      } else {
        setSelectedBiotik([selectedBiotik[1], item]);
      }
    }
  };

  const handleToggleAbiotik = (item: string) => {
    sound.playPop();
    if (selectedAbiotik.includes(item)) {
      setSelectedAbiotik(selectedAbiotik.filter((i) => i !== item));
    } else {
      if (selectedAbiotik.length < 2) {
        setSelectedAbiotik([...selectedAbiotik, item]);
      } else {
        setSelectedAbiotik([selectedAbiotik[1], item]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedBiotik.length < 2 || selectedAbiotik.length < 2 || !careReason) {
      sound.playWrong();
      alert('Pilih 2 contoh biotik, 2 contoh abiotik, dan alasan menjaga ekosistem ya sahabat cilik! 😊');
      return;
    }

    sound.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    onComplete(30);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-purple-400 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              💭
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wide">
                Refleksi Penjelajah Pintar
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 font-medium">
                Apa yang kamu pelajari dan rasakan hari ini?
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-slate-800 text-sm sm:text-base">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="text-6xl animate-bounce">🌟 🎖️ 🌟</div>
              <h3 className="text-2xl font-black text-purple-900 font-heading">
                Hebat Sekali, Sahabat Cilik!
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Kamu telah menyelesaikan refleksi petualanganmu dengan penuh ketelitian dan kebijaksanaan. Kamu berhak mendapatkan <strong>+30 Poin & Bintang Emas</strong>!
              </p>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm">
                <div>🌱 <strong>Pilihan Biotik:</strong> {selectedBiotik.join(', ') || 'Pohon, Kelinci'}</div>
                <div>💧 <strong>Pilihan Abiotik:</strong> {selectedAbiotik.join(', ') || 'Air, Matahari'}</div>
                <div>💖 <strong>Komitmen Alam:</strong> {careReason || 'Menjaga bumi tetap asri.'}</div>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg game-btn cursor-pointer"
              >
                Lanjutkan Petualangan 🚀
              </button>
            </div>
          ) : (
            <>
              {/* Question 1: Apa yang kamu pelajari */}
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                <label className="font-bold text-amber-950 flex items-center gap-2 mb-1.5 text-sm sm:text-base">
                  <span>1.</span> Apa hal paling menarik yang kamu pelajari hari ini?
                </label>
                <input
                  type="text"
                  value={learnedNote}
                  onChange={(e) => setLearnedNote(e.target.value)}
                  placeholder="Contoh: Ternyata terumbu karang itu makhluk hidup (biotik) lho!"
                  className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Question 2: Sebutkan 2 contoh biotik */}
              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200">
                <label className="font-bold text-emerald-950 flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <span>2.</span> Sebutkan 2 contoh komponen BIOTIK (makhluk hidup):
                  </span>
                  <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    Dipilih: {selectedBiotik.length}/2
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {biotikOptions.map((item) => {
                    const isSelected = selectedBiotik.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleBiotik(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md scale-105 border-2 border-emerald-700'
                            : 'bg-white text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        {item} {isSelected ? '✅' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Sebutkan 2 contoh abiotik */}
              <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
                <label className="font-bold text-sky-950 flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <span>3.</span> Sebutkan 2 contoh komponen ABIOTIK (benda tak hidup):
                  </span>
                  <span className="text-xs bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full font-bold">
                    Dipilih: {selectedAbiotik.length}/2
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {abiotikOptions.map((item) => {
                    const isSelected = selectedAbiotik.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleAbiotik(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-md scale-105 border-2 border-sky-700'
                            : 'bg-white text-sky-900 hover:bg-sky-100 border border-sky-200'
                        }`}
                      >
                        {item} {isSelected ? '✅' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 4: Mengapa harus menjaga ekosistem */}
              <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
                <label className="font-bold text-purple-950 block mb-2 text-sm sm:text-base">
                  4. Mengapa kita harus menjaga ekosistem agar tetap bersih dan seimbang?
                </label>
                <div className="space-y-2">
                  {careReasons.map((reason) => {
                    const isSelected = careReason === reason;
                    return (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => {
                          sound.playPop();
                          setCareReason(reason);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-md border-2 border-purple-800'
                            : 'bg-white text-purple-950 hover:bg-purple-100 border border-purple-200'
                        }`}
                      >
                        <span className="text-base">{isSelected ? '💖' : '⚪'}</span>
                        <span>{reason}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs text-slate-500">
              Isi semua pertanyaan untuk mendapatkan bintang bonus! ⭐
            </span>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md game-btn cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simpan Refleksi</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
