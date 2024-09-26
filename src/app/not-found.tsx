import React from "react";
import ErrorMessage from "@/components/error/ErrorMessage";

const NoRecipesAvailable: React.FC = () => {
  return <ErrorMessage message="404 - Diese Seite existiert nicht." />;
};

export default NoRecipesAvailable;
