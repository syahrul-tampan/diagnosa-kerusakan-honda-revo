
import { Symptom } from "@/types/diagnostic";

// Symptom categories and their respective symptoms
export const engineSymptoms: Symptom[] = [
  { id: "e1", name: "Mesin tidak mau menyala", category: "engine" },
  { id: "e2", name: "Mesin mati mendadak", category: "engine" },
  { id: "e3", name: "Suara mesin kasar", category: "engine" },
  { id: "e4", name: "Mesin tersendat saat akselerasi", category: "engine" },
  { id: "e5", name: "Asap knalpot berwarna hitam", category: "engine" },
  { id: "e6", name: "Asap knalpot berwarna biru", category: "engine" },
  { id: "e7", name: "Asap knalpot berwarna putih", category: "engine" },
  { id: "e8", name: "Mesin overheat", category: "engine" }
];

export const transmissionSymptoms: Symptom[] = [
  { id: "t1", name: "Perpindahan gigi sulit", category: "transmission" },
  { id: "t2", name: "Transmisi selip", category: "transmission" },
  { id: "t3", name: "Getaran saat perpindahan gigi", category: "transmission" },
  { id: "t4", name: "Suara berisik dari transmisi", category: "transmission" },
  { id: "t5", name: "Kebocoran fluida transmisi", category: "transmission" }
];

export const electricalSymptoms: Symptom[] = [
  { id: "el1", name: "Lampu dashboard menyala", category: "electrical" },
  { id: "el2", name: "Baterai cepat habis", category: "electrical" },
  { id: "el3", name: "Starter lemah", category: "electrical" },
  { id: "el4", name: "Sistem audio tidak berfungsi", category: "electrical" },
  { id: "el5", name: "Lampu-lampu tidak menyala", category: "electrical" }
];

export const brakeSymptoms: Symptom[] = [
  { id: "b1", name: "Rem berbunyi", category: "brake" },
  { id: "b2", name: "Jarak pengereman jauh", category: "brake" },
  { id: "b3", name: "Pedal rem terasa spons", category: "brake" },
  { id: "b4", name: "Mobil bergetar saat pengereman", category: "brake" },
  { id: "b5", name: "Rem menarik ke satu sisi", category: "brake" }
];

export const suspensionSymptoms: Symptom[] = [
  { id: "s1", name: "Guncangan berlebihan", category: "suspension" },
  { id: "s2", name: "Mobil miring ke satu sisi", category: "suspension" },
  { id: "s3", name: "Kemudi sulit dikendalikan", category: "suspension" },
  { id: "s4", name: "Suara ketukan dari suspensi", category: "suspension" },
  { id: "s5", name: "Ban aus tidak merata", category: "suspension" }
];

export const allSymptoms: Symptom[] = [
  ...engineSymptoms,
  ...transmissionSymptoms,
  ...electricalSymptoms,
  ...brakeSymptoms,
  ...suspensionSymptoms
];

export const getSymptomById = (id: string): Symptom | undefined => {
  return allSymptoms.find(symptom => symptom.id === id);
};

// Logic to determine diagnostic results based on selected symptoms
export const getDiagnosticResults = (selectedSymptomIds: string[]) => {
  // Logic for assessing the selected symptoms and determining the issue
  const selectedSymptoms = selectedSymptomIds.map(id => 
    allSymptoms.find(s => s.id === id)
  ).filter((s): s is Symptom => !!s);
  
  // Count symptoms by category
  const categoryCounts: Record<string, number> = {};
  selectedSymptoms.forEach(symptom => {
    categoryCounts[symptom.category] = (categoryCounts[symptom.category] || 0) + 1;
  });
  
  // Find the predominant category
  let maxCategory = '';
  let maxCount = 0;
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxCategory = category;
    }
  });
  
  // Generate diagnostic result based on the predominant category and specific symptoms
  let issue = '';
  let description = '';
  let severity: 'low' | 'medium' | 'high' = 'medium';
  let recommendation = '';
  
  switch(maxCategory) {
    case 'engine':
      if (selectedSymptomIds.includes('e1') || selectedSymptomIds.includes('e2')) {
        issue = 'Masalah Sistem Bahan Bakar';
        description = 'Kemungkinan ada masalah dengan pasokan bahan bakar, pompa bahan bakar, atau sistem pengapian.';
        severity = 'high';
        recommendation = 'Periksa filter dan pompa bahan bakar, serta sistem pengapian di bengkel terdekat.';
      } else if (selectedSymptomIds.includes('e5') || selectedSymptomIds.includes('e6') || selectedSymptomIds.includes('e7')) {
        issue = 'Masalah Pembakaran';
        description = 'Pembakaran tidak sempurna atau kebocoran oli dapat menyebabkan asap dari knalpot.';
        severity = 'medium';
        recommendation = 'Lakukan pemeriksaan injector, kompresi mesin, dan kemungkinan kebocoran oli.';
      } else if (selectedSymptomIds.includes('e8')) {
        issue = 'Masalah Sistem Pendinginan';
        description = 'Mesin overheat bisa disebabkan radiator tersumbat, kebocoran coolant, atau kipas pendingin rusak.';
        severity = 'high';
        recommendation = 'Segera hentikan kendaraan dan cek level coolant. Kunjungi bengkel terdekat untuk pengecekan radiator.';
      } else {
        issue = 'Masalah Mesin Umum';
        description = 'Ada beberapa gejala yang menunjukkan masalah pada mesin kendaraan Anda.';
        severity = 'medium';
        recommendation = 'Lakukan pemeriksaan menyeluruh pada mesin oleh teknisi berpengalaman.';
      }
      break;
      
    case 'transmission':
      issue = 'Masalah Transmisi';
      description = 'Gejala menunjukkan potensi masalah pada sistem transmisi kendaraan.';
      severity = 'medium';
      recommendation = 'Periksa level dan kualitas fluida transmisi. Konsultasikan dengan spesialis transmisi.';
      break;
      
    case 'electrical':
      issue = 'Masalah Sistem Kelistrikan';
      description = 'Ada indikasi masalah pada sistem kelistrikan atau pengisian kendaraan.';
      severity = 'medium';
      recommendation = 'Periksa baterai, alternator, dan kabel-kabel kelistrikan untuk menemukan masalahnya.';
      break;
      
    case 'brake':
      issue = 'Masalah Sistem Pengereman';
      description = 'Gejala menunjukkan kemungkinan masalah pada sistem pengereman kendaraan.';
      severity = 'high';
      recommendation = 'Segera periksa kondisi kampas rem, piringan rem, dan fluida rem untuk keselamatan berkendara.';
      break;
      
    case 'suspension':
      issue = 'Masalah Sistem Suspensi';
      description = 'Terdapat indikasi masalah pada sistem suspensi atau steering kendaraan.';
      severity = 'medium';
      recommendation = 'Lakukan pemeriksaan pada shock absorber, ball joint, dan komponen suspensi lainnya.';
      break;
      
    default:
      issue = 'Masalah Campuran';
      description = 'Gejala yang dipilih menunjukkan beberapa masalah yang berbeda pada kendaraan.';
      severity = 'medium';
      recommendation = 'Lakukan pemeriksaan menyeluruh pada kendaraan oleh teknisi berpengalaman.';
  }
  
  return {
    id: generateId(),
    possibleIssue: issue,
    description: description,
    severity: severity,
    recommendedAction: recommendation,
    selectedSymptoms: selectedSymptoms,
    timestamp: Date.now()
  };
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
