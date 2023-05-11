import { writable, get } from 'svelte/store';
import type { ICurrentExercise, IUser } from './lib/utils/interfaces';

export function storable<T>(data) {
   const store = writable(data);
   const { subscribe, set, update } = store;
   const isBrowser = typeof window !== 'undefined';

   isBrowser &&
      localStorage.storable &&
      set(JSON.parse(localStorage.storable));

   return {
      subscribe,
      set: n => {
         isBrowser && (localStorage.storable = JSON.stringify(n));
         set(n);
      },
      update: cb => {
         const updatedStore = cb(get(store));

         isBrowser && (localStorage.storable = JSON.stringify(updatedStore));
         set(updatedStore);
      }
   };
}

export const currentExercise = storable<ICurrentExercise>({
    text: ``,
    isCompleted: false,
    showGoal: false,
    canChangeSettings: false,
    blocks: [],
});

export const user = storable<IUser>({
    name: "",
    isAdmin: false,
    isStudent: false,
})