import type { UiLocale } from "@/lib/ui-locale";

export type EmptyCopy = {
  title: string;
  description: string;
  action?: string;
};

const copy = {
  dashboardRequests: {
    tr: {
      title: "Bekleyen talep yok",
      description:
        "Pazar yerinden gelen yeni hasta talepleri burada görünür. Profilinizi güncel tutarak yanıt sürenizi kısaltın.",
      action: "Talepleri Aç",
    },
    en: {
      title: "No pending requests",
      description:
        "New marketplace patients will appear here. Keep your profile current to shorten your response time.",
      action: "Open requests",
    },
  },
  dashboardAppointments: {
    tr: {
      title: "Yaklaşan randevu yok",
      description:
        "Onayladığınız ziyaretler bu zaman çizelgesinde toplanır. Yeni bir talebi onayladığınızda tarih burada belirir.",
    },
    en: {
      title: "No upcoming appointments",
      description:
        "Confirmed visits collect on this timeline. When you approve a request, the date appears here.",
    },
  },
  origins: {
    tr: {
      title: "Henüz yurt dışı hasta kaydı yok",
      description:
        "İlk uluslararası talebiniz ulaştığında hastalarınızın geldiği ülkeler burada haritalanır.",
    },
    en: {
      title: "No international patients yet",
      description:
        "When your first overseas request arrives, the countries they travel from will be mapped here.",
    },
  },
  requests: {
    tr: {
      title: "Bekleyen randevu talebi yok",
      description:
        "MediQueue pazar yerinden gelen hastalar burada listelenir. Vitrininizi güncel tutarak yeni talepleri hızlandırın.",
      action: "Profili Güncelle",
    },
    en: {
      title: "No appointment requests waiting",
      description:
        "Marketplace patients land here. Keep your showcase current so new requests find you faster.",
      action: "Update profile",
    },
  },
  requestsFilter: {
    tr: {
      title: "Bu filtrede talep yok",
      description:
        "Seçili durumda kayıt bulunmuyor. Tüm taleplere dönerek bekleyen hastaları kaçırmayın.",
      action: "Tüm Talepler",
    },
    en: {
      title: "Nothing in this filter",
      description:
        "No requests match this status. Switch back to all requests so you don’t miss a waiting patient.",
      action: "Show all requests",
    },
  },
  requestsSelect: {
    tr: {
      title: "Bir talep seçin",
      description:
        "Soldaki listeden bir hastaya dokunun; notunu okuyup onaylayın veya yanıtlayın.",
    },
    en: {
      title: "Select a request",
      description:
        "Tap a patient on the left to read their note, then approve or reply.",
    },
  },
  consultations: {
    tr: {
      title: "Ön konsültasyon kutunuz boş",
      description:
        "Hastalar fotoğraf ve belge gönderdiğinde teklifinizi buradan ileteceksiniz. Paket fiyatlarınızı profilden hazır tutun.",
      action: "Profili Güncelle",
    },
    en: {
      title: "Your pre-consultation inbox is empty",
      description:
        "When patients send photos and documents, you’ll quote from here. Keep package prices ready on your profile.",
      action: "Update profile",
    },
  },
  consultationsFilter: {
    tr: {
      title: "Bu filtrede konsültasyon yok",
      description:
        "Başka bir duruma geçin veya tüm kayıtları görüntüleyerek bekleyen teklifleri kaçırmayın.",
      action: "Tümüne Dön",
    },
    en: {
      title: "No consultations in this filter",
      description:
        "Switch status or view all records so you don’t miss a quote waiting on you.",
      action: "Show all",
    },
  },
  consultationsSelect: {
    tr: {
      title: "Bir konsültasyon seçin",
      description:
        "Soldan bir hasta seçerek görselleri inceleyin ve fiyat teklifinizi gönderin.",
    },
    en: {
      title: "Select a consultation",
      description:
        "Pick a patient on the left to review images and send your price quote.",
    },
  },
  messagesInbox: {
    tr: {
      title: "Gelen kutunuz boş",
      description:
        "Onaylanan randevularda hastalar sizinle buradan, otomatik çeviri desteğiyle yazışır.",
      action: "Taleplere Git",
    },
    en: {
      title: "Your inbox is empty",
      description:
        "Once an appointment is confirmed, patients message you here — with automatic translation when you need it.",
      action: "Go to requests",
    },
  },
  messagesThread: {
    tr: {
      title: "Bu konuşmada henüz mesaj yok",
      description:
        "Hastaya ilk mesajı göndererek tedavi planını, konaklamayı ve transferi netleştirin.",
    },
    en: {
      title: "No messages in this conversation yet",
      description:
        "Send the first note to lock in the treatment plan, stay and airport transfer.",
    },
  },
  doctors: {
    tr: {
      title: "Kadronuza henüz hekim eklemediniz",
      description:
        "Vitrinde görünmeleri için hekimlerinizi ekleyin. Admin onayından sonra uluslararası hastalara yayınlanırlar.",
      action: "Doktor Ekle",
    },
    en: {
      title: "You haven’t added physicians yet",
      description:
        "Add your team so they appear on the showcase. After admin review they go live for international patients.",
      action: "Add a doctor",
    },
  },
  notifications: {
    tr: {
      title: "Yeni bildiriminiz yok",
      description:
        "Randevu talepleri, belge onayları ve vitrin güncellemeleri burada toplanır.",
    },
    en: {
      title: "You’re all caught up",
      description:
        "Appointment requests, document reviews and showcase updates will land here.",
    },
  },
  invoices: {
    tr: {
      title: "Henüz fatura oluşmadı",
      description:
        "İlk onaylanan tedavilerinizin komisyon dökümü dönem sonunda burada yer alır. PDF indirme de bu listeden yapılır.",
    },
    en: {
      title: "No invoices yet",
      description:
        "Commission statements for your first confirmed treatments will appear here at period close — including PDF download.",
    },
  },
  campaigns: {
    tr: {
      title: "Henüz kampanya oluşturmadınız",
      description:
        "Sezonsal indirim tanımlayarak hedef ülkelerden daha fazla talep çekin. Kampanya vitrininizde öne çıkar.",
      action: "Kampanya Oluştur",
    },
    en: {
      title: "You haven’t created a campaign yet",
      description:
        "Set a seasonal offer to attract patients from your target countries. Campaigns surface on your showcase.",
      action: "Create campaign",
    },
  },
  sponsorship: {
    tr: {
      title: "Sponsorluk paketi listelenmiyor",
      description:
        "Vitrin sıralamasını yükseltmek için paketler burada görünür. Destek ekibimiz sizinle birlikte planlar.",
    },
    en: {
      title: "No sponsorship packages listed",
      description:
        "Packages that lift your showcase ranking appear here. Our team will plan them with you.",
    },
  },
  insights: {
    tr: {
      title: "Henüz içgörü yok",
      description:
        "Talep verileriniz biriktikçe yapay zeka, doluluk ve fiyat için önerilerini burada paylaşır.",
    },
    en: {
      title: "No insights yet",
      description:
        "As request data accumulates, AI suggestions for occupancy and pricing will appear here.",
    },
  },
  competitors: {
    tr: {
      title: "Karşılaştırma verisi yok",
      description:
        "Yeterli anonim pazar verisi oluştuğunda yanıt süresi ve görünürlük kıyasınız burada durur.",
    },
    en: {
      title: "No comparison data yet",
      description:
        "Once enough anonymised market data is in, response time and visibility benchmarks will sit here.",
    },
  },
} as const satisfies Record<string, Record<UiLocale, EmptyCopy>>;

export type EmptyCopyKey = keyof typeof copy;

export function emptyCopyFor(
  key: EmptyCopyKey,
  locale: UiLocale = "tr"
): EmptyCopy {
  return copy[key][locale];
}
