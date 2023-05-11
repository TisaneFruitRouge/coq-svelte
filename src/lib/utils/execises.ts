import type { ICurrentExercise } from './interfaces';

export const resetExercise = (store: ICurrentExercise) => {
    store.canChangeSettings = false;
    store.showGoal = false;
    store.isCompleted = false;
    store.blocks = [];
}

export const parseExercise = (newStore: ICurrentExercise) => {

    resetExercise(newStore);

    let text = newStore.text;

    let posStart = text.indexOf("(**");
    let posEnd   = text.indexOf("**)");

    let listCommentBlocks:Array<[number, number]> = [[posStart, posEnd]];

    while (posStart !== -1) {
        posStart = text.indexOf("(**", posStart + 1);
        posEnd   = text.indexOf("**)", posEnd + 1);
        
        if (posStart !== -1 && posEnd !== -1) {
            listCommentBlocks.push([posStart, posEnd]);
        }
    }

    for (let [i, commentBlocks] of listCommentBlocks.entries()) {
        if (i === 0) {
            let firstBlock = text.substring(...commentBlocks);

            let configStart = firstBlock.indexOf("[config]");
            let configEnd   = firstBlock.indexOf("[/config]");

            let configBlock = firstBlock.substring(configStart, configEnd);
            let configs = configBlock
                            .split("\n")
                            .filter(line => line.includes(':'))
                            .map(line => line.trim().split(':'));
            
            for (let [setting, value] of configs) {
                value = value.trim();
                switch (setting) {
                    case 'showGoal':
                        newStore.showGoal = value === "true"; 
                        break;
                    case 'canChangeSettings':
                        newStore.canChangeSettings = value === "true"; 
                        break;
                }
            }

            let textFirstBlock = firstBlock.split("[/config]")[1].trim();
            newStore.blocks = [...newStore.blocks, {text: textFirstBlock.replace('(**)', ""), type: 'comment'}];

            if (i !== listCommentBlocks.length - 1) {
                newStore.blocks = [...newStore.blocks, 
                    {
                        text: text.substring(commentBlocks[1], listCommentBlocks[i + 1][0])
                            .replace('**)', "")
                            .trim()
                            .replace(".", ".\n"),
                        type: 'coq'
                    }
                ];
            }

        } else {
            let block = text.substring(...commentBlocks);
            newStore.blocks = [...newStore.blocks, {text: block.replace('(**', ""), type: 'comment'}];
            
            if (i !== listCommentBlocks.length - 1) {
                newStore.blocks = [...newStore.blocks, 
                    {
                        text: text.substring(commentBlocks[1], listCommentBlocks[i + 1][0])
                            .replace('**)', "")
                            .trim()
                            .replace(".", ".\n"),
                        type: 'coq'
                    }
                ];
            }

        }
    }

    newStore.blocks = [...newStore.blocks,
        {
            text: text.substring(listCommentBlocks[listCommentBlocks.length - 1][1])
                .replace('**)', "")
                .replace(".", ".\n"),
            type: 'coq'
        } 
    ];
}


export let filterReadOnly = (text: string) => {
    let readOnlyStart = text.indexOf("(*/HIDE*)");
    let readOnlyEnd   = text.indexOf("(*\\HIDE*)");

    if (readOnlyStart === -1 || readOnlyEnd === -1 || readOnlyEnd < readOnlyStart) {
        return '';
    }

    let readOnlyText = text.substring(readOnlyStart+10, readOnlyEnd); // + 10 to remove the (*/HIDE*)\n

    return readOnlyText;
}