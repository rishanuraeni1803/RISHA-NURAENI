import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, Leaf, Droplets, Sun, Wind, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface MateriModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MateriModal: React.FC<MateriModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'konsep' | 'biotik' | 'abiotik' | 'interaksi' | 'tips'>('konsep');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
              📖
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-wide">
                Kamus Pintar & Materi IPAS
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Ekosistem: Sahabat Biotik dan Abiotik (Kelas 3 SD Fase B)
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

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto p-2 bg-amber-50 border-b border-amber-200 gap-1.5 scrollbar-none">
          {[
            { id: 'konsep', label: '1. Apa itu Ekosistem?', emoji: '🌎' },
            { id: 'biotik', label: '2. Komponen Biotik', emoji: '🌱' },
            { id: 'abiotik', label: '3. Komponen Abiotik', emoji: '💧' },
            { id: 'interaksi', label: '4. Interaksi Sahabat', emoji: '🤝' },
            { id: 'tips', label: '5. Jaga Alam Kita', emoji: '🛡️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          {activeTab === 'konsep' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex gap-3 items-start">
                <div className="text-4xl">🌱</div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-base sm:text-lg mb-1">
                    Apa yang Dimaksud dengan Ekosistem?
                  </h3>
                  <p className="text-emerald-800 text-sm sm:text-base">
                    <strong>Ekosistem</strong> adalah sebuah hubungan timbal balik (saling membutuhkan) antara <strong>makhluk hidup (biotik)</strong> dengan <strong>lingkungan sekitarnya yang tak hidup (abiotik)</strong> di suatu tempat.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-lime-50 border border-lime-200 rounded-2xl p-3.5">
                  <div className="text-2xl mb-1">🌿 Biotik (Hidup)</div>
                  <p className="text-xs sm:text-sm text-lime-900">
                    Berasal dari kata <em>"Bio"</em> yang berarti <strong>hidup</strong>. Contohnya: Manusia, Hewan, Tumbuhan, dan Jamur.
                  </p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5">
                  <div className="text-2xl mb-1">💧 Abiotik (Tak Hidup)</div>
                  <p className="text-xs sm:text-sm text-sky-900">
                    Berasal dari kata <em>"A"</em> (tidak) dan <em>"Bio"</em> (hidup). Benda-benda fisik tak bernyawa pendukung kehidupan: air, batu, tanah, udara, matahari.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs sm:text-sm text-amber-900">
                💡 <strong>Tahukah Kamu?</strong> Di bumi ada banyak jenis ekosistem, lho! Ada ekosistem alami seperti <strong>Hutan, Laut, dan Gurun</strong>, serta ekosistem buatan manusia seperti <strong>Sawah dan Kolam Ikan</strong>!
              </div>
            </div>
          )}

          {activeTab === 'biotik' && (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4">
                <h3 className="font-bold text-green-900 text-lg mb-2 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Ciri-Ciri Utama Makhluk Hidup (Biotik):
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-green-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>1. Bernapas:</strong> Menghirup oksigen dan melepaskan karbon dioksida.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>2. Butuh Makan & Minum:</strong> Untuk energi bertumbuh dan beraktivitas.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>3. Bertumbuh:</strong> Dari kecil menjadi besar (misal biji jadi pohon rindang).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>4. Berkembang Biak:</strong> Memiliki keturunan / anak (bertelur, melahirkan, berbuah).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>5. Bergerak & Peka Rangsang:</strong> Merespons cahaya, sentuhan, atau suara.</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 bg-emerald-100 rounded-xl">
                  <div className="text-3xl mb-1">🌳</div>
                  <div className="font-bold text-emerald-900">Tumbuhan</div>
                  <div className="text-emerald-700 text-[11px]">Pohon, rumput, padi</div>
                </div>
                <div className="p-2.5 bg-amber-100 rounded-xl">
                  <div className="text-3xl mb-1">🐅</div>
                  <div className="font-bold text-amber-900">Hewan Darat</div>
                  <div className="text-amber-700 text-[11px]">Rusa, kelinci, unta</div>
                </div>
                <div className="p-2.5 bg-cyan-100 rounded-xl">
                  <div className="text-3xl mb-1">🐬</div>
                  <div className="font-bold text-cyan-900">Hewan Air</div>
                  <div className="text-cyan-700 text-[11px]">Ikan, penyu, paus</div>
                </div>
                <div className="p-2.5 bg-rose-100 rounded-xl">
                  <div className="text-3xl mb-1">🍄</div>
                  <div className="font-bold text-rose-900">Jamur & Mikroba</div>
                  <div className="text-rose-700 text-[11px]">Pengurai alami</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'abiotik' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-4">
                <h3 className="font-bold text-sky-900 text-lg mb-2 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  Komponen Abiotik (Benda Tak Hidup Penopang Kehidupan):
                </h3>
                <p className="text-sm text-sky-800 mb-3">
                  Komponen abiotik tidak bernapas dan tidak memiliki keturunan, tetapi <strong>tanpa mereka, makhluk hidup tidak akan bisa bertahan hidup!</strong>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                    <Sun className="w-6 h-6 text-amber-500 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Cahaya & Panas Matahari:</strong>
                      <p className="text-slate-600">Membantu tumbuhan fotosintesis dan menghangatkan bumi.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                    <Droplets className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Air:</strong>
                      <p className="text-slate-600">Dibutuhkan untuk minum, menyiram tanaman, dan tempat tinggal ikan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                    <Wind className="w-6 h-6 text-teal-500 shrink-0" />
                    <div>
                      <strong className="text-slate-800">Udara (Oksigen):</strong>
                      <p className="text-slate-600">Diperlukan hewan dan manusia untuk bernapas setiap detik.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-200">
                    <div className="text-xl shrink-0">🪨</div>
                    <div>
                      <strong className="text-slate-800">Tanah & Batuan:</strong>
                      <p className="text-slate-600">Tempat berpijak, menancapkan akar tumbuhan, dan menyimpan hara.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interaksi' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
                <h3 className="font-bold text-purple-900 text-lg mb-2">
                  🤝 Contoh Sahabat Sejati: Interaksi Biotik & Abiotik
                </h3>
                <p className="text-xs sm:text-sm text-purple-800 mb-3">
                  Komponen biotik dan abiotik saling memengaruhi secara terus-menerus:
                </p>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="bg-white p-3 rounded-xl border border-purple-200 flex items-center gap-3">
                    <span className="text-2xl">🌱 ☀️ 💧</span>
                    <div>
                      <strong>Tumbuhan & Matahari + Air:</strong>
                      <p className="text-slate-600">Tumbuhan (biotik) menyerap air dari tanah dan sinar matahari (abiotik) untuk membuat makanannya.</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-200 flex items-center gap-3">
                    <span className="text-2xl">🐟 🌊</span>
                    <div>
                      <strong>Ikan & Air Laut:</strong>
                      <p className="text-slate-600">Ikan (biotik) menyerap oksigen yang terlarut di dalam air asin (abiotik).</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-200 flex items-center gap-3">
                    <span className="text-2xl">🪱 🟫</span>
                    <div>
                      <strong>Cacing & Tanah Lumpur:</strong>
                      <p className="text-slate-600">Cacing (biotik) membuat lorong-lorong yang menggemburkan tanah (abiotik) sehingga menjadi subur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
                <h3 className="font-bold text-amber-900 text-lg mb-2">
                  🛡️ Mengapa Kita Harus Menjaga Ekosistem?
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 mb-3">
                  Jika satu komponen rusak, seluruh ekosistem bisa terganggu. Mari kita jadi Pahlawan Penjaga Alam!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                    <span className="text-xl">🗑️</span>
                    <span>Buang sampah pada tempatnya, jangan ke sungai atau laut.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                    <span className="text-xl">🌱</span>
                    <span>Menanam pohon dan merawat tanaman di sekitar rumah.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                    <span className="text-xl">💧</span>
                    <span>Hemat menggunakan air bersih setiap hari.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                    <span className="text-xl">🐾</span>
                    <span>Menyayangi hewan dan tidak merusak sarang mereka.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-sm shadow-md game-btn cursor-pointer"
          >
            Aku Sudah Paham! Ayo Main 🎮
          </button>
        </div>
      </div>
    </div>
  );
};
