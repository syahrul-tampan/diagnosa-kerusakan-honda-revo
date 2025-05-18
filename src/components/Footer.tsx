
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-revo-dark text-white p-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 p-4 bg-revo-primary/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Butuh Bantuan Lebih Lanjut?</h3>
            <p className="mb-4">
              Jika Anda membutuhkan bantuan yang lebih spesifik, jangan ragu untuk menghubungi tim teknisi kami.
            </p>
            <Button asChild>
              <Link to="/contact" className="inline-block gap-2">
                <Phone className="h-4 w-4" />
                <span>Hubungi Kami</span>
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Revo Diagnostics</h4>
              <p className="text-sm text-gray-300">
                Sistem pakar untuk diagnosa kerusakan sepeda motor Honda Revo dengan akurasi tinggi.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Kontak</h4>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+62 813-7013-8399</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@revodiagnostics.com</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Menu Cepat</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/" className="hover:underline">Diagnosa</Link>
                </li>
                <li>
                  <Link to="/history" className="hover:underline">Riwayat</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">Kontak</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4 text-center">
            <p>&copy; 2025 Revo Diagnostics. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
