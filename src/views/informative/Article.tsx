import React, { useEffect } from "react";

const Article: React.FC = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Article;