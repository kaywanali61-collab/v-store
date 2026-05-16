import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/* ============================================================
   APP-LEVEL ERROR BOUNDARY
   
   Wraps the entire React tree. Catches any unhandled render
   error and shows a recovery screen instead of a black page.
   ============================================================ */

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[V Store] Render error caught:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleHardReset = () => {
    try {
      localStorage.removeItem('vstore-wishlist');
      localStorage.removeItem('vstore-cart');
      localStorage.removeItem('vstore-data-version');
    } catch { /* ignore */ }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={36} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              An unexpected error occurred. Try reloading — or clear app data to reset.
            </p>
            {this.state.error && (
              <pre className="mb-6 p-4 rounded-xl bg-white/5 text-[11px] text-red-400/70 text-left overflow-auto max-h-32 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col gap-3">
              <button onClick={this.handleReset} className="w-full py-3.5 rounded-xl btn-gradient text-sm font-semibold text-white flex items-center justify-center gap-2">
                <RefreshCw size={16} /> Try Again
              </button>
              <button onClick={this.handleHardReset} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                Clear Data & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ============================================================
   PER-CARD ERROR BOUNDARY
   
   Lightweight boundary that returns null on error.
   Wraps each ProductCard so one broken card can never
   crash the grid or the page it lives on.
   ============================================================ */

interface CardProps {
  children: ReactNode;
}

interface CardState {
  hasError: boolean;
}

export class CardErrorBoundary extends Component<CardProps, CardState> {
  state: CardState = { hasError: false };

  static getDerivedStateFromError(): CardState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[V Store] Card render error suppressed:', error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
