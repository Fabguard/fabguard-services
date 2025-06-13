
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/245cb9a5-5d30-4d94-8670-f995c4862b3c.png" 
              alt="Fabguard Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Fabguard
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#membership" className="text-gray-600 hover:text-blue-600 transition-colors">
              Membership
            </a>
            <a href="#partner" className="text-gray-600 hover:text-blue-600 transition-colors">
              Partner Baniye
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>
          
          <Button
            onClick={onCartClick}
            variant="outline"
            className="relative border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            <span className="ml-2 hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
