import React from 'react';
import homePage from '../../../src/assets/homaPage.jpeg';

export default function HeroSection() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${homePage})`,
        height: '90vh', // Ajusta la altura al 90% para evitar el scroll
      }}
    >
      {/* Overlay para mejorar la lectura del texto */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto text-center px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
          Forjando Campeones, <br />
          <span className="text-green-400">Impulsando la Excelencia Atlética</span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto font-medium drop-shadow-md">
          Bienvenido al sistema <span className="font-bold">Unidad Deportiva</span> de la Universidad de Sonsonate, 
          tu portal para una gestión deportiva institucional de vanguardia.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg">
            Ver Disciplinas
          </button>
        </div>
      </div>
    </section>
  );
}