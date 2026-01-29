import React from 'react';
import homePage from '../../../src/assets/homaPage.jpeg'; // Ajusta la extensión según tu imagen (.png, .jpg, etc)

export default function HeroSection() {
  return (
    <section 
      className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${homePage})`,
      }}
    >
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Forjando Campeones, Impulsando la Excelencia Atlética
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Bienvenido al Sistema de Asistencia Deportiva Tavo de la Universidad de Sonsonate, tu portal para una gestión deportiva institucional de vanguardia.
        </p>
      </div>
    </section>
  );
}