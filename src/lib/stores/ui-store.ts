/**
 * Zustand store for UI state (mobile menu, dropdowns, etc.)
 */

import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  activeDropdown: string | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setActiveDropdown: (dropdown: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeDropdown: null,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setActiveDropdown: (dropdown) => set({ activeDropdown: dropdown }),
}));
