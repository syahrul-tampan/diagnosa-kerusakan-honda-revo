
export interface Symptom {
  id: string;
  name: string;
  category: string;
}

export interface DiagnosticResult {
  id: string;
  possibleIssue: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendedAction: string;
  selectedSymptoms: Symptom[];
  timestamp: number;
}

export interface DiagnosticHistory {
  id: string;
  timestamp: number;
  result: DiagnosticResult;
}
