import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  isDev?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details to console (can be extended to send to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo: errorInfo.componentStack || null,
    });

    // TODO: Send error to error tracking service (e.g., Sentry, LogRocket)
    // Example: errorTrackingService.logError(error, errorInfo);
  }

  handleReset = (): void => {
    // Reset error state to allow retry
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  getHomeUrl = (): string => {
    // Check if URL contains github.io (GitHub Pages)
    if (window.location.hostname.includes('github.io')) {
      // Extract the base path (e.g., /portfolio from https://subbiah2806.github.io/portfolio/chat)
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        // Return base URL with first path segment (e.g., https://subbiah2806.github.io/portfolio/)
        return `${window.location.origin}/${pathSegments[0]}/`;
      }
    }
    // Default to root for non-GitHub Pages deployments
    return '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="bg-card w-full max-w-2xl rounded-xl border p-8 backdrop-blur-sm">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="bg-destructive/20 rounded-full p-4">
                <svg
                  className="text-destructive h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-foreground mb-4 text-center text-3xl font-bold">
              Something went wrong
            </h1>

            <p className="text-muted-foreground mb-6 text-center text-lg">
              We&rsquo;re sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {/* Error Details (only in development) */}
            {this.props.isDev && this.state.error && (
              <div className="bg-secondary/50 mb-6 rounded-lg border p-4">
                <p className="text-destructive mb-2 font-mono text-sm font-semibold">
                  Error Details:
                </p>
                <p className="text-card-foreground mb-3 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="cursor-pointer">
                    <summary className="text-muted-foreground hover:text-foreground mb-2 font-mono text-xs">
                      Component Stack Trace
                    </summary>
                    <pre className="text-muted-foreground overflow-x-auto font-mono text-xs">
                      {this.state.errorInfo}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-semibold shadow-lg transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = this.getHomeUrl())}
                className="bg-card text-card-foreground hover:bg-card/50 rounded-lg border px-6 py-3 font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Go to Home
              </button>
            </div>

            {/* Support Information */}
            <p className="text-muted-foreground mt-8 text-center font-mono text-xs">
              If the problem persists, please contact support or refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
