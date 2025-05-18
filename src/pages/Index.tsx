
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SymptomSelector from '@/components/SymptomSelector';
import DiagnosticResult from '@/components/DiagnosticResult';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DiagnosticResult as DiagnosticResultType } from '@/types/diagnostic';
import { getDiagnosticResults } from '@/data/diagnosticData';
import { toast } from '@/components/ui/sonner';
import { Wrench, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

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
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-revo-primary text-white py-12">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl font-bold mb-3">Sistem Pakar Diagnosa Kerusakan Honda Revo</h1>
            <p className="text-xl max-w-3xl mx-auto">Identifikasi masalah pada sepeda motor Honda Revo Anda dengan cepat dan akurat menggunakan sistem pakar kami</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto py-8 px-4">
          {!diagnosticResult ? (
            <div className="max-w-4xl mx-auto">
              {/* How it Works Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-revo-primary">Cara Kerja Sistem Diagnosa</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <AlertCircle className="h-12 w-12 text-revo-primary" />
                      </div>
                      <CardTitle className="text-lg">1. Identifikasi Gejala</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Pilih gejala kerusakan yang terjadi pada sepeda motor Honda Revo Anda dari daftar yang tersedia.</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <Wrench className="h-12 w-12 text-revo-primary" />
                      </div>
                      <CardTitle className="text-lg">2. Proses Diagnosa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Sistem akan menganalisis gejala yang dipilih menggunakan basis pengetahuan dan aturan dari pakar.</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <CheckCircle className="h-12 w-12 text-revo-primary" />
                      </div>
                      <CardTitle className="text-lg">3. Hasil Diagnosa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Dapatkan hasil diagnosa berupa kemungkinan kerusakan dan rekomendasi penanganan yang sesuai.</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              {/* Symptom Selection */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-revo-primary">Mulai Diagnosa Kerusakan</h2>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4 text-center">
                    Pilih gejala kerusakan yang Anda alami pada sepeda motor Honda Revo untuk mendapatkan diagnosa permasalahan.
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
                    className="px-6 py-2 gap-2"
                  >
                    {isDiagnosing ? 'Memproses...' : 'Diagnosa Sekarang'}
                    {!isDiagnosing && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </section>
              
              {/* About Section */}
              <section className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Tentang Sistem Pakar Diagnosa Honda Revo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">
                      Sistem Pakar Diagnosa Honda Revo adalah aplikasi berbasis pengetahuan yang dirancang untuk membantu pengendara dan teknisi dalam mengidentifikasi masalah pada sepeda motor Honda Revo.
                    </p>
                    <p className="mb-3">
                      Sistem ini menggunakan basis pengetahuan yang dikumpulkan dari pakar mekanik sepeda motor dan mengimplementasikan metode Forward Chaining dalam proses diagnosanya.
                    </p>
                    <p>
                      Dengan menggunakan sistem ini, Anda dapat menghemat waktu dan biaya dengan mengidentifikasi masalah secara akurat sebelum membawa kendaraan ke bengkel.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <DiagnosticResult result={diagnosticResult} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
