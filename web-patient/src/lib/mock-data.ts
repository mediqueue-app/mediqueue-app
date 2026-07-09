export type Gender = "male" | "female";

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type Treatment = {
  id: string;
  slug: string;
  name: string;
  /** lucide-react icon name resolved in the UI layer */
  icon:
    | "Stethoscope"
    | "Smile"
    | "Eye"
    | "Scissors"
    | "Sparkles"
    | "Bone"
    | "HeartPulse"
    | "Baby"
    | "Brain"
    | "Activity";
  category: string;
  description: string;
  image: string;
  priceFrom: number;
};

export type Doctor = {
  id: string;
  name: string;
  gender: Gender;
  title: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  city: string;
  clinicId: string;
  languages: string[];
  education: string[];
  about: string;
  focusAreas: string[];
  priceFrom: number;
  nextAvailable: string;
  reviews: Review[];
};

export type Clinic = {
  id: string;
  name: string;
  slug: string;
  city: string;
  district: string;
  address: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  gallery: string[];
  specialties: string[];
  priceFrom: number;
  priceTo: number;
  about: string;
  amenities: string[];
  doctorIds: string[];
  reviews: Review[];
};

export const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Adana",
];

export const treatments: Treatment[] = [
  {
    id: "t-dental",
    slug: "dis-tedavisi",
    name: "Diş Tedavisi & İmplant",
    icon: "Smile",
    category: "Diş Hekimliği",
    description:
      "İmplant, diş beyazlatma, ortodonti ve gülüş tasarımı için uzman diş hekimleri.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    priceFrom: 1500,
  },
  {
    id: "t-eye",
    slug: "goz-sagligi",
    name: "Göz Sağlığı & Lazer",
    icon: "Eye",
    category: "Göz Hastalıkları",
    description: "LASIK göz lazeri, katarakt ve retina tedavileri.",
    image:
      "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=800&q=80",
    priceFrom: 4000,
  },
  {
    id: "t-hair",
    slug: "sac-ekimi",
    name: "Saç Ekimi",
    icon: "Scissors",
    category: "Estetik",
    description: "FUE ve DHI teknikleriyle doğal görünümlü saç ekimi.",
    image:
      "https://images.unsplash.com/photo-1626954079979-ec4f7b05e032?auto=format&fit=crop&w=800&q=80",
    priceFrom: 12000,
  },
  {
    id: "t-derma",
    slug: "dermatoloji",
    name: "Dermatoloji & Cilt Bakımı",
    icon: "Sparkles",
    category: "Cilt Hastalıkları",
    description: "Cilt bakımı, akne tedavisi, dolgu ve lazer uygulamaları.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    priceFrom: 900,
  },
  {
    id: "t-ortho",
    slug: "ortopedi",
    name: "Ortopedi & Fizik Tedavi",
    icon: "Bone",
    category: "Ortopedi",
    description: "Eklem, omurga ve spor yaralanmalarında cerrahi ve rehabilitasyon.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    priceFrom: 800,
  },
  {
    id: "t-checkup",
    slug: "check-up",
    name: "Check-up & Dahiliye",
    icon: "HeartPulse",
    category: "İç Hastalıkları",
    description: "Kapsamlı sağlık taramaları ve dahiliye muayeneleri.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    priceFrom: 1200,
  },
  {
    id: "t-women",
    slug: "kadin-dogum",
    name: "Kadın Doğum",
    icon: "Baby",
    category: "Kadın Hastalıkları",
    description: "Gebelik takibi, jinekoloji ve tüp bebek danışmanlığı.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
    priceFrom: 1000,
  },
  {
    id: "t-plastic",
    slug: "estetik-cerrahi",
    name: "Estetik & Plastik Cerrahi",
    icon: "Activity",
    category: "Plastik Cerrahi",
    description: "Yüz ve vücut estetiği, rinoplasti ve yağ aldırma.",
    image:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=80",
    priceFrom: 25000,
  },
];

export const doctors: Doctor[] = [
  {
    id: "d-1",
    name: "Prof. Dr. Emre Demir",
    gender: "male",
    title: "Plastik ve Rekonstrüktif Cerrahi Uzmanı",
    specialty: "Estetik & Plastik Cerrahi",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    reviewCount: 214,
    experienceYears: 22,
    city: "İstanbul",
    clinicId: "c-1",
    languages: ["Türkçe", "İngilizce", "Almanca"],
    education: [
      "İstanbul Üniversitesi Tıp Fakültesi",
      "Hacettepe Üniversitesi — Plastik Cerrahi İhtisası",
      "ISAPS Üyeliği",
    ],
    about:
      "22 yıllık deneyimiyle yüz ve vücut estetiğinde doğal sonuçlara odaklanan Prof. Dr. Emre Demir, rinoplasti ve gülüş tasarımı alanında uluslararası hastalar kabul etmektedir.",
    focusAreas: ["Rinoplasti", "Yüz Germe", "Liposuction", "Meme Estetiği"],
    priceFrom: 25000,
    nextAvailable: "Yarın 14:30",
    reviews: [
      {
        id: "r-1",
        author: "Selin K.",
        rating: 5,
        date: "2 hafta önce",
        comment:
          "Sürecin her aşamasında bilgilendirildim, sonuç beklentimin çok üzerinde oldu. Kesinlikle tavsiye ederim.",
      },
      {
        id: "r-2",
        author: "Murat A.",
        rating: 5,
        date: "1 ay önce",
        comment: "Son derece profesyonel bir ekip ve modern bir klinik.",
      },
    ],
  },
  {
    id: "d-2",
    name: "Op. Dr. Ayşe Yıldız",
    gender: "female",
    title: "Göz Hastalıkları Uzmanı",
    specialty: "Göz Sağlığı & Lazer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    reviewCount: 176,
    experienceYears: 15,
    city: "İstanbul",
    clinicId: "c-2",
    languages: ["Türkçe", "İngilizce"],
    education: [
      "Ege Üniversitesi Tıp Fakültesi",
      "Dünya Göz Hastanesi — Refraktif Cerrahi",
    ],
    about:
      "Refraktif cerrahi ve LASIK alanında 15 yıllık deneyime sahip Op. Dr. Ayşe Yıldız, 10.000'den fazla başarılı göz lazeri operasyonu gerçekleştirmiştir.",
    focusAreas: ["LASIK", "Katarakt", "Retina", "Numaralı Gözlük"],
    priceFrom: 4000,
    nextAvailable: "Bugün 16:00",
    reviews: [
      {
        id: "r-3",
        author: "Deniz T.",
        rating: 5,
        date: "3 gün önce",
        comment: "Lazer operasyonum 10 dakika sürdü, ertesi gün net görüyordum!",
      },
    ],
  },
  {
    id: "d-3",
    name: "Dr. Mehmet Kaya",
    gender: "male",
    title: "Saç Ekimi & Estetik Uzmanı",
    specialty: "Saç Ekimi",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.9,
    reviewCount: 302,
    experienceYears: 12,
    city: "İstanbul",
    clinicId: "c-1",
    languages: ["Türkçe", "İngilizce", "Arapça"],
    education: [
      "Marmara Üniversitesi Tıp Fakültesi",
      "FUE & DHI Sertifikasyonu",
    ],
    about:
      "Doğal saç çizgisi tasarımında uzmanlaşan Dr. Mehmet Kaya, DHI tekniğiyle kesintisiz ve iz bırakmayan sonuçlar sunar.",
    focusAreas: ["FUE", "DHI", "Sakal Ekimi", "PRP"],
    priceFrom: 12000,
    nextAvailable: "Yarın 10:00",
    reviews: [
      {
        id: "r-4",
        author: "Ahmet Y.",
        rating: 5,
        date: "1 hafta önce",
        comment: "6 ay sonra sonuçlar inanılmaz doğal görünüyor. Teşekkürler!",
      },
    ],
  },
  {
    id: "d-4",
    name: "Doç. Dr. Zeynep Arslan",
    gender: "female",
    title: "Dermatoloji Uzmanı",
    specialty: "Dermatoloji & Cilt Bakımı",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviewCount: 189,
    experienceYears: 14,
    city: "İzmir",
    clinicId: "c-3",
    languages: ["Türkçe", "İngilizce", "Fransızca"],
    education: [
      "Dokuz Eylül Üniversitesi Tıp Fakültesi",
      "Dermatoloji ve Kozmetoloji İhtisası",
    ],
    about:
      "Medikal ve estetik dermatolojide 14 yıllık deneyimiyle Doç. Dr. Zeynep Arslan, kanıta dayalı cilt bakımı protokolleri uygular.",
    focusAreas: ["Akne", "Dolgu & Botoks", "Lazer Epilasyon", "Cilt Analizi"],
    priceFrom: 900,
    nextAvailable: "Bugün 13:15",
    reviews: [
      {
        id: "r-5",
        author: "Elif S.",
        rating: 5,
        date: "5 gün önce",
        comment: "Cilt problemim için ilk kez gerçekten işe yarayan bir tedavi.",
      },
    ],
  },
  {
    id: "d-5",
    name: "Op. Dr. Can Öztürk",
    gender: "male",
    title: "Ortopedi ve Travmatoloji Uzmanı",
    specialty: "Ortopedi & Fizik Tedavi",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4.8,
    reviewCount: 141,
    experienceYears: 18,
    city: "Ankara",
    clinicId: "c-4",
    languages: ["Türkçe", "İngilizce"],
    education: [
      "Ankara Üniversitesi Tıp Fakültesi",
      "Diz ve Kalça Protezi Cerrahisi",
    ],
    about:
      "Spor yaralanmaları ve eklem protezi cerrahisinde uzman Op. Dr. Can Öztürk, minimal invaziv tekniklerle hızlı iyileşme sağlar.",
    focusAreas: ["Diz Protezi", "Artroskopi", "Omuz Cerrahisi", "Fizik Tedavi"],
    priceFrom: 800,
    nextAvailable: "Cuma 09:30",
    reviews: [
      {
        id: "r-6",
        author: "Hakan D.",
        rating: 5,
        date: "2 hafta önce",
        comment: "Diz ameliyatı sonrası 3 haftada yürümeye başladım.",
      },
    ],
  },
  {
    id: "d-6",
    name: "Dr. Selin Aydın",
    gender: "female",
    title: "Kadın Hastalıkları ve Doğum Uzmanı",
    specialty: "Kadın Doğum",
    photo: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 4.9,
    reviewCount: 223,
    experienceYears: 16,
    city: "İstanbul",
    clinicId: "c-6",
    languages: ["Türkçe", "İngilizce"],
    education: [
      "İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi",
      "Tüp Bebek ve Üreme Sağlığı Sertifikası",
    ],
    about:
      "Gebelik takibi ve tüp bebek tedavilerinde 16 yıllık deneyime sahip Dr. Selin Aydın, anne adaylarına şefkatli ve titiz bir yaklaşım sunar.",
    focusAreas: ["Gebelik Takibi", "Tüp Bebek", "Jinekoloji", "Menopoz"],
    priceFrom: 1000,
    nextAvailable: "Bugün 15:45",
    reviews: [
      {
        id: "r-7",
        author: "Merve B.",
        rating: 5,
        date: "4 gün önce",
        comment: "Tüm gebelik sürecim boyunca çok destekleyiciydi.",
      },
    ],
  },
  {
    id: "d-7",
    name: "Prof. Dr. Burak Şahin",
    gender: "male",
    title: "İç Hastalıkları (Dahiliye) Uzmanı",
    specialty: "Check-up & Dahiliye",
    photo: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 4.7,
    reviewCount: 158,
    experienceYears: 20,
    city: "İzmir",
    clinicId: "c-3",
    languages: ["Türkçe", "İngilizce"],
    education: [
      "Hacettepe Üniversitesi Tıp Fakültesi",
      "İç Hastalıkları İhtisası",
    ],
    about:
      "Koruyucu hekimlik ve kronik hastalık yönetiminde uzman Prof. Dr. Burak Şahin, kapsamlı check-up programları yürütür.",
    focusAreas: ["Check-up", "Diyabet", "Tansiyon", "Tiroid"],
    priceFrom: 1200,
    nextAvailable: "Yarın 11:30",
    reviews: [
      {
        id: "r-8",
        author: "Okan V.",
        rating: 5,
        date: "1 hafta önce",
        comment: "Detaylı bir check-up ve anlaşılır bir raporlama.",
      },
    ],
  },
  {
    id: "d-8",
    name: "Op. Dr. Elif Çelik",
    gender: "female",
    title: "Diş Hekimi — İmplantoloji",
    specialty: "Diş Tedavisi & İmplant",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4.9,
    reviewCount: 267,
    experienceYears: 13,
    city: "Antalya",
    clinicId: "c-5",
    languages: ["Türkçe", "İngilizce", "Rusça"],
    education: [
      "Ege Üniversitesi Diş Hekimliği Fakültesi",
      "İmplantoloji ve Gülüş Tasarımı",
    ],
    about:
      "Gülüş tasarımı ve implantolojide uzman Op. Dr. Elif Çelik, dijital diş hekimliği teknolojileriyle tek seansta çözümler sunar.",
    focusAreas: ["İmplant", "Zirkonyum", "Diş Beyazlatma", "Gülüş Tasarımı"],
    priceFrom: 1500,
    nextAvailable: "Bugün 17:00",
    reviews: [
      {
        id: "r-9",
        author: "Gizem A.",
        rating: 5,
        date: "6 gün önce",
        comment: "Gülüş tasarımı sonrası özgüvenim tamamen değişti.",
      },
    ],
  },
];

export const clinics: Clinic[] = [
  {
    id: "c-1",
    name: "Anadolu Estetik & Cerrahi Merkezi",
    slug: "anadolu-estetik",
    city: "İstanbul",
    district: "Şişli",
    address: "Halaskargazi Cd. No:42, Şişli / İstanbul",
    rating: 4.9,
    reviewCount: 512,
    coverImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Estetik & Plastik Cerrahi", "Saç Ekimi"],
    priceFrom: 12000,
    priceTo: 45000,
    about:
      "JCI akreditasyonlu Anadolu Estetik & Cerrahi Merkezi, estetik cerrahi ve saç ekiminde uluslararası standartlarda hizmet sunar. Modern ameliyathaneleri ve deneyimli kadrosuyla 30.000'den fazla hastaya hizmet vermiştir.",
    amenities: [
      "Uluslararası Hasta Danışmanı",
      "Havaalanı Transferi",
      "Ücretsiz Otopark",
      "Konaklama Desteği",
    ],
    doctorIds: ["d-1", "d-3"],
    reviews: [
      {
        id: "cr-1",
        author: "Laura M.",
        rating: 5,
        date: "1 hafta önce",
        comment:
          "From the airport pickup to the surgery, everything was perfectly organized. Highly professional.",
      },
      {
        id: "cr-2",
        author: "Kaan T.",
        rating: 5,
        date: "3 hafta önce",
        comment: "Klinik pırıl pırıl, ekip son derece ilgili.",
      },
    ],
  },
  {
    id: "c-2",
    name: "Marmara Göz Hastanesi",
    slug: "marmara-goz",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Bağdat Cd. No:158, Kadıköy / İstanbul",
    rating: 4.8,
    reviewCount: 389,
    coverImage:
      "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Göz Sağlığı & Lazer"],
    priceFrom: 4000,
    priceTo: 18000,
    about:
      "Marmara Göz Hastanesi, en son teknoloji Femto-LASIK cihazları ve deneyimli hekim kadrosuyla göz sağlığında referans merkezidir.",
    amenities: [
      "Femto-LASIK Teknolojisi",
      "Ücretsiz Ön Muayene",
      "Randevu Garantisi",
      "Ücretsiz Otopark",
    ],
    doctorIds: ["d-2"],
    reviews: [
      {
        id: "cr-3",
        author: "Deniz T.",
        rating: 5,
        date: "4 gün önce",
        comment: "Operasyon çok hızlı ve konforluydu.",
      },
    ],
  },
  {
    id: "c-3",
    name: "Ege Sağlık ve Dermatoloji Merkezi",
    slug: "ege-saglik",
    city: "İzmir",
    district: "Alsancak",
    address: "Kıbrıs Şehitleri Cd. No:12, Alsancak / İzmir",
    rating: 4.7,
    reviewCount: 276,
    coverImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Dermatoloji & Cilt Bakımı", "Check-up & Dahiliye"],
    priceFrom: 900,
    priceTo: 8000,
    about:
      "Ege Sağlık ve Dermatoloji Merkezi, medikal dermatoloji ve koruyucu sağlık hizmetlerini modern bir ortamda bir araya getirir.",
    amenities: [
      "Dijital Cilt Analizi",
      "Aynı Gün Randevu",
      "Laboratuvar Hizmetleri",
      "Kolay Ulaşım",
    ],
    doctorIds: ["d-4", "d-7"],
    reviews: [
      {
        id: "cr-4",
        author: "Elif S.",
        rating: 5,
        date: "5 gün önce",
        comment: "Hem dermatoloji hem check-up için ideal bir merkez.",
      },
    ],
  },
  {
    id: "c-4",
    name: "Başkent Ortopedi & Fizik Tedavi",
    slug: "baskent-ortopedi",
    city: "Ankara",
    district: "Çankaya",
    address: "Cinnah Cd. No:74, Çankaya / Ankara",
    rating: 4.8,
    reviewCount: 198,
    coverImage:
      "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Ortopedi & Fizik Tedavi"],
    priceFrom: 800,
    priceTo: 60000,
    about:
      "Başkent Ortopedi & Fizik Tedavi Merkezi, robotik cerrahi ve modern rehabilitasyon üniteleriyle hareket sağlığına odaklanır.",
    amenities: [
      "Robotik Cerrahi",
      "Rehabilitasyon Ünitesi",
      "MR & Görüntüleme",
      "Ücretsiz Otopark",
    ],
    doctorIds: ["d-5"],
    reviews: [
      {
        id: "cr-5",
        author: "Hakan D.",
        rating: 5,
        date: "2 hafta önce",
        comment: "Ameliyat ve fizik tedavi sürecim kusursuzdu.",
      },
    ],
  },
  {
    id: "c-5",
    name: "Antalya Dental & Gülüş Kliniği",
    slug: "antalya-dental",
    city: "Antalya",
    district: "Muratpaşa",
    address: "Işıklar Cd. No:33, Muratpaşa / Antalya",
    rating: 4.9,
    reviewCount: 431,
    coverImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Diş Tedavisi & İmplant"],
    priceFrom: 1500,
    priceTo: 30000,
    about:
      "Antalya Dental & Gülüş Kliniği, dijital diş hekimliği ve tek seansta gülüş tasarımı çözümleriyle Avrupalı hastaların tercihidir.",
    amenities: [
      "Dijital Gülüş Tasarımı",
      "Havaalanı Transferi",
      "Çok Dilli Ekip",
      "Konaklama Desteği",
    ],
    doctorIds: ["d-8"],
    reviews: [
      {
        id: "cr-6",
        author: "Sophie L.",
        rating: 5,
        date: "1 hafta önce",
        comment: "Amazing results and a very friendly, multilingual team.",
      },
    ],
  },
  {
    id: "c-6",
    name: "Boğaziçi Kadın Sağlığı Kliniği",
    slug: "bogazici-kadin-sagligi",
    city: "İstanbul",
    district: "Beşiktaş",
    address: "Barbaros Bulvarı No:20, Beşiktaş / İstanbul",
    rating: 4.9,
    reviewCount: 344,
    coverImage:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    ],
    specialties: ["Kadın Doğum"],
    priceFrom: 1000,
    priceTo: 20000,
    about:
      "Boğaziçi Kadın Sağlığı Kliniği, gebelik takibi ve tüp bebek tedavilerinde bütüncül ve şefkatli bir yaklaşım sunar.",
    amenities: [
      "4D Ultrason",
      "Tüp Bebek Ünitesi",
      "Aynı Gün Randevu",
      "Ücretsiz Otopark",
    ],
    doctorIds: ["d-6"],
    reviews: [
      {
        id: "cr-7",
        author: "Merve B.",
        rating: 5,
        date: "4 gün önce",
        comment: "Kendimi tüm süreç boyunca güvende hissettim.",
      },
    ],
  },
];

export function getClinic(id: string): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

export function getDoctor(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function getDoctorsForClinic(clinicId: string): Doctor[] {
  return doctors.filter((d) => d.clinicId === clinicId);
}

export function getClinicForDoctor(doctorId: string): Clinic | undefined {
  const doctor = getDoctor(doctorId);
  if (!doctor) return undefined;
  return getClinic(doctor.clinicId);
}
