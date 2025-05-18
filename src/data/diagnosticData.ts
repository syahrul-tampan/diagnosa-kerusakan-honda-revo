
import { Symptom, DiagnosticResult } from "@/types/diagnostic";

// Komponen utama dengan gejala-gejala yang terkait
export const engineSymptoms: Symptom[] = [
  { id: "G01", name: "Mesin sulit dihidupkan", category: "engine" },
  { id: "G02", name: "Mesin mati secara tiba-tiba", category: "engine" },
  { id: "G03", name: "Tenaga mesin lemah", category: "engine" },
  { id: "G04", name: "Konsumsi bahan bakar boros", category: "engine" },
  { id: "G05", name: "Asap knalpot hitam pekat", category: "engine" },
  { id: "G06", name: "Asap knalpot berwarna putih/biru", category: "engine" },
  { id: "G07", name: "Suara mesin kasar", category: "engine" },
  { id: "G08", name: "Mesin cepat panas", category: "engine" },
  { id: "G28", name: "Bunyi ketukan dari mesin", category: "engine" },
  { id: "G29", name: "Oli mesin cepat habis", category: "engine" },
  { id: "G30", name: "Kebocoran oli", category: "engine" },
];

export const fuelSystemSymptoms: Symptom[] = [
  { id: "G22", name: "Karburator sering kemasukan air", category: "fuelSystem" },
  { id: "G23", name: "Bahan bakar bocor", category: "fuelSystem" },
  { id: "G24", name: "Tarikan gas tidak responsif", category: "fuelSystem" },
  { id: "G27", name: "Motor tersendat saat akselerasi", category: "fuelSystem" },
];

export const ignitionSystemSymptoms: Symptom[] = [
  { id: "G21", name: "Percikan api pada busi lemah", category: "ignitionSystem" },
  { id: "G25", name: "Indikator lampu oli menyala", category: "ignitionSystem" },
  { id: "G26", name: "Tidak ada percikan api pada busi", category: "ignitionSystem" },
];

export const transmissionSymptoms: Symptom[] = [
  { id: "G11", name: "Perpindahan gigi keras", category: "transmission" },
  { id: "G20", name: "Bunyi dengung dari area mesin", category: "transmission" },
];

export const electricalSymptoms: Symptom[] = [
  { id: "G09", name: "Starter elektrik tidak berfungsi", category: "electrical" },
  { id: "G10", name: "Kick starter berat", category: "electrical" },
  { id: "G12", name: "Lampu depan redup atau mati", category: "electrical" },
  { id: "G13", name: "Klakson tidak berbunyi atau lemah", category: "electrical" },
  { id: "G14", name: "Indikator bensin tidak akurat", category: "electrical" },
];

export const brakeSymptoms: Symptom[] = [
  { id: "G15", name: "Rem tidak pakem", category: "brake" },
  { id: "G16", name: "Suara decit saat pengereman", category: "brake" },
];

export const suspensionSymptoms: Symptom[] = [
  { id: "G17", name: "Getaran berlebih pada stang", category: "suspension" },
  { id: "G18", name: "Suspensi terasa keras", category: "suspension" },
  { id: "G19", name: "Motor oleng saat berkendara", category: "suspension" },
];

export const allSymptoms: Symptom[] = [
  ...engineSymptoms,
  ...fuelSystemSymptoms,
  ...ignitionSystemSymptoms,
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
  
  // Generate diagnostic result based on rules and selected symptoms
  let issue = '';
  let description = '';
  let severity: 'low' | 'medium' | 'high' = 'medium';
  let recommendation = '';
  
  // Rule-based diagnosis (simplified from the knowledge base provided)
  if (selectedSymptomIds.includes('G01') && selectedSymptomIds.includes('G21') && selectedSymptomIds.includes('G26')) {
    issue = 'Busi Kotor atau Rusak';
    description = 'Gejala menunjukkan masalah pada sistem pengapian, khususnya busi.';
    severity = 'medium';
    recommendation = 'Bersihkan busi dengan sikat kawat dan setel jarak elektroda, atau ganti busi baru jika sudah rusak.';
  } 
  else if (selectedSymptomIds.includes('G01') && selectedSymptomIds.includes('G26') && !selectedSymptomIds.includes('G21')) {
    issue = 'CDI Rusak';
    description = 'Gejala menunjukkan kerusakan pada unit CDI yang mempengaruhi sistem pengapian.';
    severity = 'high';
    recommendation = 'Ganti unit CDI dengan yang baru.';
  }
  else if (selectedSymptomIds.includes('G01') && selectedSymptomIds.includes('G02') && selectedSymptomIds.includes('G26')) {
    issue = 'Koil Pengapian Rusak';
    description = 'Masalah pada koil pengapian yang menyebabkan sistem pengapian tidak optimal.';
    severity = 'high';
    recommendation = 'Ganti koil pengapian dengan yang baru.';
  }
  else if (selectedSymptomIds.includes('G01') && selectedSymptomIds.includes('G03') && selectedSymptomIds.includes('G04') && selectedSymptomIds.includes('G05')) {
    issue = 'Karburator Kotor';
    description = 'Karburator yang kotor menyebabkan campuran bahan bakar dan udara tidak optimal.';
    severity = 'medium';
    recommendation = 'Bongkar dan bersihkan karburator, periksa semua saluran dan jet.';
  }
  else if (selectedSymptomIds.includes('G03') && selectedSymptomIds.includes('G04') && selectedSymptomIds.includes('G06') && selectedSymptomIds.includes('G29')) {
    issue = 'Ring Piston Aus';
    description = 'Ring piston yang aus menyebabkan kompresi mesin menurun dan konsumsi oli meningkat.';
    severity = 'high';
    recommendation = 'Ganti ring piston dan periksa kondisi silinder.';
  }
  else if (selectedSymptomIds.includes('G17') && selectedSymptomIds.includes('G18') && selectedSymptomIds.includes('G19')) {
    issue = 'Shock Absorber Bocor';
    description = 'Kerusakan pada sistem suspensi yang menyebabkan ketidakstabilan kendaraan.';
    severity = 'medium';
    recommendation = 'Ganti shock absorber.';
  }
  else if (selectedSymptomIds.includes('G15') && selectedSymptomIds.includes('G16')) {
    issue = 'Kampas Rem Aus';
    description = 'Kemampuan pengereman berkurang karena kampas rem yang sudah aus.';
    severity = 'high';
    recommendation = 'Ganti kampas rem.';
  }
  else if (selectedSymptomIds.includes('G09') && selectedSymptomIds.includes('G12') && selectedSymptomIds.includes('G13')) {
    issue = 'Aki Lemah atau Rusak';
    description = 'Masalah pada aki yang menyebabkan gangguan pada sistem kelistrikan.';
    severity = 'medium';
    recommendation = 'Isi ulang aki atau ganti dengan yang baru.';
  }
  else {
    // Default diagnosis based on the predominant category
    switch(maxCategory) {
      case 'engine':
        issue = 'Masalah pada Mesin';
        description = 'Gejala menunjukkan adanya gangguan pada sistem mesin kendaraan.';
        severity = 'medium';
        recommendation = 'Lakukan pemeriksaan menyeluruh pada komponen mesin.';
        break;
        
      case 'fuelSystem':
        issue = 'Masalah pada Sistem Bahan Bakar';
        description = 'Ada indikasi gangguan pada sistem bahan bakar kendaraan.';
        severity = 'medium';
        recommendation = 'Periksa karburator, saluran dan filter bahan bakar.';
        break;
        
      case 'ignitionSystem':
        issue = 'Masalah pada Sistem Pengapian';
        description = 'Gejala menunjukkan gangguan pada komponen sistem pengapian.';
        severity = 'medium';
        recommendation = 'Periksa busi, CDI, koil, dan komponen pengapian lainnya.';
        break;
        
      case 'transmission':
        issue = 'Masalah pada Sistem Transmisi';
        description = 'Gangguan pada sistem transmisi kendaraan.';
        severity = 'medium';
        recommendation = 'Periksa kondisi kopling, rantai, dan gigi transmisi.';
        break;
        
      case 'electrical':
        issue = 'Masalah pada Sistem Kelistrikan';
        description = 'Ada indikasi gangguan pada sistem kelistrikan kendaraan.';
        severity = 'medium';
        recommendation = 'Periksa aki, kabel-kabel, dan sekering.';
        break;
        
      case 'brake':
        issue = 'Masalah pada Sistem Pengereman';
        description = 'Gangguan pada sistem pengereman kendaraan.';
        severity = 'high';
        recommendation = 'Periksa kampas rem, cakram/tromol, dan minyak rem.';
        break;
        
      case 'suspension':
        issue = 'Masalah pada Sistem Suspensi';
        description = 'Ada indikasi gangguan pada sistem suspensi kendaraan.';
        severity = 'medium';
        recommendation = 'Periksa shock absorber, bearing roda, dan komponen suspensi lainnya.';
        break;
        
      default:
        issue = 'Masalah Campuran';
        description = 'Gejala yang dipilih menunjukkan beberapa masalah yang berbeda pada kendaraan.';
        severity = 'medium';
        recommendation = 'Lakukan pemeriksaan menyeluruh pada kendaraan oleh teknisi berpengalaman.';
    }
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
