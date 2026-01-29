import  { useState } from 'react';
import { Link } from 'react-router-dom';
import usoLogo from '../../assets/logo-uso.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Noticias', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary-950 border-b border-green-900/30 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-4 group z-50">
          <div className="relative">
            <img
              src={usoLogo}
              alt="Logo USO"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -inset-1 bg-green-500/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent tracking-tighter leading-none">
              Unidad Deportiva
            </span>
            
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-sm font-semibold text-gray-300 hover:text-green-400 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link to="/login">
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-md font-bold text-sm border border-white/10 transition-all active:scale-95 group">
              <svg className="w-4 h-4" viewBox="0 0 21 21">
                <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
                <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
                <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
                <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
              </svg>
              <span>Acceso Institucional</span>
            </button>
          </Link>
        </div>

        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 text-white p-2 focus:outline-none"
          aria-label="Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-green-500 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className={`
          fixed inset-0 bg-[#1e2229] transition-all duration-500 md:hidden
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}>
          <nav className="h-full flex flex-col items-center justify-center gap-8 p-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-green-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-md font-bold text-sm border border-white/10 transition-all active:scale-95 group">
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
                </svg>
                <span>Acceso Institucional</span>
              </button>
            </Link>
          </nav>
        </div>

      </div>
    </header>
  );
}