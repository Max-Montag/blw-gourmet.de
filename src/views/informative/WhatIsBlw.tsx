import React, { useEffect } from "react";

const WhatIsBlw: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <div></div>;
};

export default WhatIsBlw;
