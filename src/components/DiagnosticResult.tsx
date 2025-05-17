
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DiagnosticResult as DiagnosticResultType, Symptom } from '@/types/diagnostic';
import { saveToHistory } from '@/services/storageService';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';

interface DiagnosticResultProps {
  result: DiagnosticResultType | null;
  onReset: () => void;
}

const DiagnosticResult: React.FC<DiagnosticResultProps> = ({ result, onReset }) => {
  if (!result) {
    return null;
  }

  const handleSave = () => {
    saveToHistory(result);
    toast.success('Hasil diagnosa telah disimpan', {
      description: 'Anda dapat melihat riwayat diagnosa pada halaman Riwayat'
    });
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'Ringan';
      case 'medium':
        return 'Sedang';
      case 'high':
        return 'Serius';
      default:
        return 'Tidak diketahui';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Hasil Diagnosa</CardTitle>
        <CardDescription>
          {format(result.timestamp, 'dd MMMM yyyy, HH:mm')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className={getSeverityColor(result.severity)}>
          <AlertTitle className="font-bold">{result.possibleIssue}</AlertTitle>
          <AlertDescription>{result.description}</AlertDescription>
        </Alert>

        <div>
          <h4 className="font-medium mb-2">Tingkat Keparahan:</h4>
          <div className="flex items-center">
            <span className={`px-2 py-1 rounded text-sm ${getSeverityColor(result.severity)}`}>
              {getSeverityText(result.severity)}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Rekomendasi:</h4>
          <p>{result.recommendedAction}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Gejala yang Dipilih:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {result.selectedSymptoms.map((symptom: Symptom) => (
              <li key={symptom.id}>{symptom.name}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Diagnosa Baru
        </Button>
        <Button onClick={handleSave}>
          Simpan Hasil
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiagnosticResult;
