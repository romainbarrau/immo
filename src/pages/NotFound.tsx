import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight mb-4 text-foreground">404</h1>
        <p className="mb-4 text-xl text-foreground/80">Oops! Page not found</p>
        <Link to="/" className="text-foreground underline hover:text-foreground/80">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
