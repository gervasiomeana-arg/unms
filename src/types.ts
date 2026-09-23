export type Language = 'es' | 'en' | 'ar' | 'fr';

export interface MultilingualText {
  es: string;
  en: string;
  ar: string;
  fr: string;
}

export interface BlogPost {
  id: string;
  title: MultilingualText;
  summary: MultilingualText;
  content: MultilingualText;
  category: 'humanitarian' | 'empowerment' | 'education' | 'health' | 'culture' | 'advocacy' | 'cooperative';
  categoryLabel: MultilingualText;
  author: {
    name: string;
    role: MultilingualText;
    avatar?: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  audioUrl?: string; // audio narrative
  quote?: MultilingualText;
  wilaya?: string; // e.g., 'Smara', 'Bojador', 'El Aaiún', 'Dajla', 'Auserd'
  likes: number;
}

export interface TestimonialMedia {
  id: string;
  type: 'video' | 'audio' | 'photo_story';
  title: MultilingualText;
  speaker: string;
  speakerRole: MultilingualText;
  location: string;
  duration?: string;
  thumbnailUrl: string;
  mediaUrl?: string; // video URL or audio URL
  quote: MultilingualText;
  fullTranscript: MultilingualText;
  date: string;
  tags: string[];
  featured: boolean;
}

export interface Campaign {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  hashtag: string;
  targetGoalEUR: number;
  currentAmountEUR: number;
  supportersCount: number;
  imageUrl: string;
  urgent: boolean;
  category: 'health' | 'education' | 'cooperative' | 'emergency';
  daysLeft: number;
}

export interface PushNotification {
  id: string;
  title: MultilingualText;
  message: MultilingualText;
  timestamp: string;
  type: 'urgent' | 'event' | 'campaign' | 'news';
  actionUrl?: string;
  read?: boolean;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  currency: 'EUR' | 'USD' | 'GBP';
  frequency: 'one_time' | 'monthly';
  cause: string;
  date: string;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'bizum';
  certificateId: string;
  isAnonymous?: boolean;
  message?: string;
}

export interface SolidarityMessage {
  id: string;
  author: string;
  country: string;
  message: string;
  date: string;
  likes: number;
}

export interface ImpactStat {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: MultilingualText;
  description: MultilingualText;
  icon: string;
}
