import {create} from "zustand";

export const useControlsStore = create((set)=>({
    direction: null,
    setDirection: (dir) => set({direction: dir}),
}));