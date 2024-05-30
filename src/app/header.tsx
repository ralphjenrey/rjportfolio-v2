'use client';

import React, { useState, useEffect, ReactNode, createContext } from 'react';

interface HeaderProps {
  children: ReactNode;
}


function Header({ children }: HeaderProps) {
  const [isMd, setIsMd] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth > 768);
    };

  

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: isMd ? "fixed" : "static", width: 300 }}>
      {children}
    </div>
  );
}

export default Header;