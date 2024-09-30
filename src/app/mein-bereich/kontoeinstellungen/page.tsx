"use client";

import UserSettings from "@/components/user/UserSettings";
import { useAuth } from "@/context/AuthContext";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";

const SettingsPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Bitte melde dich an, um auf diese Seite zuzugreifen." />
    );
  }

  return (
    <div className="container mx-auto px-4">
      <UserSettings />
    </div>
  );
};

export default SettingsPage;
