import React from 'react';
import { X, Award, Star, CheckCircle, Lock, Trophy } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerProfile;
  onOpenCertificate: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  player,
  onOpenCertificate,
}) => {
  if (!isOpen) return null;

  const BADGES = [
    {
      id: 'hutan_master',
      title: 'Penjelajah Rimba Hutan',
      icon: '🌳',
      desc: 'Selesaikan misi petualangan di Hutan Hujan Tropis.',
      isUnlocked: player.completedLevels.includes('hutan'),
    },
    {
      id: 'laut_master',
      title: 'Sahabat Samudra Biru',
      icon: '🌊',
      desc: 'Selesaikan misi petualangan di Laut Biru Nusantara.',
      isUnlocked: player.completedLevels.includes('laut'),
    },
    {
      id: 'gurun_master',
      title: 'Penakluk Gurun Sahara',
      icon: '🏜️',
      desc: 'Selesaikan misi petualangan di Gurun Sahara Emas.',
      isUnlocked: player.completedLevels.includes('gurun'),
    },
    {
      id: 'sawah_master',
      title: 'Pahlawan Pangan Sawah',
      icon: '🌾',
      desc: 'Selesaikan misi petualangan di Sawah Hijau Makmur.',
      isUnlocked: player.completedLevels.includes('sawah'),
    },
    {
      id: 'star_collector',
      title: 'Kolektor Bintang Emas',
      icon: '⭐',
      desc: 'Kumpulkan minimal 5 bintang emas dalam permainan.',
      isUnlocked: player.stars >= 5,
    },
    {
      id: 'eco_hero',
      title: 'Pahlawan Penjaga Bumi',
      icon: '🛡️',
      desc: 'Berhasil membersihkan lingkungan pada misi penyelamatan.',
      isUnlocked: Object.keys(player.completedMinigames).some((k) => k.includes('rescue')),
    },
    {
      id: 'grand_champion',
      title: 'Penjelajah Ekosistem Hebat!',
      icon: '🏆',
      desc: 'Jelajahi ke-4 ekosistem dan buktikan pemahamanmu.',
      isUnlocked: player.completedLevels.length >= 4,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              🏅
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wide">
                Galeri Medali & Prestasi
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                Pencapaian Petualangan: {player.name}
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Certificate Banner Callout */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="text-4xl">📜</div>
              <div>
                <div className="font-bold text-base sm:text-lg leading-tight">
                  Sertifikat Penjelajah Ekosistem
                </div>
                <div className="text-xs text-emerald-100">
                  {player.completedLevels.length >= 1
                    ? 'Sudah siap dicetak atau dilihat kapan saja!'
                    : 'Selesaikan minimal 1 level untuk membuka sertifikat resmimu.'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenCertificate();
              }}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Lihat Sertifikat 🌟
            </button>
          </div>

          <h3 className="font-bold text-slate-800 text-sm sm:text-base pt-2">
            Medali yang Telah Kamu Kumpulkan:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 transition ${
                  badge.isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-inner ${
                    badge.isUnlocked ? 'bg-amber-300 text-amber-900 border border-amber-400' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                    <span>{badge.title}</span>
                    {badge.isUnlocked && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Terus jelajahi semua level untuk membuka semua medali! 🌟</span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-sm game-btn cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
