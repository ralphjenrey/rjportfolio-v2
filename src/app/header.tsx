'use client';

import React, { useState, useEffect, ReactNode, createContext } from 'react';

interface HeaderProps {
  children: ReactNode;
}


function Header({ children }: HeaderProps) {
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth > 768);
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
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