
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
    </div>
  );
}