import React from 'react';
import { EcosystemType, PlayerProfile } from '../types/game';
import { ECOSYSTEMS } from '../data/gameData';
import { Lock, CheckCircle2, Star, Sparkles, MapPin, Compass, ArrowRight, Play } from 'lucide-react';
import { sound } from '../utils/sound';

interface WorldMapProps {
  player: PlayerProfile;
  onSelectEcosystem: (type: EcosystemType) => void;
  onPlayGlobalGame: (game: 'minigame_guess' | 'minigame_wheel') => void;
  onOpenMateri: () => void;
  onOpenAchievements: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  player,
  onSelectEcosystem,
  onPlayGlobalGame,
  onOpenMateri,
  onOpenAchievements,
}) => {
  const ecosystemList = Object.values(ECOSYSTEMS);

  // Helper to determine if level is unlocked:
  // Level 1 (Hutan) is always unlocked.
  // Level 2 (Laut) unlocked if Level 1 completed or player has >= 1 star.
  // Level 3 (Gurun) unlocked if Level 2 completed or player has >= 2 stars.
  // Level 4 (Sawah) unlocked if Level 3 completed or player has >= 3 stars.
  const isLevelUnlocked = (type: EcosystemType, levelNum: number): boolean => {
    if (levelNum === 1) return true;
    if (levelNum === 2) return player.completedLevels.includes('hutan') || player.stars >= 1;
    if (levelNum === 3) return player.completedLevels.includes('laut') || player.stars >= 2;
    if (levelNum === 4) return player.completedLevels.includes('gurun') || player.stars >= 3;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title & Player HUD Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-3xl p-5 sm:p-7 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden">
        {/* Floating background icons */}
        <div className="absolute top-2 right-4 text-7xl opacity-20 pointer-events-none">🌎</div>
        <div className="absolute bottom-2 right-32 text-6xl opacity-20 pointer-events-none">🌱</div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-amber-200 tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IPAS KELAS 3 SD • FASE B</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-wide leading-tight">
              🌎 PETUALANGAN SERU DI DUNIA EKOSISTEM 🌱
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-semibold mt-1">
              Kenali Sahabat Biotik dan Abiotik di Berbagai Alam Semesta!
            </p>
          </div>

          {/* Player Banner */}
          <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-2xl p-3 sm:p-4 flex items-center gap-3 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-amber-200 flex items-center justify-center text-3xl shadow-md animate-bounce">
              {player.avatar}
            </div>
            <div>
              <div className="text-xs text-amber-200 font-bold uppercase">Nama Pemain:</div>
              <div className="text-lg font-black text-white">{player.name}</div>
              <div className="flex items-center gap-3 mt-0.5 text-xs font-black">
                <span className="text-yellow-300">⭐ {player.stars} Bintang</span>
                <span className="text-amber-300">🪙 {player.points} Poin</span>
                <span className="text-emerald-200">
                  🏆 Level {Math.min(player.completedLevels.length + 1, 4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* World Map Realm Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-700" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
              🗺️ Peta 4 Wilayah Ekosistem
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-600">
            Pilih wilayah yang terbuka untuk berpetualang!
          </span>
        </div>

        {/* 4 Regions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemList.map((eco) => {
            const unlocked = isLevelUnlocked(eco.id, eco.levelNumber);
            const isCompleted = player.completedLevels.includes(eco.id);

            return (
              <div
                key={eco.id}
                className={`rounded-3xl border-4 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg relative group ${
                  unlocked
                    ? 'bg-white border-amber-400 hover:shadow-2xl hover:-translate-y-1.5'
                    : 'bg-slate-100 border-slate-300 opacity-75'
                }`}
              >
                {/* Level badge banner */}
                <div className={`p-4 bg-gradient-to-r ${eco.color} text-white relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      Level {eco.levelNumber}
                    </span>
                    {isCompleted ? (
                      <span className="text-xs font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai ⭐
                      </span>
                    ) : unlocked ? (
                      <span className="text-xs font-bold bg-white/30 px-2 py-0.5 rounded-full">
                        Terbuka 🔓
                      </span>
                    ) : (
                      <span className="text-xs font-bold bg-black/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Terkunci
                      </span>
                    )}
                  </div>

                  <div className="text-center py-4">
                    <div className="text-6xl drop-shadow-md animate-bounce group-hover:scale-110 transition duration-300">
                      {eco.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black font-heading mt-2">
                      {eco.name}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {eco.description}
                  </p>

                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Ciri Khas:</div>
                    <ul className="text-xs text-slate-700 space-y-0.5">
                      {eco.keyFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1 truncate">
                          <span className="text-emerald-500">✔</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Play / Enter Button */}
                  <div className="pt-2">
                    {unlocked ? (
                      <button
                        onClick={() => {
                          sound.playPop();
                          onSelectEcosystem(eco.id);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md game-btn cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Jelajahi Sekarang!</span>
                      </button>
                    ) : (
                      <div className="bg-slate-200 text-slate-500 text-xs font-bold py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        <span>Selesaikan Level {eco.levelNumber - 1} Dahulu</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Special Mini-Games Section */}
      <div className="bg-amber-100/70 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h3 className="text-lg sm:text-xl font-black text-amber-950 font-heading">
              Arena Tantangan Spesial Penjelajah
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-800">Bisa dimainkan kapan saja!</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Tebak Ekosistem */}
          <div className="bg-white p-4 rounded-2xl border-2 border-sky-300 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-3xl">
                🧭
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Mini-Game 6: Tebak Ekosistem</h4>
                <p className="text-xs text-slate-500">Tebak lingkungan misterius dari petunjuk pengamatan.</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                onPlayGlobalGame('minigame_guess');
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-sm game-btn cursor-pointer whitespace-nowrap"
            >
              Main 🎮
            </button>
          </div>

          {/* Card 2: Roda Keberuntungan */}
          <div className="bg-white p-4 rounded-2xl border-2 border-pink-300 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-3xl">
                🎡
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Mini-Game 7: Roda Keberuntungan</h4>
                <p className="text-xs text-slate-500">Putar roda dan raih kuis berhadiah poin emas.</p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                onPlayGlobalGame('minigame_wheel');
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-sm game-btn cursor-pointer whitespace-nowrap"
            >
              Putar! 🎡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
