import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { StoreKeys, storeVersion } from "~/constants";

export interface PanelState {
  width: number;
  height: number;
  canUndo: boolean;
  canRedo: boolean;
}

export interface PanelActions {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setCanUndo: (canUndo: boolean) => void;
  setCanRedo: (canRedo: boolean) => void;
}

const usePanelStore = create<PanelState & PanelActions>()(
  persist(
    combine(
      {
        width: 800,
        height: 600,
        canUndo: false,
        canRedo: false,
      },
      (set) => ({
        setWidth: (width) => set({ width }),
        setHeight: (height) => set({ height }),
        setCanUndo: (canUndo) => set({ canUndo }),
        setCanRedo: (canRedo) => set({ canRedo }),
      }),
    ),
    {
      name: StoreKeys.Panel,
      version: storeVersion,
    },
  ),
);

export default usePanelStore;
