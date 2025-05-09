import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                ModGuard
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Detect and prevent toxic content in real-time with our advanced AI
              moderation platform.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/features/text-moderation"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Text Moderation
                </Link>
              </li>
              <li>
                <Link
                  to="/features/image-moderation"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Image Moderation
                </Link>
              </li>
              <li>
                <Link
                  to="/features/api-access"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  API Access
                </Link>
              </li>
              <li>
                <Link
                  to="/features/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/documentation"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  to="/status"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ModGuard. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>X
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">GitHub</span>
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
