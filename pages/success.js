import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function Success() {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectTimer, setRedirectTimer] = useState(10);

  useEffect(() => {
    let intervalId;
    let redirectIntervalId;

    async function checkCredits() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("credits, credits_remaining")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
      setLoading(false);
      
      // Stop polling once we have credits
      if (data?.credits > 0) {
        clearInterval(intervalId);
      }
    }

    // Start polling for credit updates
    checkCredits(); // immediate first check
    intervalId = setInterval(checkCredits, 2000); // every 2 seconds

    // Countdown timer for redirect
    redirectIntervalId = setInterval(() => {
      setRedirectTimer((prev) => {
        if (prev <= 1) {
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(redirectIntervalId);
    };
  }, [supabase]);

  const handleStartRestoring = () => {
    window.location.href = "/";
  };



  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Success Icon */}
        <div style={{
          fontSize: '80px',
          marginBottom: '20px',
          animation: 'bounce 2s infinite'
        }}>
          🎉
        </div>

        {/* Success Message */}
        <h1 style={{
          color: '#333',
          fontSize: '28px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          Payment Successful!
        </h1>

        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '30px'
        }}>
          Thank you for your purchase. Your credits are being added to your account.
        </p>

        {/* Credit Status */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          {loading ? (
            <div>
              <div style={{
                fontSize: '20px',
                marginBottom: '10px',
                color: '#2d3436',
                fontWeight: 'bold'
              }}>
                ⚡ Processing your purchase...
              </div>
              <div style={{
                width: '100%',
                height: '4px',
                background: '#e0e0e0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff6b6b, #ee5a24)',
                  animation: 'loading 1.5s infinite'
                }}></div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '10px'
              }}>
                ✅ Credits Added Successfully!
              </div>
              <div style={{
                fontSize: '18px',
                color: '#333',
                marginBottom: '5px'
              }}>
                <strong>Total Credits:</strong> {profile?.credits?.toLocaleString() || 0}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#666'
              }}>
                <strong>Available:</strong> {profile?.credits_remaining?.toLocaleString() || 0} credits
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div style={{
          marginBottom: '30px'
        }}>
          <button
            onClick={handleStartRestoring}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              color: 'white',
              border: 'none',
              padding: '15px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
            }}
          >
            🚀 Start Restoring Photos
          </button>
        </div>

        {/* What's Next */}
        <div style={{
          background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #e17055'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#d63031',
            marginBottom: '8px'
          }}>
            🎯 What's Next?
          </div>
          <div style={{
            fontSize: '14px',
            color: '#2d3436',
            lineHeight: '1.4'
          }}>
            Upload your photos and watch our AI bring them back to life. 
            Each basic restoration costs 1 credit, premium restorations cost 40 credits.
          </div>
        </div>

        {/* Redirect Notice */}
        <p style={{
          color: '#999',
          fontSize: '14px'
        }}>
          Redirecting to home in {redirectTimer} seconds...
        </p>

        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0);
            }
            40%, 43% {
              transform: translateY(-30px);
            }
            70% {
              transform: translateY(-15px);
            }
            90% {
              transform: translateY(-4px);
            }
          }

          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}