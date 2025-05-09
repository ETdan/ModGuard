import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const isAuthenticated = useUser().isAuthenticated;
  const navigate = useNavigate();

  function handleAccount() {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      window.location.href = "/signup";
    }
  }
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                ModGuard
              </span>
            </Link>
          </div>

          {/* Desktop nav items */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/pricing"
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              to="/documentation"
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              Documentation
            </Link>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground">
                Product <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute z-10 hidden group-hover:block pt-2 w-48 right-0">
                <div className="bg-card shadow-lg rounded-md border border-border overflow-hidden">
                  <Link
                    to="/features/text-moderation"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    Text Moderation
                  </Link>
                  <Link
                    to="/features/image-moderation"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    Image Moderation
                  </Link>
                  <Link
                    to="/features/api-access"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    API Access
                  </Link>
                  <Link
                    to="/features/dashboard"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>

            <div onClick={handleAccount}>
              <Button>Get Started</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border animate-fade-in">
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Pricing
            </Link>
            <Link
              to="/documentation"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Documentation
            </Link>
            <Link
              to="/features/text-moderation"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Text Moderation
            </Link>
            <Link
              to="/features/image-moderation"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Image Moderation
            </Link>
            <Link
              to="/features/api-access"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              API Access
            </Link>
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-border">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>

              <div onClick={handleAccount}>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
