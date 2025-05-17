
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiagnosticHistory } from '@/types/diagnostic';
import { deleteHistoryEntry } from '@/services/storageService';
import { Link } from 'react-router-dom';

interface HistoryCardProps {
  history: DiagnosticHistory;
  onDelete: (id: string) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ history, onDelete }) => {
  const { result } = history;
  
  const handleDelete = () => {
    deleteHistoryEntry(history.id);
    onDelete(history.id);
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{result.possibleIssue}</CardTitle>
        <CardDescription>
          {format(history.timestamp, 'dd MMMM yyyy, HH:mm')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(result.severity)}`}>
              {result.severity === 'low' ? 'Ringan' : result.severity === 'medium' ? 'Sedang' : 'Serius'}
            </span>
          </div>
          <p className="text-sm line-clamp-2">{result.description}</p>
          <div>
            <p className="text-xs text-muted-foreground mt-2">Gejala: {result.selectedSymptoms.length}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/history/${history.id}`}>Lihat Detail</Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HistoryCard;
