import React from 'react';
import { PlayerProfile } from '../types/game';
import { Volume2, VolumeX, Music, BookOpen, Award, Sparkles, MapPin, MessageSquare } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  player: PlayerProfile;
  currentScreen: string;
  onOpenMateri: () => void;
  onOpenAchievements: () => void;
  onOpenReflection: () => void;
  onGoWorldMap: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBgmOn: boolean;
  onToggleBgm: () => void;
  onChangeNameClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  player,
  currentScreen,
  onOpenMateri,
  onOpenAchievements,
  onOpenReflection,
  onGoWorldMap,
  isMuted,
  onToggleMute,
  isBgmOn,
  onToggleBgm,
  onChangeNameClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-md px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Player Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onChangeNameClick}
            title="Ganti Karakter / Nama"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border-2 border-amber-400 shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-2xl shadow-inner border border-amber-500">
              {player.avatar}
            </div>
            <div className="hidden xs:block">
              <div className="text-xs font-bold text-amber-900 leading-tight flex items-center gap-1">
                <span>{player.name}</span>
                <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">Kelas 3</span>
              </div>
              <div className="text-[11px] text-amber-700 font-semibold">Penjelajah Alam 🌱</div>
            </div>
          </button>

          {/* Stats Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Stars */}
            <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-xl border-2 border-yellow-300 text-yellow-800 font-bold text-xs sm:text-sm shadow-sm" title="Bintang yang terkumpul">
              <span className="text-amber-500 text-base">⭐</span>
              <span>{player.stars}</span>
            </div>

            {/* Coins / Points */}
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border-2 border-amber-300 text-amber-800 font-bold text-xs sm:text-sm shadow-sm" title="Poin Petualangan">
              <span className="text-base">🪙</span>
              <span>{player.points}</span>
            </div>

            {/* Hearts */}
            <div className="hidden sm:flex items-center gap-0.5 bg-rose-50 px-2 py-1 rounded-xl border-2 border-rose-300 text-rose-600 font-bold text-xs shadow-sm" title="Semangat Petualang">
              {Array.from({ length: Math.min(player.hearts, 5) }).map((_, i) => (
                <span key={i} className="text-rose-500 animate-pulse">❤️</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions and Audio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {currentScreen !== 'world_map' && currentScreen !== 'welcome' && (
            <button
              onClick={() => {
                sound.playPop();
                onGoWorldMap();
              }}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm game-btn cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Peta Dunia</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playPop();
              onOpenMateri();
            }}
            className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white px-2 sm:px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm game-btn cursor-pointer"
            title="Buku Panduan Materi IPAS"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Materi IPAS</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenReflection();
            }}
            className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm game-btn cursor-pointer"
            title="Refleksi Belajar Hari Ini"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden lg:inline">Refleksi</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenAchievements();
            }}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-2 sm:px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm game-btn cursor-pointer"
            title="Medali & Sertifikat"
          >
            <Award className="w-4 h-4" />
            <span className="hidden md:inline">Prestasi</span>
          </button>

          {/* Sound Effect Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition cursor-pointer ${
              isMuted
                ? 'bg-slate-100 border-slate-300 text-slate-400'
                : 'bg-emerald-100 border-emerald-400 text-emerald-700 hover:bg-emerald-200'
            }`}
            title={isMuted ? 'Suara Mati (Klik untuk Nyalakan)' : 'Suara Nyala (Klik untuk Matikan)'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleBgm}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition cursor-pointer ${
              isBgmOn
                ? 'bg-amber-100 border-amber-400 text-amber-700 hover:bg-amber-200 animate-pulse'
                : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
            title={isBgmOn ? 'Musik Latar Nyala (Klik untuk Matikan)' : 'Musik Latar Mati (Klik untuk Nyalakan)'}
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
