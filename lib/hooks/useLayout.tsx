'use client'

import { useContext } from "react";
import LayoutContext from "../contexts/layout/LayoutContext";

// Hook para usar o LayoutContext
export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
      throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
  };