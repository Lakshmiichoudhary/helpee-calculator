import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      buttons: ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+"],
      text: "",
      result: "",
      history: [],
      future: [],
      darkMode: false,
      dummyState: false,

      addButton: (symbol) => set((state) => ({ buttons: [...state.buttons, symbol] })),

      removeButton: (symbol) => set((state) => ({ buttons: state.buttons.filter((btn) => btn !== symbol) })),

      handleInput: (val) => set((state) => {
        const newText = state.text + val;
        return { text: newText }; 
      }),
      
      
      handleClear: () => set({ text: "", result: "", history: [], future: [] }),

      handleResult: () => {
        const { text } = get();
        try {
          const result = new Function(`return ${text}`)();
          set((state) => ({ result, history: [...state.history, state] }));
        } catch (error) {
          set({ result: "Error" });
        }
      },

      handleDragEnd: (event) => {
        const { active, over } = event;
      
        //console.log("Active ID:", active?.id);
        //console.log("Over ID:", over?.id);
      
        if (!over || active.id === over.id) return;
      
        set((state) => {
          const oldIndex = state.buttons.indexOf(active.id);
          const newIndex = state.buttons.indexOf(over.id);
      
          if (oldIndex === -1 || newIndex === -1) return state; 
      
          const newButtons = [...state.buttons];
          newButtons.splice(oldIndex, 1);
          newButtons.splice(newIndex, 0, active.id);
      
          return { buttons: newButtons };
        });
      },      

      // Undo functionality
      undo: () => set((state) => {
        if (state.history.length === 0) return state;
        const previousState = state.history[state.history.length - 1];
        return { ...previousState, history: state.history.slice(0, -1), future: [state, ...state.future] };
      }),

      // Redo functionality
      redo: () => set((state) => {
        if (state.future.length === 0) return state;
        const nextState = state.future[0];
        return { ...nextState, history: [...state.history, state], future: state.future.slice(1) };
      }),

      // Toggle dark mode
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'calculator-storage', 
    }
  )
);