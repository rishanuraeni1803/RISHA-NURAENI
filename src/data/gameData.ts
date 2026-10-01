import { EcosystemData, EcosystemType, MatchItem, GuessQuestion, WheelChallenge } from '../types/game';

export const AVATARS = [
  { id: 'budi', name: 'Budi Si Penjelajah', emoji: '👦', desc: 'Suka berpetualang dan mengamati alam!' },
  { id: 'rani', name: 'Rani Sahabat Satwa', emoji: '👧', desc: 'Penyayang hewan dan suka meneliti tumbuhan!' },
  { id: 'kancil', name: 'Kancil Cerdik', emoji: '🦌', desc: 'Cepat tanggap dan pandai memecahkan teka-teki!' },
  { id: 'elang', name: 'Elang Pengamat', emoji: '🦅', desc: 'Memiliki penglihatan tajam dan teliti!' },
  { id: 'lumba', name: 'Lumba Ramah', emoji: '🐬', desc: 'Ceria, suka menolong, dan bersahabat!' },
];

export const ECOSYSTEMS: Record<EcosystemType, EcosystemData> = {
  hutan: {
    id: 'hutan',
    name: 'Hutan Hujan Tropis',
    levelNumber: 1,
    icon: '🌳',
    color: 'from-emerald-500 to-green-700',
    bgGradient: 'bg-gradient-to-b from-emerald-100 via-green-50 to-emerald-200',
    description: 'Hutan lebat yang dipenuhi pepohonan rindang, udara sejuk, tanah subur, serta aneka satwa liar yang hidup berdampingan.',
    keyFeatures: ['Banyak pohon besar & rindang', 'Hewan liar seperti burung, kera, dan rusa', 'Sungai jernih mengalir', 'Tanah gembur dan bebatuan'],
    sceneObjects: [
      { id: 'h_pohon', name: 'Pohon Rindang', type: 'biotik', emoji: '🌳', x: 18, y: 35, scale: 1.4, description: 'Pohon adalah makhluk hidup (produsen) yang menghasilkan oksigen untuk kita bernapas.', hint: 'Pohon tumbuh dari biji dan memerlukan air serta cahaya matahari.' },
      { id: 'h_burung', name: 'Burung Kutilang', type: 'biotik', emoji: '🐦', x: 28, y: 20, scale: 1.1, description: 'Burung bernapas, terbang mencari makan ulat dan buah, serta berkembang biak dengan bertelur.', hint: 'Burung bisa bergerak sendiri dan berkicau merdu.' },
      { id: 'h_kelinci', name: 'Kelinci Hutan', type: 'biotik', emoji: '🐇', x: 42, y: 72, scale: 1.1, description: 'Kelinci melompat mencari rumput segar, bertumbuh, dan memiliki anak.', hint: 'Kelinci adalah hewan mamalia yang bernyawa dan berbulu lembut.' },
      { id: 'h_kupu', name: 'Kupu-Kupu Cantik', type: 'biotik', emoji: '🦋', x: 70, y: 40, scale: 1.0, description: 'Kupu-kupu menghisap nektar bunga dan membantu penyerbukan bunga di hutan.', hint: 'Kupu-kupu mengalami metamorfosis dari ulat menjadi kepompong.' },
      { id: 'h_jamur', name: 'Jamur Liar', type: 'biotik', emoji: '🍄', x: 82, y: 76, scale: 1.0, description: 'Jamur termasuk makhluk hidup yang bertumbuh di tempat lembap dan menguraikan daun kering.', hint: 'Meskipun diam, jamur adalah makhluk hidup pembusuk alami.' },
      { id: 'h_batu', name: 'Batu Sungai Besar', type: 'abiotik', emoji: '🪨', x: 15, y: 78, scale: 1.2, description: 'Batu adalah benda tak hidup (abiotik). Batu tidak bernapas dan tidak bisa bertambah besar sendiri.', hint: 'Batu keras, tidak butuh makanan, dan tidak bisa melahirkan.' },
      { id: 'h_air', name: 'Air Sungai Jernih', type: 'abiotik', emoji: '💧', x: 55, y: 82, scale: 1.3, description: 'Air adalah komponen abiotik yang sangat dibutuhkan oleh semua makhluk hidup untuk minum.', hint: 'Air mengalir dari hulu ke hilir dan merupakan benda mati pendukung kehidupan.' },
      { id: 'h_matahari', name: 'Cahaya Matahari', type: 'abiotik', emoji: '☀️', x: 80, y: 15, scale: 1.3, description: 'Matahari memberi panas dan cahaya agar tumbuhan dapat membuat makanan melalui fotosintesis.', hint: 'Matahari di langit adalah sumber energi panas dan cahaya terbesar.' },
      { id: 'h_tanah', name: 'Tanah Humus Subur', type: 'abiotik', emoji: '🌱', x: 62, y: 65, scale: 1.0, description: 'Tanah menyediakan unsur hara dan tempat akar pohon menancap kokoh.', hint: 'Tanah adalah lingkungan fisik tempat berpijaknya tanaman.' },
      { id: 'h_angin', name: 'Udara & Hembusan Angin', type: 'abiotik', emoji: '💨', x: 50, y: 25, scale: 1.0, description: 'Udara mengandung oksigen dan karbon dioksida yang tak terlihat namun dirasakan.', hint: 'Angin adalah udara yang bergerak, tidak bernapas.' },
    ],
    quizQuestions: [
      {
        id: 'hq_1',
        question: 'Manakah dari benda berikut yang termasuk komponen BIOTIK di hutan?',
        options: ['Batu kali yang keras', 'Burung elang yang terbang', 'Air sungai yang mengalir', 'Cahaya matahari siang'],
        correctIndex: 1,
        explanation: 'Hebat! Burung elang adalah makhluk hidup (biotik) karena bernapas, bergerak, butuh makan, dan bertelur.',
        hint: 'Cari benda yang bisa bernapas dan bergerak sendiri!',
        imageEmoji: '🦅'
      },
      {
        id: 'hq_2',
        question: 'Manakah yang termasuk komponen ABIOTIK di dalam ekosistem hutan?',
        options: ['Kelinci berbulu putih', 'Pohon pinus yang tinggi', 'Udara segar yang kita hirup', 'Kupu-kupu warna-warni'],
        correctIndex: 2,
        explanation: 'Benar sekali! Udara adalah benda tak hidup (abiotik) yang diperlukan semua hewan dan tumbuhan untuk bernapas.',
        hint: 'Komponen abiotik adalah benda mati yang tidak membutuhkan makanan.',
        imageEmoji: '💨'
      },
      {
        id: 'hq_3',
        question: 'Mengapa pohon di hutan dikelompokkan ke dalam komponen biotik?',
        options: ['Karena berwarna hijau', 'Karena dapat tumbuh, hidup, dan berkembang biak', 'Karena akarnya menancap di tanah', 'Karena tidak bisa berjalan'],
        correctIndex: 1,
        explanation: 'Tepat sekali! Pohon adalah makhluk hidup karena tumbuh dari biji kecil, memerlukan nutrisi, bernapas, dan menghasilkan tunas.',
        hint: 'Pikirkan ciri-ciri makhluk hidup: tumbuh dan butuh nutrisi!',
        imageEmoji: '🌳'
      },
      {
        id: 'hq_4',
        question: 'Apa yang akan terjadi pada rusa (biotik) jika air sungai (abiotik) di hutan mengering?',
        options: ['Rusa akan semakin kuat', 'Rusa akan kehausan dan kesulitan bertahan hidup', 'Rusa bisa minum cahaya matahari', 'Rusa akan berubah menjadi batu'],
        correctIndex: 1,
        explanation: 'Pintar! Makhluk hidup (biotik) sangat bergantung pada komponen abiotik seperti air untuk bertahan hidup.',
        hint: 'Semua makhluk hidup butuh minum air agar tidak dehidrasi.',
        imageEmoji: '🦌'
      },
      {
        id: 'hq_5',
        question: 'Cahaya matahari adalah komponen abiotik. Apa manfaat pentingnya bagi tumbuhan hijau di hutan?',
        options: ['Untuk membuat makanan melalui fotosintesis', 'Agar tumbuhan bisa tidur siang', 'Untuk mencuci daun pohon', 'Agar pohon bisa terbang'],
        correctIndex: 0,
        explanation: 'Luar biasa! Tumbuhan hijau memerlukan cahaya matahari, air, dan udara untuk memasak makanannya sendiri (fotosintesis).',
        hint: 'Tumbuhan adalah koki alami yang memasak makanannya menggunakan sinar matahari!',
        imageEmoji: '☀️'
      },
    ],
    rescueMission: {
      id: 'rm_hutan',
      title: 'Selamatkan Hutan dari Sampah & Jerat!',
      scenario: 'Banyak pengunjung yang membuang botol plastik dan kaleng bekas sembarangan di pinggir sungai hutan. Rusa dan kelinci ketakutan dan air sungai tercemar!',
      problemImage: 'Tepi sungai hutan kotor dipenuhi botol, kantong kresek, dan ranting patah.',
      solvedImage: 'Hutan kembali hijau asri, air sungai berkilau jernih, rusa dan kelinci bermain dengan gembira!',
      trashItems: [
        { id: 't1', name: 'Botol Plastik Bekas', emoji: '🍾', x: 25, y: 70 },
        { id: 't2', name: 'Kantong Kresek', emoji: '🛍️', x: 45, y: 75 },
        { id: 't3', name: 'Kaleng Minuman Bekas', emoji: '🥫', x: 65, y: 68 },
        { id: 't4', name: 'Kardus Rusak', emoji: '📦', x: 80, y: 73 },
      ],
      question: 'Tindakan apa yang paling tepat untuk menjaga keseimbangan ekosistem hutan?',
      options: [
        'Menebang pohon untuk membuat pabrik plastik',
        'Membersihkan sampah dan membuangnya ke tempat daur ulang serta menjaga keasrian hutan',
        'Menangkap semua hewan hutan untuk dijual',
        'Membiarkan sampah menumpuk sampai membusuk'
      ],
      correctIndex: 1,
      explanation: 'Sempurna! Dengan memungut sampah dan menjaga pohon, komponen abiotik (tanah & air) menjadi bersih sehingga hewan dan tumbuhan (biotik) hidup sejahtera.',
      moralLesson: 'Menjaga hutan berarti menjaga sumber oksigen dan rumah bagi ribuan satwa sahabat kita!'
    }
  },

  laut: {
    id: 'laut',
    name: 'Laut Biru Nusantara',
    levelNumber: 2,
    icon: '🌊',
    color: 'from-cyan-500 to-blue-700',
    bgGradient: 'bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-200',
    description: 'Dunia bawah laut yang luas dengan air asin, terumbu karang warna-warni, serta kehidupan beraneka ragam ikan dan biota laut.',
    keyFeatures: ['Air laut terasa asin dan berombak', 'Terumbu karang sebagai rumah ikan', 'Penyu, lumba-lumba, dan ikan badut', 'Pasir putih di dasar laut'],
    sceneObjects: [
      { id: 'l_ikan', name: 'Ikan Badut (Nemo)', type: 'biotik', emoji: '🐠', x: 22, y: 45, scale: 1.2, description: 'Ikan badut bernapas dengan insang dan berenang gesit di antara anemon laut.', hint: 'Ikan badut adalah hewan laut yang aktif berenang dan mencari makan.' },
      { id: 'l_penyu', name: 'Penyu Laut Hijau', type: 'biotik', emoji: '🐢', x: 75, y: 35, scale: 1.3, description: 'Penyu bernapas dengan paru-paru, berenang jauh melintasi samudra, dan bertelur di pantai.', hint: 'Penyu adalah hewan purba yang berenang menggunakan siripnya.' },
      { id: 'l_bintang', name: 'Bintang Laut', type: 'biotik', emoji: '⭐', x: 38, y: 82, scale: 1.1, description: 'Bintang laut adalah hewan laut yang merayap di dasar pasir dan bisa meregenerasi lengannya.', hint: 'Meskipun lambat, bintang laut adalah makhluk hidup!' },
      { id: 'l_karang', name: 'Terumbu Karang', type: 'biotik', emoji: '🪸', x: 18, y: 72, scale: 1.4, description: 'Terumbu karang tersusun dari jutaan polip karang kecil yang hidup berkoloni.', hint: 'Karang tampak seperti batu tetapi sebenarnya adalah kumpulan makhluk hidup kecil!' },
      { id: 'l_gurita', name: 'Gurita Cerdas', type: 'biotik', emoji: '🐙', x: 82, y: 70, scale: 1.1, description: 'Gurita memiliki 8 tentakel, bisa menyemprotkan tinta hitam, dan makan kepiting.', hint: 'Hewan lunak laut yang pandai berkamuflase.' },
      { id: 'l_air', name: 'Air Laut Asin', type: 'abiotik', emoji: '🌊', x: 50, y: 15, scale: 1.3, description: 'Air laut adalah komponen abiotik yang mengandung garam dan menjadi tempat hidup ikan.', hint: 'Air laut adalah medium cairan tempat ikan berenang.' },
      { id: 'l_pasir', name: 'Pasir Laut Dasar', type: 'abiotik', emoji: '🏖️', x: 55, y: 88, scale: 1.2, description: 'Pasir putih berasal dari kikisan batuan dan pecahan cangkang yang mengendap di dasar laut.', hint: 'Pasir adalah butiran mineral tak hidup.' },
      { id: 'l_cahaya', name: 'Sinar Matahari Tembus Air', type: 'abiotik', emoji: '✨', x: 45, y: 25, scale: 1.0, description: 'Sinar matahari menembus permukaan air agar rumput laut dan alga bisa berfotosintesis.', hint: 'Cahaya adalah energi abiotik dari luar angkasa.' },
      { id: 'l_suhu', name: 'Suhu Hangat Air Laut', type: 'abiotik', emoji: '🌡️', x: 88, y: 18, scale: 0.9, description: 'Derajat panas atau dinginnya air laut mempengaruhi kenyamanan ikan dan karang.', hint: 'Suhu adalah ukuran panas atau dingin lingkungan fisik.' },
    ],
    quizQuestions: [
      {
        id: 'lq_1',
        question: 'Manakah di bawah ini yang merupakan komponen BIOTIK di lautan?',
        options: ['Pasir putih di dasar laut', 'Ikan badut yang lincah', 'Air laut yang terasa asin', 'Garam laut yang larut'],
        correctIndex: 1,
        explanation: 'Benar! Ikan badut adalah makhluk hidup (biotik) yang berenang, bernapas dengan insang, dan butuh makanan.',
        hint: 'Pilihlah hewan yang bisa berenang!',
        imageEmoji: '🐠'
      },
      {
        id: 'lq_2',
        question: 'Terumbu karang di laut sering dikira batu. Sebenarnya terumbu karang termasuk apa?',
        options: ['Benda mati plastik', 'Komponen biotik (kumpulan makhluk hidup)', 'Komponen abiotik dari semen', 'Batu karang buatan manusia'],
        correctIndex: 1,
        explanation: 'Hebat sekali! Karang terbentuk dari koloni hewan kecil bernama polip karang yang hidup dan menghasilkan kalsium karbonat.',
        hint: 'Karang butuh makan dan bisa mati jika air laut terlalu panas atau tercemar.',
        imageEmoji: '🪸'
      },
      {
        id: 'lq_3',
        question: 'Manakah yang termasuk komponen ABIOTIK di ekosistem laut?',
        options: ['Penyu laut hijau', 'Bintang laut', 'Air laut dan garam', 'Lumba-lumba ramah'],
        correctIndex: 2,
        explanation: 'Tepat! Air laut, garam, pasir, dan ombak adalah komponen abiotik (benda tak hidup) di laut.',
        hint: 'Benda ini bukan hewan dan bukan tumbuhan.',
        imageEmoji: '🌊'
      },
      {
        id: 'lq_4',
        question: 'Apa fungsi utama air laut (abiotik) bagi ikan (biotik)?',
        options: ['Sebagai tempat berenang dan bernapas menyerap oksigen terlarut', 'Sebagai mainan boneka ikan', 'Untuk membeli makanan di toko laut', 'Agar ikan bisa memakai baju selam'],
        correctIndex: 0,
        explanation: 'Pintar! Ikan menyerap oksigen yang terlarut dalam air menggunakan insangnya agar tetap hidup.',
        hint: 'Tanpa air di sekitarnya, insang ikan akan mengering dan ikan tidak bisa bernapas.',
        imageEmoji: '🐟'
      },
      {
        id: 'lq_5',
        question: 'Bagaimana cara kita menjaga komponen abiotik air laut agar tetap bersih untuk para biota laut?',
        options: ['Membuang sampah plastik ke laut', 'Menangkap ikan menggunakan bom racun', 'Tidak membuang sampah ke laut dan mengurangi penggunaan plastik sekali pakai', 'Menguras seluruh air laut ke daratan'],
        correctIndex: 2,
        explanation: 'Bagus sekali! Plastik di laut bisa tertelan oleh penyu dan mencemari air. Kita harus menjaga laut selalu bersih.',
        hint: 'Pilihlah tindakan yang penuh kasih sayang terhadap lingkungan laut!',
        imageEmoji: '🐢'
      },
    ],
    rescueMission: {
      id: 'rm_laut',
      title: 'Misi Penyelamat Terumbu Karang & Penyu!',
      scenario: 'Sebuah jaring ikan rusak dan tumpukan botol plastik terdampar di terumbu karang. Penyu kecil tersangkut dan tidak bisa berenang ke permukaan!',
      problemImage: 'Terumbu karang kelabu tertutup jaring rusak dan sedotan plastik.',
      solvedImage: 'Karang kembali berwarna-warni cerah, penyu berenang bebas, dan ikan-ikan menari gembira!',
      trashItems: [
        { id: 'tl1', name: 'Jaring Nelayan Rusak', emoji: '🕸️', x: 30, y: 65 },
        { id: 'tl2', name: 'Gelas Plastik Kotor', emoji: '🥤', x: 50, y: 72 },
        { id: 'tl3', name: 'Sedotan Plastik', emoji: '🥢', x: 68, y: 60 },
        { id: 'tl4', name: 'Kantong Plastik Bekas', emoji: '🛍️', x: 82, y: 75 },
      ],
      question: 'Apa akibat buruk jika sampah plastik dibiarkan di laut bagi komponen biotik?',
      options: [
        'Ikan dan penyu bisa memakan plastik lalu sakit atau mati',
        'Air laut berubah menjadi jus manis',
        'Penyu akan tumbuh sayap dan terbang',
        'Terumbu karang menjadi semakin wangi'
      ],
      correctIndex: 0,
      explanation: 'Tepat sekali! Plastik tidak bisa dicerna oleh hewan laut. Dengan membersihkan sampah, kita menyelamatkan ribuan nyawa biota laut.',
      moralLesson: 'Laut bukan tempat sampah! Jaga laut kita agar ikan dan penyu selalu sehat.'
    }
  },

  gurun: {
    id: 'gurun',
    name: 'Gurun Sahara Emas',
    levelNumber: 3,
    icon: '🏜️',
    color: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-gradient-to-b from-yellow-100 via-amber-50 to-orange-200',
    description: 'Wilayah hamparan pasir luas dengan udara sangat panas di siang hari, sangat dingin di malam hari, dan sangat sedikit air hujan.',
    keyFeatures: ['Curah hujan sangat rendah', 'Pasir yang berpindah ditiup angin', 'Kaktus yang menyimpan cadangan air', 'Unta dengan punuk penyimpan lemak'],
    sceneObjects: [
      { id: 'g_kaktus', name: 'Kaktus Berduri', type: 'biotik', emoji: '🌵', x: 20, y: 65, scale: 1.3, description: 'Kaktus memiliki daun berbentuk duri untuk mengurangi penguapan air dan batang tebal penyimpan air.', hint: 'Kaktus adalah tumbuhan yang bisa bertahan hidup di tempat kering.' },
      { id: 'g_unta', name: 'Unta Si Kapal Gurun', type: 'biotik', emoji: '🐪', x: 65, y: 55, scale: 1.4, description: 'Unta memiliki punuk berisi lemak dan bulu mata panjang penangkal debu pasir gurun.', hint: 'Unta adalah hewan mamalia yang kuat berjalan berhari-hari tanpa minum.' },
      { id: 'g_kalajengking', name: 'Kalajengking Gurun', type: 'biotik', emoji: '🦂', x: 38, y: 82, scale: 1.0, description: 'Kalajengking bersembunyi di bawah batu pada siang hari untuk menghindari panas terik.', hint: 'Hewan berbisa bertungkai delapan yang beradaptasi di pasir.' },
      { id: 'g_kadal', name: 'Kadal Gurun Cepat', type: 'biotik', emoji: '🦎', x: 82, y: 75, scale: 1.0, description: 'Kadal gurun berlari kencang di atas pasir panas untuk memburu serangga kecil.', hint: 'Reptil gesit pemakan serangga di gurun.' },
      { id: 'g_pasir', name: 'Hamparan Pasir Panas', type: 'abiotik', emoji: '🏜️', x: 50, y: 80, scale: 1.3, description: 'Pasir gurun adalah butiran silika tak hidup yang sangat panas di siang hari.', hint: 'Pasir adalah tanah butiran kasar tak bernyawa.' },
      { id: 'g_matahari', name: 'Matahari Terik Menyengat', type: 'abiotik', emoji: '☀️', x: 85, y: 15, scale: 1.4, description: 'Cahaya matahari di gurun sangat kuat karena jarang ada awan yang menghalangi.', hint: 'Matahari adalah sumber panas utama di gurun.' },
      { id: 'g_batu', name: 'Batuan Cadas Gurun', type: 'abiotik', emoji: '🪨', x: 15, y: 80, scale: 1.2, description: 'Batuan terkikis oleh tiupan angin gurun yang membawa debu pasir selama ribuan tahun.', hint: 'Batu keras tak hidup tempat berteduh kadal.' },
      { id: 'g_angin', name: 'Angin Badai Pasir', type: 'abiotik', emoji: '🌪️', x: 35, y: 25, scale: 1.0, description: 'Hembusan udara kencang yang mampu meniup dan membentuk bukit pasir baru.', hint: 'Angin adalah komponen abiotik berupa gas yang bergerak.' },
    ],
    quizQuestions: [
      {
        id: 'gq_1',
        question: 'Manakah di bawah ini yang merupakan tumbuhan (komponen biotik) khas gurun pasir?',
        options: ['Kaktus berduri', 'Pohon bakau di rawa', 'Teratai air', 'Batu pasir'],
        correctIndex: 0,
        explanation: 'Tepat sekali! Kaktus adalah komponen biotik (tumbuhan) yang mampu menyimpan banyak air di batangnya yang tebal.',
        hint: 'Tumbuhan ini berduri tajam dan tahan panas!',
        imageEmoji: '🌵'
      },
      {
        id: 'gq_2',
        question: 'Manakah yang termasuk komponen ABIOTIK paling mendominasi di gurun pasir?',
        options: ['Unta berpunuk', 'Kadal gurun', 'Pasir yang panas dan kering', 'Kalajengking'],
        correctIndex: 2,
        explanation: 'Benar! Pasir dan bebatuan adalah benda tak hidup (abiotik) yang menutupi hampir seluruh wilayah gurun.',
        hint: 'Benda ini berwarna kuning keemasan dan butirannya sangat banyak.',
        imageEmoji: '🏜️'
      },
      {
        id: 'gq_3',
        question: 'Mengapa kaktus memiliki daun yang berbentuk duri?',
        options: ['Untuk menusuk burung terbang', 'Untuk mengurangi penguapan air di udara panas', 'Karena kaktus malas bertumbuh', 'Agar bisa terbang ditiup angin'],
        correctIndex: 1,
        explanation: 'Luar biasa pintar! Daun duri kaktus memperkecil permukaan daun sehingga air di dalam tubuhnya tidak cepat menguap.',
        hint: 'Di gurun air sangat langka, jadi kaktus harus menghemat air sebanyak-banyaknya!',
        imageEmoji: '🌵'
      },
      {
        id: 'gq_4',
        question: 'Unta adalah makhluk hidup (biotik). Apa fungsi punuk di punggung unta?',
        options: ['Untuk tempat tidur anak burung', 'Menyimpan cadangan lemak sebagai sumber energi saat makanan langka', 'Menyimpan batu mainan', 'Sebagai kipas angin pribadi'],
        correctIndex: 1,
        explanation: 'Hebat! Punuk unta menyimpan cadangan lemak yang diubah menjadi energi dan air saat melintasi gurun yang tandus.',
        hint: 'Punuk membantu unta bertahan hidup berminggu-minggu di tempat gersang.',
        imageEmoji: '🐪'
      },
      {
        id: 'gq_5',
        question: 'Komponen abiotik apakah yang sangat langka dan dicari oleh semua makhluk hidup di gurun?',
        options: ['Pasir', 'Batu', 'Air tawar', 'Cahaya matahari'],
        correctIndex: 2,
        explanation: 'Pintar sekali! Air adalah kebutuhan utama semua makhluk hidup. Di gurun, air hanya ada di sumber air khusus bernama oasis.',
        hint: 'Benda cair ini kita minum saat kita merasa haus.',
        imageEmoji: '💧'
      },
    ],
    rescueMission: {
      id: 'rm_gurun',
      title: 'Misi Hijaukan Oasis Gurun!',
      scenario: 'Sebuah mata air oasis di gurun tertimbun sampah plastik para petualang dan dahan kering yang runtuh. Airnya terhambat dan unta kehausan!',
      problemImage: 'Mata air oasis tertutup sampah plastik dan dahan kering, rumput mengering.',
      solvedImage: 'Air oasis memancar jernih kembali, pohon palem kurma berbuah lebat, unta minum dengan nikmat!',
      trashItems: [
        { id: 'tg1', name: 'Botol Minum Plastik', emoji: '🧴', x: 28, y: 68 },
        { id: 'tg2', name: 'Kardus Makanan', emoji: '📦', x: 48, y: 74 },
        { id: 'tg3', name: 'Plastik Makanan Ringan', emoji: '🍬', x: 68, y: 65 },
        { id: 'tg4', name: 'Bungkus Rokok Kotor', emoji: '🚬', x: 80, y: 72 },
      ],
      question: 'Mengapa mata air oasis (abiotik) sangat penting bagi hewan dan tumbuhan (biotik) di gurun?',
      options: [
        'Karena oasis adalah satu-satunya sumber air minum dan kesegaran di tengah gurun yang kering',
        'Karena oasis tempat bermain ski air',
        'Karena unta lebih suka minum pasir daripada air',
        'Oasis tidak penting sama sekali'
      ],
      correctIndex: 0,
      explanation: 'Benar sekali! Tanpa air dari oasis, tumbuhan seperti pohon kurma dan hewan gurun tidak bisa bertahan hidup.',
      moralLesson: 'Jagalah sumber air di mana pun berada, karena air adalah sumber kehidupan!'
    }
  },

  sawah: {
    id: 'sawah',
    name: 'Sawah Hijau Makmur',
    levelNumber: 4,
    icon: '🌾',
    color: 'from-lime-500 to-emerald-600',
    bgGradient: 'bg-gradient-to-b from-lime-100 via-green-50 to-emerald-200',
    description: 'Hamparan petak sawah bertingkat tempat padi tumbuh subur, dialiri parit irigasi, dan menjadi rumah bagi aneka serangga dan hewan sawah.',
    keyFeatures: ['Tanaman padi yang menghasilkan beras', 'Tanah lumpur yang kaya humus', 'Saluran air irigasi yang mengalir', 'Katak, belalang, cacing, dan burung bangau'],
    sceneObjects: [
      { id: 's_padi', name: 'Tanaman Padi', type: 'biotik', emoji: '🌾', x: 25, y: 60, scale: 1.3, description: 'Padi adalah tanaman pangan utama yang menghasilkan bulir beras untuk nasi yang kita makan setiap hari.', hint: 'Tumbuhan hijau yang menghasilkan makanan pokok masyarakat Indonesia.' },
      { id: 's_katak', name: 'Katak Sawah', type: 'biotik', emoji: '🐸', x: 45, y: 78, scale: 1.1, description: 'Katak berbunyi nyaring di malam hari dan memangsa serangga hama tanaman padi.', hint: 'Hewan amfibi yang melompat dan membantu petani memangsa serangga.' },
      { id: 's_belalang', name: 'Belalang Daun', type: 'biotik', emoji: '🦗', x: 75, y: 65, scale: 1.0, description: 'Belalang memakan helai daun padi dan memiliki kaki belakang yang kuat untuk melompat.', hint: 'Serangga bersuara derik dengan sungut di kepala.' },
      { id: 's_bangau', name: 'Burung Bangau Putih', type: 'biotik', emoji: '🦩', x: 80, y: 35, scale: 1.2, description: 'Bangau berleher panjang berdiri di pematang sawah mengincar ikan kecil dan keong di parit.', hint: 'Burung pemakan ikan kecil di parit sawah.' },
      { id: 's_cacing', name: 'Cacing Tanah', type: 'biotik', emoji: '🪱', x: 18, y: 82, scale: 0.9, description: 'Cacing tanah membuat terowongan kecil di lumpur sawah sehingga tanah menjadi gembur dan subur.', hint: 'Hewan tak bertulang belakang yang menyuburkan tanah pertanian.' },
      { id: 's_lumpur', name: 'Tanah Lumpur Sawah', type: 'abiotik', emoji: '🟤', x: 35, y: 85, scale: 1.1, description: 'Lumpur sawah basah menahan air dan menyediakan zat hara bagi akar rumpun padi.', hint: 'Tanah basah tempat menanam bibit padi.' },
      { id: 's_irigasi', name: 'Air Saluran Irigasi', type: 'abiotik', emoji: '💧', x: 60, y: 82, scale: 1.3, description: 'Aliran air tawar yang dialirkan petani dari bendungan ke petak sawah.', hint: 'Air penting untuk menggenangi sawah saat padi bertumbuh.' },
      { id: 's_matahari', name: 'Matahari Pagi yang Cerah', type: 'abiotik', emoji: '☀️', x: 80, y: 15, scale: 1.3, description: 'Memberi kehangatan dan energi bagi tanaman padi untuk berfotosintesis dan menguningkan bulir padi.', hint: 'Matahari membantu mematangkan bulir padi menjadi emas.' },
      { id: 's_pupuk', name: 'Pupuk Kompos Alami', type: 'abiotik', emoji: '🍂', x: 12, y: 70, scale: 1.0, description: 'Campuran daun busuk yang menjadi zat mineral penyubur tanaman di tanah.', hint: 'Bahan mineral tambahan tak hidup yang menyuburkan tanaman.' },
    ],
    quizQuestions: [
      {
        id: 'sq_1',
        question: 'Manakah di bawah ini yang merupakan produsen (komponen biotik) utama di ekosistem sawah?',
        options: ['Tanah lumpur', 'Tanaman padi', 'Cangkul pak tani', 'Air irigasi'],
        correctIndex: 1,
        explanation: 'Hebat! Tanaman padi adalah tumbuhan hijau (biotik) yang menghasilkan makanan dan bulir beras.',
        hint: 'Tumbuhan yang ditanam petani di sawah.',
        imageEmoji: '🌾'
      },
      {
        id: 'sq_2',
        question: 'Cacing tanah termasuk komponen biotik. Apa manfaat cacing tanah bagi tanaman padi?',
        options: ['Menggigit bulir padi sampai rontok', 'Membuat terowongan sehingga tanah gembur dan subur', 'Membuat sawah banjir', 'Menyanyi agar padi tidur'],
        correctIndex: 1,
        explanation: 'Pintar! Cacing menggemburkan tanah dan menguraikan sisa daun sehingga akar padi mudah menyerap nutrisi.',
        hint: 'Cacing adalah pahlawan penyubur tanah alami!',
        imageEmoji: '🪱'
      },
      {
        id: 'sq_3',
        question: 'Komponen abiotik apakah yang dialirkan melalui parit irigasi untuk mengairi petak sawah?',
        options: ['Minyak goreng', 'Air tawar', 'Susu cokelat', 'Batu bata'],
        correctIndex: 1,
        explanation: 'Benar sekali! Air adalah komponen abiotik utama yang dialirkan melalui parit irigasi untuk menyirami tanaman padi.',
        hint: 'Cairan bening yang mengalir di saluran sawah.',
        imageEmoji: '💧'
      },
      {
        id: 'sq_4',
        question: 'Katak sawah memakan belalang perusak padi. Jika katak ditangkap habis oleh manusia, apa yang terjadi pada sawah?',
        options: ['Padi akan semakin banyak dan subur', 'Belalang bertambah banyak dan memakan habis daun padi', 'Sawah berubah menjadi lautan', 'Semua burung bangau akan tertawa'],
        correctIndex: 1,
        explanation: 'Tepat sekali! Ini adalah rantai makanan. Jika pemangsanya (katak) hilang, hama belalang akan meledak dan merusak padi petani.',
        hint: 'Katak bertugas menjaga agar jumlah belalang tidak terlalu banyak.',
        imageEmoji: '🐸'
      },
      {
        id: 'sq_5',
        question: 'Apa contoh interaksi antara komponen biotik dan abiotik yang terjadi di sawah?',
        options: ['Akar padi menyerap air dan unsur hara dari tanah lumpur', 'Batu berbicara dengan pasir', 'Angin membeli buku di toko', 'Matahari berenang di kolam'],
        correctIndex: 0,
        explanation: 'Luar biasa! Padi (biotik) membutuhkan air dan tanah (abiotik) untuk tumbuh besar dan menghasilkan bulir beras.',
        hint: 'Perhatikan hubungan antara makhluk hidup dengan benda tak hidup di sekitarnya.',
        imageEmoji: '🌱'
      },
    ],
    rescueMission: {
      id: 'rm_sawah',
      title: 'Misi Selamatkan Saluran Irigasi Sawah!',
      scenario: 'Saluran air irigasi tersumbat limbah plastik dan botol pestisida bekas. Air tidak bisa mengalir ke petak sawah dan bibit padi mulai layu kepanasan!',
      problemImage: 'Parit irigasi tersumbat tumpukan botol plastik, air berwarna keruh dan padi layu.',
      solvedImage: 'Air irigasi mengalir lancar jernih, bibit padi kembali segar berdiri tegak, katak melompat riang!',
      trashItems: [
        { id: 'ts1', name: 'Botol Pestisida Bekas', emoji: '🧪', x: 26, y: 70 },
        { id: 'ts2', name: 'Kantong Plastik Hitam', emoji: '🛍️', x: 46, y: 75 },
        { id: 'ts3', name: 'Gelas Plastik Minuman', emoji: '🥤', x: 66, y: 68 },
        { id: 'ts4', name: 'Styrofoam Bekas Makanan', emoji: '🍱', x: 80, y: 74 },
      ],
      question: 'Mengapa kita tidak boleh membuang limbah berbahaya dan plastik ke parit sawah?',
      options: [
        'Karena dapat mencemari air dan tanah sehingga tanaman padi layu dan mati',
        'Karena katak sawah akan belajar mengemudi mobil',
        'Karena padi akan berubah rasa menjadi cokelat',
        'Karena petani akan marah dan tidur di sawah'
      ],
      correctIndex: 0,
      explanation: 'Sempurna! Air dan tanah yang bersih dari racun membuat padi tumbuh sehat dan beras yang kita makan aman serta bergizi.',
      moralLesson: 'Menjaga kelestarian sawah sama dengan menghargai makanan pokok yang kita nikmati setiap hari!'
    }
  }
};

export const MATCH_ITEMS: MatchItem[] = [
  { id: 'm1', name: 'Ikan Badut', type: 'biotik', emoji: '🐠', detail: 'Makhluk hidup yang berenang & bernapas dengan insang.' },
  { id: 'm2', name: 'Batu Sungai', type: 'abiotik', emoji: '🪨', detail: 'Benda mati yang keras, tidak bernapas, dan tidak tumbuh.' },
  { id: 'm3', name: 'Pohon Mangga', type: 'biotik', emoji: '🌳', detail: 'Tumbuhan yang tumbuh dari biji dan berfotosintesis.' },
  { id: 'm4', name: 'Air Tawar', type: 'abiotik', emoji: '💧', detail: 'Zat cair tak hidup yang sangat dibutuhkan makhluk hidup.' },
  { id: 'm5', name: 'Cahaya Matahari', type: 'abiotik', emoji: '☀️', detail: 'Sumber energi panas dan cahaya alami.' },
  { id: 'm6', name: 'Kupu-Kupu', type: 'biotik', emoji: '🦋', detail: 'Serangga hidup yang mengalami metamorfosis.' },
  { id: 'm7', name: 'Kelinci Lucu', type: 'biotik', emoji: '🐇', detail: 'Hewan mamalia yang melompat dan memakan sayur.' },
  { id: 'm8', name: 'Tanah Humus', type: 'abiotik', emoji: '🟫', detail: 'Lapisan bumi tak hidup penyedia nutrisi bagi akar.' },
  { id: 'm9', name: 'Kaktus Gurun', type: 'biotik', emoji: '🌵', detail: 'Tumbuhan berduri penyimpan cadangan air.' },
  { id: 'm10', name: 'Udara / Oksigen', type: 'abiotik', emoji: '💨', detail: 'Gas tak terlihat yang dihirup makhluk hidup.' },
  { id: 'm11', name: 'Burung Kutilang', type: 'biotik', emoji: '🐦', detail: 'Unggas bertelur yang berkicau di dahan.' },
  { id: 'm12', name: 'Pasir Pantai', type: 'abiotik', emoji: '🏖️', detail: 'Butiran batuan mineral yang tidak bernyawa.' },
];

export const GUESS_ECOSYSTEM_DATA: GuessQuestion[] = [
  {
    id: 'g1',
    clue: 'Aku memiliki banyak pohon rindang yang menjulang tinggi, udara yang sejuk dan lembap, banyak burung berkicau di dahan, serta sungai jernih yang mengalir.',
    options: [
      { name: 'Gurun Pasir', type: 'gurun', emoji: '🏜️' },
      { name: 'Hutan Tropis', type: 'hutan', emoji: '🌳' },
      { name: 'Lautan Biru', type: 'laut', emoji: '🌊' },
      { name: 'Petak Sawah', type: 'sawah', emoji: '🌾' },
    ],
    correctType: 'hutan',
    explanation: 'Hebat! Hutan tropis dikenal dengan kanopi daun yang lebat, udara lembap, dan menjadi rumah ribuan satwa liar.',
    features: ['Pohon rindang', 'Udara sejuk', 'Burung & kelinci', 'Sungai jernih']
  },
  {
    id: 'g2',
    clue: 'Airku luas membentang dan rasanya asin bergelombang. Di kedalamanku terdapat terumbu karang indah tempat ikan badut, penyu, dan lumba-lumba berenang.',
    options: [
      { name: 'Lautan Biru', type: 'laut', emoji: '🌊' },
      { name: 'Hutan Tropis', type: 'hutan', emoji: '🌳' },
      { name: 'Gurun Pasir', type: 'gurun', emoji: '🏜️' },
      { name: 'Petak Sawah', type: 'sawah', emoji: '🌾' },
    ],
    correctType: 'laut',
    explanation: 'Benar sekali! Lautan menutupi lebih dari 70% permukaan bumi dan dipenuhi jutaan spesies biota laut.',
    features: ['Air asin berombak', 'Terumbu karang', 'Ikan badut & penyu', 'Pasir putih dasar laut']
  },
  {
    id: 'g3',
    clue: 'Wilayahku sangat kering dan jarang turun hujan. Di siang hari udaraku sangat panas menyengat, tanahku berupa pasir tandus, tetapi unta dan kaktus bisa bertahan hidup di sini!',
    options: [
      { name: 'Petak Sawah', type: 'sawah', emoji: '🌾' },
      { name: 'Lautan Biru', type: 'laut', emoji: '🌊' },
      { name: 'Gurun Pasir', type: 'gurun', emoji: '🏜️' },
      { name: 'Hutan Tropis', type: 'hutan', emoji: '🌳' },
    ],
    correctType: 'gurun',
    explanation: 'Pintar! Gurun pasir adalah ekosistem yang sangat minim air, sehingga dihuni hewan dan tumbuhan beradaptasi khusus seperti unta dan kaktus.',
    features: ['Sangat jarang hujan', 'Hamparan bukit pasir', 'Unta tahan haus', 'Kaktus berduri']
  },
  {
    id: 'g4',
    clue: 'Aku dibuat oleh manusia dengan tanah berlumpur berpetak-petak. Tanaman hijau menguning menghasilkan bulir padi, diairi saluran irigasi, serta dihuni katak dan belalang.',
    options: [
      { name: 'Hutan Tropis', type: 'hutan', emoji: '🌳' },
      { name: 'Gurun Pasir', type: 'gurun', emoji: '🏜️' },
      { name: 'Petak Sawah', type: 'sawah', emoji: '🌾' },
      { name: 'Lautan Biru', type: 'laut', emoji: '🌊' },
    ],
    correctType: 'sawah',
    explanation: 'Tepat sekali! Sawah adalah ekosistem buatan tempat kita menanam padi sebagai sumber makanan pokok nasi.',
    features: ['Petak padi bertingkat', 'Saluran irigasi tawar', 'Katak & belalang', 'Tanah lumpur gembur']
  },
];

export const WHEEL_CHALLENGES: WheelChallenge[] = [
  {
    id: 'wc_biotik',
    category: '🌱 Biotik',
    color: '#22c55e',
    question: 'Biotik berasal dari kata "Bio" yang artinya HIDUP. Sebutkan manakah kelompok yang SEMUANYA merupakan komponen biotik!',
    options: [
      'Pohon, Kucing, dan Jamur',
      'Batu, Air, dan Cahaya',
      'Tanah, Udara, dan Kelinci',
      'Matahari, Plastik, dan Kaca'
    ],
    correctIndex: 0,
    explanation: 'Pohon, kucing, dan jamur semuanya adalah makhluk hidup yang bertumbuh, bernapas, dan membutuhkan nutrisi!',
    rewardPoints: 20
  },
  {
    id: 'wc_abiotik',
    category: '💧 Abiotik',
    color: '#3b82f6',
    question: 'Abiotik artinya "A" (tidak) dan "Bio" (hidup). Manakah benda di bawah ini yang tergolong komponen abiotik?',
    options: [
      'Burung Elang',
      'Air Bersih & Cahaya Matahari',
      'Ikan Mujair',
      'Kupu-Kupu Cantik'
    ],
    correctIndex: 1,
    explanation: 'Air dan cahaya matahari adalah benda mati (abiotik) yang tidak bernapas dan tidak berkembang biak.',
    rewardPoints: 20
  },
  {
    id: 'wc_hutan',
    category: '🌳 Hutan',
    color: '#15803d',
    question: 'Mengapa hutan sering disebut sebagai "Paru-Paru Dunia"?',
    options: [
      'Karena hutan berbentuk seperti paru-paru manusia',
      'Karena jutaan pohon di hutan menghasilkan banyak gas oksigen untuk bernapas',
      'Karena di dalam hutan banyak dokter rumah sakit',
      'Karena hutan bisa berlari kencang'
    ],
    correctIndex: 1,
    explanation: 'Luar biasa! Melalui fotosintesis, dedaunan pohon menyerap karbon dioksida dan melepaskan oksigen segar untuk kita semua.',
    rewardPoints: 25
  },
  {
    id: 'wc_laut',
    category: '🌊 Laut',
    color: '#06b6d4',
    question: 'Apa yang digunakan oleh ikan di lautan untuk bernapas mengambil oksigen di dalam air?',
    options: ['Hidung mancung', 'Insang', 'Kaki belakang', 'Sayap'],
    correctIndex: 1,
    explanation: 'Insang adalah organ pernapasan ikan yang menyaring oksigen terlarut dalam air.',
    rewardPoints: 20
  },
  {
    id: 'wc_gurun',
    category: '🏜️ Gurun',
    color: '#f59e0b',
    question: 'Komponen abiotik apakah yang menyebabkan tanah di gurun menjadi sangat panas saat siang hari?',
    options: ['Cahaya terik matahari', 'Salju yang membeku', 'Air es yang dingin', 'Angin sepoi-sepoi'],
    correctIndex: 0,
    explanation: 'Matahari di gurun bersinar tanpa halangan awan tebal sehingga pasir dan batuan menyerap panas maksimal.',
    rewardPoints: 20
  },
  {
    id: 'wc_sawah',
    category: '🌾 Sawah',
    color: '#84cc16',
    question: 'Hewan kecil di dalam lumpur sawah yang membuat tanah menjadi gembur dan subur adalah...',
    options: ['Singa', 'Cacing Tanah', 'Hiu Martil', 'Kera'],
    correctIndex: 1,
    explanation: 'Cacing tanah membuat rongga udara di dalam tanah lumpur sawah sehingga akar padi bisa bernapas lega.',
    rewardPoints: 20
  },
  {
    id: 'wc_bonus',
    category: '⭐ Bonus Emas',
    color: '#ec4899',
    question: 'TANTANGAN SUPER: Hubungan timbal balik antara makhluk hidup (biotik) dengan lingkungan tak hidupnya (abiotik) disebut...',
    options: ['Ekosistem', 'Foto Album', 'Komputer', 'Permainan Catur'],
    correctIndex: 0,
    explanation: 'YAY! EKOSISTEM adalah sistem kehidupan yang terbentuk dari hubungan saling mempengaruhi antara komponen biotik dan abiotik.',
    rewardPoints: 50
  },
];
