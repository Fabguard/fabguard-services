
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPartner = () => {
    document.getElementById('partner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ghar Ki Har Zarurat
            <span className="block text-teal-200">Ek Hi Jagah</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Plumbing se lekar laundry tak, hum provide karte hain bharosemand domestic services 
            cash on delivery ke saath. Book kariye ab aur hamare experts ko ghar bulayiye.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToServices}
              size="lg" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg"
            >
              Services Book Kariye
            </Button>
            <Button 
              onClick={scrollToPartner}
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
            >
              Partner Baniye
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
