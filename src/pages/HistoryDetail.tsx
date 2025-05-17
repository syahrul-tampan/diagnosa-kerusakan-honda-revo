
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DiagnosticHistory, Symptom } from '@/types/diagnostic';
import { getHistory, deleteHistoryEntry } from '@/services/storageService';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';

const HistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState<DiagnosticHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const allHistory = getHistory();
      const foundHistory = allHistory.find(item => item.id === id);
      if (foundHistory) {
        setHistory(foundHistory);
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleDelete = () => {
    if (id && window.confirm('Apakah Anda yakin ingin menghapus riwayat diagnosa ini?')) {
      deleteHistoryEntry(id);
      toast.success('Riwayat diagnosa telah dihapus');
      navigate('/history');
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto text-center py-12">
            <p>Memuat data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!history) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Riwayat Tidak Ditemukan</h2>
            <p className="mb-6">Maaf, riwayat diagnosa yang Anda cari tidak ditemukan.</p>
            <Button asChild>
              <Link to="/history">Kembali ke Riwayat</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { result } = history;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/history">
                &larr; Kembali ke Riwayat
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold text-revo-primary">Detail Diagnosa</h1>
            <p className="text-gray-500">
              {format(history.timestamp, 'dd MMMM yyyy, HH:mm')}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hasil Diagnosa</CardTitle>
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
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Gejala yang Dipilih</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {result.selectedSymptoms.map((symptom: Symptom) => (
                  <li key={symptom.id}>{symptom.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="text-right">
            <Button variant="destructive" onClick={handleDelete}>
              Hapus Riwayat Ini
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HistoryDetail;
