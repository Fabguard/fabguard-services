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

  const navItems = [
    { label: "Services", sectionId: "services" },
    { label: "Membership", sectionId: "membership" },
    { label: "About", sectionId: "about" },
    { label: "Contact", sectionId: "contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border/50">
      <nav className="container-golden" aria-label="Main navigation">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Click navigates home */}
          <a 
            href="/" 
            className="flex items-center gap-3 group"
            aria-label="FabGuard Home"
          >
            <img 
              src="/lovable-uploads/bb163471-e547-491d-b573-7d52ae442c7c.png" 
              alt="FabGuard Logo" 
              className="h-10 w-10 transition-transform group-hover:scale-105"
              width={40}
              height={40}
            />
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              FabGuard
            </span>
          </a>

          {/* Desktop Navigation - 3-Click Rule: All sections accessible in 1 click */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* Cart Button */}
            {cartItemsCount > 0 && onCartClick && (
              <Button
                onClick={onCartClick}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                  {cartItemsCount}
                </span>
              </Button>
            )}
            
            {/* Account Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-primary/5">
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
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleNavigateToAuth('signin')}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/5"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleNavigateToAuth('signup')}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">
            {cartItemsCount > 0 && onCartClick && (
              <Button
                onClick={onCartClick}
                variant="outline"
                size="sm"
                className="border-primary/30"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-accent text-accent-foreground rounded-full px-1.5 py-0.5 text-xs font-bold ml-1">
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
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-left text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors font-medium py-3 px-4 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              
              {!user && (
                <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                  <Button
                    onClick={() => handleNavigateToAuth('signin')}
                    variant="outline"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigateToAuth('signup')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
