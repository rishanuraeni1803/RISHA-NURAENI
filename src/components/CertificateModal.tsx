import React from 'react';
import { X, Printer, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { sound } from '../utils/sound';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  player,
}) => {
  if (!isOpen) return null;

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden">
        {/* Modal Toolbar (hidden in print) */}
        <div className="bg-slate-800 text-white p-3 sm:px-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Sertifikat Digital Penjelajah Ekosistem</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-3 py-1.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-amber-50/50 flex items-center justify-center">
          <div className="w-full bg-white p-6 sm:p-10 rounded-2xl border-8 border-double border-amber-500 shadow-xl relative overflow-hidden text-center">
            {/* Background watermark/patterns */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

            {/* Corner Ribbons */}
            <div className="text-3xl sm:text-4xl absolute top-3 left-4">🌿</div>
            <div className="text-3xl sm:text-4xl absolute top-3 right-4">💧</div>
            <div className="text-3xl sm:text-4xl absolute bottom-3 left-4">☀️</div>
            <div className="text-3xl sm:text-4xl absolute bottom-3 right-4">🌱</div>

            {/* Certificate Header */}
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-3xl shadow-lg border-2 border-white mb-2">
                🏅
              </div>
              <h1 className="text-xs sm:text-sm uppercase tracking-widest font-black text-amber-700 font-heading">
                KEMENTERIAN PENDIDIKAN DASAR & PENJELAJAH ALAM
              </h1>
              <h2 className="text-2xl sm:text-4xl font-black text-emerald-800 font-heading mt-1">
                SERTIFIKAT PENGHARGAAN
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-emerald-600 tracking-wider">
                MATA PELAJARAN ILMU PENGETAHUAN ALAM & SOSIAL (IPAS) • FASE B
              </div>
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-amber-400 mx-auto my-3 rounded-full" />

            {/* Recipient */}
            <div className="my-5">
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Diberikan dengan bangga kepada Penjelajah Hebat:
              </p>
              <div className="text-2xl sm:text-4xl font-black text-amber-900 font-heading py-2 border-b-2 border-dashed border-amber-300 inline-block px-8 max-w-full truncate">
                {player.name || 'Sahabat Pintar IPAS'}
              </div>
              <p className="text-xs text-slate-500 mt-1">Siswa Kelas 3 SD Fase B</p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed my-4">
              Telah berhasil menjelajahi <strong>4 Ekosistem (Hutan, Laut, Gurun, dan Sawah)</strong> serta menunjukkan kecakapan luar biasa dalam mengenali dan membedakan <strong>Komponen Biotik (Makhluk Hidup)</strong> dan <strong>Komponen Abiotik (Benda Tak Hidup)</strong> dengan penuh semangat dan rasa cinta lingkungan.
            </p>

            {/* Achievements stats on certificate */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto my-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2">
                <div className="text-xs text-amber-800 font-bold">Bintang Emas</div>
                <div className="text-lg sm:text-xl font-black text-amber-600">⭐ {player.stars}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2">
                <div className="text-xs text-emerald-800 font-bold">Total Poin</div>
                <div className="text-lg sm:text-xl font-black text-emerald-600">🪙 {player.points}</div>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-2">
                <div className="text-xs text-sky-800 font-bold">Gelar Juara</div>
                <div className="text-xs sm:text-sm font-black text-sky-700 truncate">Penjelajah Hebat</div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-4 flex items-center justify-between max-w-lg mx-auto text-xs sm:text-sm text-slate-600">
              <div className="text-left">
                <div>Tanggal: <strong>{todayStr}</strong></div>
                <div className="mt-8 pt-1 border-t border-slate-400 font-bold text-slate-800">
                  Guru Pembimbing IPAS
                </div>
              </div>

              {/* Digital Gold Seal */}
              <div className="w-20 h-20 rounded-full border-4 border-amber-500 bg-amber-100 flex flex-col items-center justify-center shadow-md rotate-[-6deg] p-1">
                <span className="text-xs font-black text-amber-900 leading-tight">RESMI</span>
                <span className="text-xl">🌟</span>
                <span className="text-[9px] font-bold text-amber-800">TERVERIFIKASI</span>
              </div>

              <div className="text-right">
                <div>Status: <span className="text-emerald-700 font-bold">LULUS GEMILANG</span></div>
                <div className="mt-8 pt-1 border-t border-slate-400 font-bold text-slate-800">
                  Kepala Petualangan Ekosistem
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 print:hidden">
          💡 Tips: Klik tombol <strong>Cetak / Simpan PDF</strong> di kanan atas untuk mencetak atau menyimpan sertifikat ke komputermu!
        </div>
      </div>
    </div>
  );
};
