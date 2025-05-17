
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HistoryCard from '@/components/HistoryCard';
import { getHistory, clearHistory } from '@/services/storageService';
import { DiagnosticHistory } from '@/types/diagnostic';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const History = () => {
  const [historyList, setHistoryList] = useState<DiagnosticHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setIsLoading(true);
    const history = getHistory();
    setHistoryList(history);
    setIsLoading(false);
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryList(prev => prev.filter(item => item.id !== id));
    toast.success('Riwayat diagnosa telah dihapus');
  };

  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat diagnosa?')) {
      clearHistory();
      setHistoryList([]);
      toast.success('Semua riwayat diagnosa telah dihapus');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-revo-primary">Riwayat Diagnosa</h1>
            {historyList.length > 0 && (
              <Button variant="outline" onClick={handleClearAll}>
                Hapus Semua
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p>Memuat riwayat diagnosa...</p>
            </div>
          ) : historyList.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-2">Belum ada riwayat diagnosa</h3>
              <p className="text-gray-500 mb-4">Lakukan diagnosa kendaraan untuk menyimpan hasil diagnosa di sini</p>
              <Button asChild>
                <a href="/">Diagnosa Sekarang</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {historyList.map(history => (
                <HistoryCard
                  key={history.id}
                  history={history}
                  onDelete={handleDeleteHistory}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
