
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Header = ({ cartItemsCount = 0, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleNavigateToAuth = (mode: 'signin' | 'signup') => {
    try {
      navigate(`/${mode}`);
    } catch (error) {
      console.error(`Error navigating to ${mode}:`, error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/bb163471-e547-491d-b573-7d52ae442c7c.png" 
              alt="FabGuard Logo" 
              className="h-8 w-8 mr-3"
            />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              FabGuard
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Membership
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </button>
            
            {/* Cart Button */}
            {cartItemsCount > 0 && onCartClick && (
              <Button
                onClick={onCartClick}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartItemsCount}
                </span>
              </Button>
            )}
            
            {/* Account Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:block">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    My Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:block">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleNavigateToAuth('signin')}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigateToAuth('signup')}>
                    Sign Up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Button */}
            {cartItemsCount > 0 && onCartClick && (
              <Button
                onClick={onCartClick}
                variant="outline"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-red-500 text-white rounded-full px-1 py-0 text-xs ml-1">
                  {cartItemsCount}
                </span>
              </Button>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    My Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("membership")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Membership
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Contact
              </button>
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Account</h3>
                  <Button
                    onClick={() => handleNavigateToAuth('signin')}
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigateToAuth('signup')}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
