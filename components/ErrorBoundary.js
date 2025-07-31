import React from 'react';

// Inline styles to avoid CSS module dependency issues
const styles = {
  errorBoundary: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  errorContainer: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'center',
    border: '1px solid #fecaca',
  },
  errorIcon: {
    fontSize: '4rem',
    marginBottom: '24px',
    animation: 'pulse 2s infinite',
  },
  errorTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#dc2626',
    margin: '0 0 16px 0',
    lineHeight: '1.2',
  },
  errorMessage: {
    fontSize: '1.1rem',
    color: '#6b7280',
    margin: '0 0 32px 0',
    lineHeight: '1.6',
  },
  errorId: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px 16px',
    margin: '24px 0',
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    margin: '32px 0',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  primaryButton: {
    background: '#dc2626',
    color: 'white',
  },
  secondaryButton: {
    background: '#6b7280',
    color: 'white',
  },
  tertiaryButton: {
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
  },
  errorDetails: {
    margin: '32px 0 0 0',
    textAlign: 'left',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  errorDetailsSummary: {
    background: '#f9fafb',
    padding: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s',
  },
  errorDetailsContent: {
    padding: '20px',
    background: '#fefefe',
  },
  errorSection: {
    marginBottom: '24px',
  },
  errorPre: {
    background: '#1f2937',
    color: '#f9fafb',
    padding: '16px',
    borderRadius: '6px',
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    margin: '0',
  },
  helpText: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'left',
  },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you could send error to logging service
    // this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Example: Send to error tracking service
    // Sentry.captureException(error, { extra: errorInfo });
    
    // Or send to your own API
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.toString(),
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReportIssue = () => {
    const { error, errorId } = this.state;
    const issueBody = encodeURIComponent(
      `Error ID: ${errorId}\n\n` +
      `Error: ${error?.message || 'Unknown error'}\n\n` +
      `URL: ${window.location.href}\n\n` +
      `User Agent: ${navigator.userAgent}\n\n` +
      `Steps to reproduce:\n1. \n2. \n3. \n\n` +
      `Expected behavior:\n\n` +
      `Actual behavior:\n`
    );
    
    // Replace with your actual issue tracking URL
    const issueUrl = `https://github.com/your-repo/issues/new?title=Error%20Report&body=${issueBody}`;
    window.open(issueUrl, '_blank');
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div style={styles.errorBoundary}>
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            
            <h1 style={styles.errorTitle}>
              Oops! Something went wrong
            </h1>
            
            <p style={styles.errorMessage}>
              We encountered an unexpected error. Don't worry, this has been logged 
              and our team will investigate.
            </p>

            {errorId && (
              <div style={styles.errorId}>
                <strong>Error ID:</strong> {errorId}
                <button 
                  onClick={() => navigator.clipboard.writeText(errorId)}
                  style={styles.copyButton}
                  title="Copy Error ID"
                >
                  📋
                </button>
              </div>
            )}

            <div style={styles.actionButtons}>
              <button 
                onClick={this.handleRetry}
                style={{...styles.button, ...styles.primaryButton}}
              >
                🔄 Try Again
              </button>
              
              <button 
                onClick={this.handleReload}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                ↻ Reload Page
              </button>
              
              <button 
                onClick={this.handleReportIssue}
                style={{...styles.button, ...styles.tertiaryButton}}
              >
                🐛 Report Issue
              </button>
            </div>

            {/* Development-only error details */}
            {isDevelopment && (
              <details style={styles.errorDetails}>
                <summary style={styles.errorDetailsSummary}>
                  🔍 Error Details (Development Only)
                </summary>
                
                <div style={styles.errorDetailsContent}>
                  <div style={styles.errorSection}>
                    <h3>Error Message:</h3>
                    <pre style={styles.errorPre}>
                      {error?.toString()}
                    </pre>
                  </div>

                  {error?.stack && (
                    <div style={styles.errorSection}>
                      <h3>Stack Trace:</h3>
                      <pre style={styles.errorPre}>
                        {error.stack}
                      </pre>
                    </div>
                  )}

                  {errorInfo?.componentStack && (
                    <div style={styles.errorSection}>
                      <h3>Component Stack:</h3>
                      <pre style={styles.errorPre}>
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div style={styles.helpText}>
              <p>
                If this problem persists, please try:
              </p>
              <ul>
                <li>Refreshing the page</li>
                <li>Clearing your browser cache</li>
                <li>Using a different browser</li>
                <li>Contacting our support team</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;