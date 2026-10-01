import React, { useState } from 'react';
import { AVATARS } from '../data/gameData';
import { Play, Sparkles, BookOpen, Award, Compass, Volume2, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: (name: string, avatar: string) => void;
  onOpenMateri: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenMateri,
}) => {
  const [name, setName] = useState<string>('Budi');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('👦');

  const handleStart = () => {
    sound.playFanfare();
    const finalName = name.trim() || 'Sahabat Cilik';
    onStart(finalName, selectedAvatar);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-2 space-y-6">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-b from-emerald-500 via-teal-600 to-sky-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Floating background decorations */}
        <div className="absolute top-4 left-6 text-5xl opacity-30 animate-float pointer-events-none">🌳</div>
        <div className="absolute top-6 right-8 text-5xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '1.2s' }}>🌊</div>
        <div className="absolute bottom-6 left-10 text-5xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>🌾</div>
        <div className="absolute bottom-6 right-10 text-5xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '0.8s' }}>🏜️</div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 font-black px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>GAME EDUKASI IPAS KELAS 3 SD • FASE B</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-wide leading-tight drop-shadow-md">
            🌎 PETUALANGAN SERU DI DUNIA EKOSISTEM 🌱
          </h1>

          <p className="text-lg sm:text-2xl text-amber-200 font-extrabold font-heading italic">
            "Kenali Sahabat Biotik dan Abiotik!"
          </p>

          <p className="text-xs sm:text-base text-emerald-100 leading-relaxed font-medium">
            Jelajahi <strong>Hutan, Laut, Gurun, dan Sawah</strong>. Kumpulkan bintang, pasangkan benda hidup dan tak hidup, selamatkan alam, dan raih sertifikat <strong>Penjelajah Ekosistem Hebat!</strong>
          </p>
        </div>
      </div>

      {/* Profile & Character Setup Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
            Siapkan Diri Menjadi Penjelajah Cilik! 🎒
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tulis namamu dan pilih karakter petualang yang kamu sukai di bawah ini:
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap / Panggilan:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi / Siti"
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 focus:outline-none text-base sm:text-lg font-bold text-slate-800 text-center shadow-inner"
            />
          </div>

          {/* Avatar Options */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 text-center">
              Pilih Karakter Favorit:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.emoji;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedAvatar(av.emoji);
                    }}
                    className={`p-3 rounded-2xl border-2 transition text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:bg-amber-50/70'
                    }`}
                  >
                    <span className="text-4xl animate-bounce">{av.emoji}</span>
                    <span className="text-xs font-bold text-slate-800">{av.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onOpenMateri();
            }}
            className="w-full sm:w-auto bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300 font-bold px-6 py-3 rounded-2xl text-sm transition cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Baca Materi Dahulu</span>
          </button>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black px-8 py-3.5 rounded-2xl text-base sm:text-lg shadow-xl game-btn cursor-pointer flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>MULAI PETUALANGAN! 🚀</span>
          </button>
        </div>
      </div>

      {/* Learning Goals Banner for Teachers / Parents */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
        <span className="text-2xl shrink-0">🎓</span>
        <div className="space-y-1">
          <div className="font-bold text-amber-950">Tujuan Pembelajaran IPAS Kelas 3 SD Fase B:</div>
          <p className="text-slate-600 leading-relaxed text-xs">
            1. Mengidentifikasi komponen biotik (makhluk hidup) & abiotik (benda tak hidup).<br />
            2. Mengelompokkan komponen biotik & abiotik pada 4 ekosistem (hutan, laut, gurun, sawah).<br />
            3. Memahami pentingnya menjaga keseimbangan dan kelestarian ekosistem bumi.
          </p>
        </div>
      </div>
    </div>
  );
};
