
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomSelector from '@/components/SymptomSelector';
import DiagnosticResult from '@/components/DiagnosticResult';
import { Button } from '@/components/ui/button';
import { DiagnosticResult as DiagnosticResultType } from '@/types/diagnostic';
import { getDiagnosticResults } from '@/data/diagnosticData';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResultType | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const handleSymptomToggle = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(symptomId => symptomId !== id) : [...prev, id]
    );
  };

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Pilih minimal satu gejala untuk diagnosa');
      return;
    }

    setIsDiagnosing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = getDiagnosticResults(selectedSymptoms);
      setDiagnosticResult(result);
      setIsDiagnosing(false);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDiagnosticResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-revo-primary">Sistem Diagnosa Kendaraan</h1>
          
          {!diagnosticResult ? (
            <>
              <div className="mb-6">
                <p className="text-gray-700 mb-4 text-center">
                  Pilih gejala yang Anda alami pada kendaraan untuk mendapatkan diagnosa permasalahan.
                </p>
              </div>
              
              <div className="mb-6">
                <SymptomSelector 
                  selectedSymptoms={selectedSymptoms} 
                  onSymptomToggle={handleSymptomToggle} 
                />
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleDiagnose} 
                  disabled={selectedSymptoms.length === 0 || isDiagnosing}
                  className="px-6 py-2"
                >
                  {isDiagnosing ? 'Memproses...' : 'Diagnosa Sekarang'}
                </Button>
              </div>
            </>
          ) : (
            <DiagnosticResult result={diagnosticResult} onReset={handleReset} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
