import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-6xl text-foreground">404</h1>
      <p className="mt-4 font-serif text-base text-muted-foreground">
        The page you were looking for has wandered off.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button className="rounded-none border border-border bg-foreground px-6 py-2 font-ui text-xs uppercase tracking-[0.22em] text-background hover:bg-foreground/90">
            Return home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
