
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-revo-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Revo Diagnostics</Link>
        <nav>
          <ul className="flex space-x-6">
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
