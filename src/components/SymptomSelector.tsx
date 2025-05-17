
import React, { useState } from 'react';
import { Symptom } from '@/types/diagnostic';
import { 
  engineSymptoms, 
  transmissionSymptoms, 
  electricalSymptoms, 
  brakeSymptoms, 
  suspensionSymptoms 
} from '@/data/diagnosticData';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomToggle: (id: string) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ selectedSymptoms, onSymptomToggle }) => {
  const [activeTab, setActiveTab] = useState('engine');

  const renderSymptomList = (symptoms: Symptom[]) => {
    return (
      <div className="grid grid-cols-1 gap-2 mt-2">
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="flex items-center space-x-2">
            <Checkbox
              id={symptom.id}
              checked={selectedSymptoms.includes(symptom.id)}
              onCheckedChange={() => onSymptomToggle(symptom.id)}
            />
            <label
              htmlFor={symptom.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
            >
              {symptom.name}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pilih Gejala Kerusakan</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engine" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="engine">Mesin</TabsTrigger>
            <TabsTrigger value="transmission">Transmisi</TabsTrigger>
            <TabsTrigger value="electrical">Kelistrikan</TabsTrigger>
            <TabsTrigger value="brake">Rem</TabsTrigger>
            <TabsTrigger value="suspension">Suspensi</TabsTrigger>
          </TabsList>
          <TabsContent value="engine">{renderSymptomList(engineSymptoms)}</TabsContent>
          <TabsContent value="transmission">{renderSymptomList(transmissionSymptoms)}</TabsContent>
          <TabsContent value="electrical">{renderSymptomList(electricalSymptoms)}</TabsContent>
          <TabsContent value="brake">{renderSymptomList(brakeSymptoms)}</TabsContent>
          <TabsContent value="suspension">{renderSymptomList(suspensionSymptoms)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SymptomSelector;
