import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { AVATARS } from '../data/gameData';
import { sound } from '../utils/sound';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentAvatar: string;
  onSave: (name: string, avatar: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentAvatar,
  onSave,
}) => {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);

  if (!isOpen) return null;

  const handleSave = () => {
    const finalName = name.trim() || 'Sahabat Pintar';
    sound.playPop();
    onSave(finalName, avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-4 border-amber-400 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-amber-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎒</span>
            <h2 className="text-xl font-black font-heading">Profil Penjelajah</h2>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Penjelajah Cilik:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ketik namamu di sini..."
              maxLength={20}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none text-base font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Karakter Favoritmu:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setAvatar(av.emoji);
                  }}
                  className={`p-2.5 rounded-xl border-2 text-left transition flex items-center gap-2 cursor-pointer ${
                    avatar === av.emoji
                      ? 'bg-amber-100 border-amber-500 shadow-sm scale-102'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <span className="text-3xl">{av.emoji}</span>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-800 truncate">{av.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{av.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-sm shadow-md game-btn cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Simpan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
