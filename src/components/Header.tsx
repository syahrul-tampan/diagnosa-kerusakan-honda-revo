
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-revo-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Revo Diagnostics</Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-revo-accent transition-colors">
                Diagnosa
              </Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-revo-accent transition-colors">
                Riwayat
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-revo-accent transition-colors">
                Kontak
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
