import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  isVisible: boolean;
  message?: string;
  onCancel?: () => void;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isVisible,
  message = "Loading...",
  onCancel
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center">
            <p className="text-foreground font-medium">{message}</p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;