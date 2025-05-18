
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-revo-primary">Hubungi Kami</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="overflow-hidden">
              <img 
                src="/lovable-uploads/d527bdd5-1e09-41e4-97a3-6d60e2bff1a0.png" 
                alt="Bengkel Osama Service" 
                className="w-full h-64 object-cover"
              />
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-2">Bengkel Osama Service</h2>
                <p className="text-muted-foreground mb-4">
                  Bengkel spesialis diagnosa dan perbaikan kendaraan modern dengan teknologi terkini.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-revo-primary" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-muted-foreground">+62 813-7013-8399</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="text-revo-primary" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-muted-foreground">Jl. Syiah Kuala, Tualang Teungoh, Kec. Langsa Kota, Kota Langsa, Aceh 24354</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>08:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Layanan Kami</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Diagnosa komprehensif sistem kendaraan</li>
                  <li>Perbaikan mesin dan transmisi</li>
                  <li>Pemeliharaan sistem elektronik</li>
                  <li>Penggantian suku cadang</li>
                  <li>Konsultasi performa kendaraan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
