import React, { useState, useEffect } from 'react';
import { PlayerProfile, ScreenState, EcosystemType } from './types/game';
import { ECOSYSTEMS } from './data/gameData';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { WorldMap } from './components/WorldMap';
import { EcosystemHub } from './components/EcosystemHub';
import { FindWhoIAm } from './components/minigames/FindWhoIAm';
import { MatchingPairs } from './components/minigames/MatchingPairs';
import { HuntBiotik } from './components/minigames/HuntBiotik';
import { QuickQuiz } from './components/minigames/QuickQuiz';
import { EcoRescue } from './components/minigames/EcoRescue';
import { GuessEcosystem } from './components/minigames/GuessEcosystem';
import { FortuneWheel } from './components/minigames/FortuneWheel';
import { MateriModal } from './components/MateriModal';
import { ReflectionModal } from './components/ReflectionModal';
import { AchievementsModal } from './components/AchievementsModal';
import { CertificateModal } from './components/CertificateModal';
import { ProfileModal } from './components/ProfileModal';

const STORAGE_KEY = 'ekosistem_petualangan_player_v1';

export default function App() {
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      name: 'Budi',
      avatar: '👦',
      points: 0,
      stars: 0,
      hearts: 5,
      completedLevels: [],
      completedMinigames: {},
      badges: [],
    };
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenState>('welcome');
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<EcosystemType>('hutan');

  // Modals state
  const [isMateriOpen, setIsMateriOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Audio state
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isBgmOn, setIsBgmOn] = useState(false);

  // Persist to localStorage whenever player changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch {
      // ignore
    }
  }, [player]);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (muted) setIsBgmOn(false);
  };

  const handleToggleBgm = () => {
    if (isBgmOn) {
      sound.stopBGM();
      setIsBgmOn(false);
    } else {
      sound.startBGM();
      setIsBgmOn(true);
    }
  };

  const handleStartGame = (name: string, avatar: string) => {
    setPlayer((prev) => ({
      ...prev,
      name,
      avatar,
    }));
    setCurrentScreen('world_map');
  };

  const handleSaveProfile = (name: string, avatar: string) => {
    setPlayer((prev) => ({
      ...prev,
      name,
      avatar,
    }));
  };

  const handleSelectEcosystem = (type: EcosystemType) => {
    setSelectedEcosystemId(type);
    setCurrentScreen('ecosystem_hub');
  };

  const handleSelectMiniGame = (screen: ScreenState) => {
    setCurrentScreen(screen);
  };

  // Award rewards when completing a mini-game
  const handleReward = (gameKey: string, points: number, stars: number) => {
    setPlayer((prev) => {
      const newPoints = prev.points + points;
      const newStars = prev.stars + stars;
      const newCompletedMinigames = {
        ...prev.completedMinigames,
        [gameKey]: true,
      };

      // Check if current ecosystem can be marked as completed
      // If student completed at least 2 mini-games in this realm or completed level
      let updatedCompletedLevels = [...prev.completedLevels];
      if (!updatedCompletedLevels.includes(selectedEcosystemId)) {
        updatedCompletedLevels.push(selectedEcosystemId);
      }

      return {
        ...prev,
        points: newPoints,
        stars: newStars,
        completedMinigames: newCompletedMinigames,
        completedLevels: updatedCompletedLevels,
      };
    });
  };

  const currentEcosystem = ECOSYSTEMS[selectedEcosystemId] || ECOSYSTEMS.hutan;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/60 text-slate-800 antialiased">
      {/* Top Header */}
      <Header
        player={player}
        currentScreen={currentScreen}
        onOpenMateri={() => setIsMateriOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenReflection={() => setIsReflectionOpen(true)}
        onGoWorldMap={() => setCurrentScreen('world_map')}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBgmOn={isBgmOn}
        onToggleBgm={handleToggleBgm}
        onChangeNameClick={() => setIsProfileOpen(true)}
      />

      {/* Main Game Screen Canvas */}
      <main className="flex-1 p-3 sm:p-6 max-w-7xl w-full mx-auto">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartGame}
            onOpenMateri={() => setIsMateriOpen(true)}
          />
        )}

        {currentScreen === 'world_map' && (
          <WorldMap
            player={player}
            onSelectEcosystem={handleSelectEcosystem}
            onPlayGlobalGame={(game) => setCurrentScreen(game)}
            onOpenMateri={() => setIsMateriOpen(true)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
          />
        )}

        {currentScreen === 'ecosystem_hub' && (
          <EcosystemHub
            ecosystem={currentEcosystem}
            player={player}
            onSelectGame={handleSelectMiniGame}
            onBackToMap={() => setCurrentScreen('world_map')}
            onOpenMateri={() => setIsMateriOpen(true)}
          />
        )}

        {/* Mini-Games */}
        {currentScreen === 'minigame_find' && (
          <FindWhoIAm
            ecosystem={currentEcosystem}
            onComplete={(pts, stars) => handleReward(`${selectedEcosystemId}_find`, pts, stars)}
            onBack={() => setCurrentScreen('ecosystem_hub')}
          />
        )}

        {currentScreen === 'minigame_match' && (
          <MatchingPairs
            onComplete={(pts, stars) => handleReward(`${selectedEcosystemId}_match`, pts, stars)}
            onBack={() => setCurrentScreen('ecosystem_hub')}
          />
        )}

        {currentScreen === 'minigame_hunt' && (
          <HuntBiotik
            ecosystem={currentEcosystem}
            playerAvatar={player.avatar}
            playerName={player.name}
            onComplete={(pts, stars) => handleReward(`${selectedEcosystemId}_hunt`, pts, stars)}
            onBack={() => setCurrentScreen('ecosystem_hub')}
          />
        )}

        {currentScreen === 'minigame_quiz' && (
          <QuickQuiz
            ecosystem={currentEcosystem}
            onComplete={(pts, stars) => handleReward(`${selectedEcosystemId}_quiz`, pts, stars)}
            onBack={() => setCurrentScreen('ecosystem_hub')}
          />
        )}

        {currentScreen === 'minigame_rescue' && (
          <EcoRescue
            ecosystem={currentEcosystem}
            onComplete={(pts, stars) => handleReward(`${selectedEcosystemId}_rescue`, pts, stars)}
            onBack={() => setCurrentScreen('ecosystem_hub')}
          />
        )}

        {currentScreen === 'minigame_guess' && (
          <GuessEcosystem
            onComplete={(pts, stars) => handleReward('global_guess', pts, stars)}
            onBack={() => setCurrentScreen('world_map')}
          />
        )}

        {currentScreen === 'minigame_wheel' && (
          <FortuneWheel
            onComplete={(pts, stars) => handleReward('global_wheel', pts, stars)}
            onBack={() => setCurrentScreen('world_map')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 px-4 text-center text-xs text-slate-500 border-t border-amber-200 bg-white/70">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🌎 <strong>Petualangan Seru di Dunia Ekosistem</strong> • Pembelajaran IPAS Fase B Kelas 3 SD
          </div>
          <div className="flex items-center gap-3 font-semibold text-slate-600">
            <span>Biotik = Makhluk Hidup 🌱</span>
            <span>•</span>
            <span>Abiotik = Benda Tak Hidup 💧</span>
          </div>
        </div>
      </footer>

      {/* Educational Modals */}
      <MateriModal
        isOpen={isMateriOpen}
        onClose={() => setIsMateriOpen(false)}
      />

      <ReflectionModal
        isOpen={isReflectionOpen}
        onClose={() => setIsReflectionOpen(false)}
        onComplete={(bonusPoints) => handleReward('reflection_completed', bonusPoints, 1)}
        isAlreadyCompleted={!!player.completedMinigames['reflection_completed']}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        player={player}
        onOpenCertificate={() => {
          setIsAchievementsOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        player={player}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentName={player.name}
        currentAvatar={player.avatar}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
