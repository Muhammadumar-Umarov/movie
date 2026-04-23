import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useStore } from "@/zustand/index";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Login = () => {
  const setAuth = useStore(state => state.setAuth);
  const navigate = useNavigate();

  interface DecodedToken {
    email: string;
    name: string;
    picture: string;
  }

  interface CredentialResponse {
    credential?: string;
  }

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<DecodedToken>(credentialResponse.credential);
      setAuth({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });
      navigate("/");
    }
  };

  return (
    <GoogleOAuthProvider clientId="570495209460-74qdf4rl9ana3ad2klpt2vsats0to7sg.apps.googleusercontent.com">
      <div className="min-h-screen w-full bg-black text-white pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div
            className="relative min-h-[320px] md:min-h-[560px] p-10 flex flex-col justify-end"
            style={{ background: "linear-gradient(160deg, #7f1d1d 0%, #111827 55%, #000000 100%)" }}
          >
            <p className="text-sm text-red-300 tracking-wide uppercase mb-3">Movie Explorer</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Watch smarter, save favorites, and continue where you left off.
            </h1>
            <p className="text-gray-300 md:text-lg">
            Save your profile by logging in and open your chosen movies on your device
            </p>
          </div>

          <div className="bg-[#0b0b0b] p-8 md:p-12 flex items-center">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">Welcome back</h2>
              <p className="text-gray-400 mb-8">Sign in with your Google account.</p>

              <div className="mb-6">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => console.log('Login Failed')}
                  theme="filled_black"
                  text="signin_with"
                  shape="pill"
                />
              </div>

              <Button onClick={() => navigate("/")} className="!bg-transparent !text-gray-300 !border-gray-700 hover:!border-red-600 hover:!text-white">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default React.memo(Login);
