import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import Button from "../../ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-ink-05 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 bg-primary rounded-sm flex items-center justify-center overflow-hidden shadow-sm">
              <span className="font-display text-white text-xl relative z-10">
                M
              </span>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-secondary rounded-full" />
            </div>
            <span className="font-display text-[28px] text-ink">Modo</span>
          </div>
        </div>

        {/* 404 Number */}
        <div className="font-display text-[120px] leading-none text-primary/10 mb-4 select-none drop-shadow-sm">
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-light/50 flex items-center justify-center backdrop-blur-sm">
            <AlertTriangle size={28} className="text-primary" />
          </div>
        </div>

        {/* Text */}
        <h1 className="font-display text-2xl text-ink mb-2">Page Not Found</h1>
        <p className="text-sm text-ink-40 mb-8 leading-relaxed font-medium">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Home size={18} className="mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
