import { writable } from 'svelte/store';

import type { ICurrentExercise } from './lib/utils/interfaces';

export const currentExercise = writable<ICurrentExercise>({
    text: `
    (**
        [config]
            showGoal: false;
            canChangeSettings: false;
        [/config]
    **)
        `,
    isCompleted: false,
    showGoal: false,
    canChangeSettings: false,
    blocks: [],
});


