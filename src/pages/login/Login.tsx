import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useStore } from "@/zustand/index";
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const setAuth = useStore(state => state.setAuth);

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
      toast.success('Successfully signed in! 🎬');
    }
  };

  return (
    <GoogleOAuthProvider clientId="...">
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

        <Toaster position="top-center" reverseOrder={false} />

        <div className="absolute inset-0 z-0">
          <img src="/bg-movie.jpg" alt="Movie background" className="object-cover w-full h-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
        </div>

        <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl text-white w-full max-w-sm text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Welcome to CineHub</h1>
          <p className="mb-6 text-sm text-gray-300">Login with your Google account to explore movies, reviews & more.</p>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => toast.error('Login failed 😞')}
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="pill"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );

};

export default React.memo(Login);
