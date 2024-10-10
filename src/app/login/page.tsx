"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/common/Login";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        router.push("/");
      }, 8000);
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex justify-center items-center bg-cyan-100 rounded-md p-8">
          <Login />
        </div>
      ) : (
        <div className="flex justify-center items-center bg-slate-200 rounded-md p-8">
          <p className="text-cyan-950">
            Du bist bereits angemeldet. Du wirst in Kürze weitergeleitet.
          </p>
        </div>
      )}
    </>
  );
};

export default LoginPage;
