import React from 'react';
import { EcosystemData, PlayerProfile, ScreenState } from '../types/game';
import { ArrowLeft, CheckCircle2, Play, Sparkles, Star, Award, Compass, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface EcosystemHubProps {
  ecosystem: EcosystemData;
  player: PlayerProfile;
  onSelectGame: (screen: ScreenState) => void;
  onBackToMap: () => void;
  onOpenMateri: () => void;
}

export const EcosystemHub: React.FC<EcosystemHubProps> = ({
  ecosystem,
  player,
  onSelectGame,
  onBackToMap,
  onOpenMateri,
}) => {
  const games = [
    {
      id: 'minigame_find' as ScreenState,
      key: `${ecosystem.id}_find`,
      title: 'Mini-Game 1: Temukan Siapa Aku?',
      icon: '🔍',
      desc: `Amati gambar ${ecosystem.name} dan klik semua benda yang termasuk komponen BIOTIK!`,
      reward: '+50 Poin • ⭐ Bintang',
      badge: 'Biotik Detective',
    },
    {
      id: 'minigame_match' as ScreenState,
      key: `${ecosystem.id}_match`,
      title: 'Mini-Game 2: Pasangkan Teman Ekosistem',
      icon: '⚖️',
      desc: 'Kelompokkan benda-benda alam ke keranjang BIOTIK atau ABIOTIK yang tepat.',
      reward: '+50 Poin • ⭐ Bintang',
      badge: 'Sorter Master',
    },
    {
      id: 'minigame_hunt' as ScreenState,
      key: `${ecosystem.id}_hunt`,
      title: 'Mini-Game 3: Berburu Biotik',
      icon: '🏃',
      desc: 'Jelajahi jalur alam dan tangkap 5 komponen biotik di sepanjang perjalanan.',
      reward: '+50 Poin • ⭐ Bintang',
      badge: 'Safari Runner',
    },
    {
      id: 'minigame_quiz' as ScreenState,
      key: `${ecosystem.id}_quiz`,
      title: `Mini-Game 4: Kuis Cepat ${ecosystem.name}`,
      icon: '🧠',
      desc: 'Tantang pengetahuanmu dengan 5 pertanyaan pilihan ganda yang mendidik.',
      reward: 'Hingga +50 Poin • ⭐ Bintang',
      badge: 'Quiz Genius',
    },
    {
      id: 'minigame_rescue' as ScreenState,
      key: `${ecosystem.id}_rescue`,
      title: 'Mini-Game 5: Misi Menyelamatkan Ekosistem',
      icon: '🛡️',
      desc: 'Bersihkan sampah yang mencemari alam dan ambil keputusan terbaik demi kelestarian.',
      reward: '+60 Poin • ⭐ Bintang',
      badge: 'Eco Guardian',
    },
    {
      id: 'minigame_guess' as ScreenState,
      key: `${ecosystem.id}_guess`,
      title: 'Mini-Game 6: Tebak Ekosistem',
      icon: '🧭',
      desc: 'Pecahkan teka-teki misteri pengamatan lingkungan di alam bebas.',
      reward: '+60 Poin • ⭐ Bintang',
      badge: 'Mystery Solver',
    },
    {
      id: 'minigame_wheel' as ScreenState,
      key: `${ecosystem.id}_wheel`,
      title: 'Mini-Game 7: Roda Keberuntungan',
      icon: '🎡',
      desc: 'Putar roda warna-warni dan jawab tantangan kuis untuk meraih poin emas!',
      reward: 'Bonus Poin Melimpah',
      badge: 'Wheel Champion',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur p-3 sm:p-4 rounded-2xl border-2 border-emerald-300 shadow-sm">
        <button
          onClick={() => {
            sound.playPop();
            onBackToMap();
          }}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Dunia</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onOpenMateri();
            }}
            className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>Baca Materi IPAS</span>
          </button>
        </div>
      </div>

      {/* Ecosystem Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${ecosystem.color} text-white shadow-xl relative overflow-hidden border-4 border-white/40`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <span>Level {ecosystem.levelNumber}</span>
              <span>•</span>
              <span>Eksplorasi Alam</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-wide">
              {ecosystem.icon} {ecosystem.name}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
              {ecosystem.description}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs font-extrabold uppercase text-white/80">Progres Wilayah</div>
            <div className="text-2xl font-black text-yellow-300 my-1">
              ⭐ {player.completedLevels.includes(ecosystem.id) ? 'Wilayah Selesai!' : 'Sedang Dijelajahi'}
            </div>
            <div className="text-[11px] text-white/90 font-medium">
              Selesaikan mini-game untuk mengumpulkan bintang!
            </div>
          </div>
        </div>
      </div>

      {/* Mini-Games List */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
            🎮 Pilih Misi & Mini-Game ({games.length} Permainan)
          </h2>
          <span className="text-xs text-slate-500 font-bold hidden sm:inline">
            Bebas memilih game mana saja!
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {games.map((g) => {
            const isDone = !!player.completedMinigames[g.key];

            return (
              <div
                key={g.id}
                className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition shadow-inner">
                    {g.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-black text-slate-900 text-sm sm:text-base font-heading">
                        {g.title}
                      </h3>
                      {isDone && (
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      {g.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                  <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    {g.reward}
                  </span>

                  <button
                    onClick={() => {
                      sound.playPop();
                      onSelectGame(g.id);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-xl shadow-sm game-btn cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isDone ? 'Main Lagi' : 'Mulai Main'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
