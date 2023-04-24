import type { ICurrentExercise } from './interfaces';

export const parseExercise = (newStore: ICurrentExercise) => {

    let text = newStore.text;

    let listCommentBlocks = [];

    let posStart = 0;
    let posEnd   = 0;

    while (posStart !== -1) {
        posStart = text.indexOf("(**", posStart);
        posEnd   = text.indexOf("**)", posEnd);
        
        listCommentBlocks.push([posStart, posEnd]);

        posStart++;
        posEnd++;
    }

    console.log(listCommentBlocks)
}