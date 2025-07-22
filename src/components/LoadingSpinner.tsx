import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { Theme } from '@/types/music';

interface LoadingSpinnerProps {
  isVisible: boolean;
  message?: string;
  onCancel?: () => void;
  theme?: Theme;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isVisible,
  message = "Loading...",
  onCancel,
  theme = 'blue'
}) => {
  if (!isVisible) return null;

  const getThemeClasses = () => {
    switch (theme) {
      case 'purple':
        return {
          backdrop: 'bg-purple-950/80',
          card: 'bg-purple-900/90 border-purple-700',
          spinner: 'text-purple-400',
          text: 'text-purple-100',
          button: 'text-purple-300 hover:text-purple-100'
        };
      case 'green':
        return {
          backdrop: 'bg-green-950/80',
          card: 'bg-green-900/90 border-green-700',
          spinner: 'text-green-400',
          text: 'text-green-100',
          button: 'text-green-300 hover:text-green-100'
        };
      case 'orange':
        return {
          backdrop: 'bg-orange-950/80',
          card: 'bg-orange-900/90 border-orange-700',
          spinner: 'text-orange-400',
          text: 'text-orange-100',
          button: 'text-orange-300 hover:text-orange-100'
        };
      case 'pink':
        return {
          backdrop: 'bg-pink-950/80',
          card: 'bg-pink-900/90 border-pink-700',
          spinner: 'text-pink-400',
          text: 'text-pink-100',
          button: 'text-pink-300 hover:text-pink-100'
        };
      case 'dark':
        return {
          backdrop: 'bg-gray-950/80',
          card: 'bg-gray-900/90 border-gray-700',
          spinner: 'text-gray-400',
          text: 'text-gray-100',
          button: 'text-gray-300 hover:text-gray-100'
        };
      case 'blue':
      default:
        return {
          backdrop: 'bg-blue-950/80',
          card: 'bg-blue-900/90 border-blue-700',
          spinner: 'text-blue-400',
          text: 'text-blue-100',
          button: 'text-blue-300 hover:text-blue-100'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`fixed inset-0 ${themeClasses.backdrop} backdrop-blur-sm z-50 flex items-center justify-center`}>
      <div className={`${themeClasses.card} rounded-lg p-6 shadow-lg max-w-sm w-full mx-4`}>
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className={`h-8 w-8 animate-spin ${themeClasses.spinner}`} />
          <div className="text-center">
            <p className={`${themeClasses.text} font-medium`}>{message}</p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className={`text-sm ${themeClasses.button} transition-colors`}
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