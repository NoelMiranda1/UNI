import { create } from 'zustand';

interface DrawerState {
  isOpen: boolean;
  activeMenu: string | null;
  setIsOpen: (isOpen: boolean) => void;
  setActiveMenu: (menu: string | null) => void;
  toggleDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  activeMenu: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));