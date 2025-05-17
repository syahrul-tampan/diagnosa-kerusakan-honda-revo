
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
              <Link to="/contact" className="inline-block">
                Hubungi Kami
              </Link>
            </Button>
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
