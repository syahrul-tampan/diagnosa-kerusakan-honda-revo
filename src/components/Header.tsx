
import { Link } from 'react-router-dom';
import { User, Wrench, Clock, Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-revo-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="h-6 w-6" />
          <span>Revo Diagnostics</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-revo-accent transition-colors flex items-center gap-1">
                <Wrench size={18} />
                <span>Diagnosa</span>
              </Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-revo-accent transition-colors flex items-center gap-1">
                <Clock size={18} />
                <span>Riwayat</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-revo-accent transition-colors flex items-center gap-1">
                <Phone size={18} />
                <span>Kontak</span>
              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center gap-1 hover:text-revo-accent transition-colors">
                <User size={18} />
                <span>Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
