
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="relative h-24 w-24 mx-auto mb-6 overflow-hidden rounded-full bg-gradient-to-br from-skillup-teal to-skillup-purple p-[3px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-950">
            <span className="font-bold text-5xl text-gradient">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
