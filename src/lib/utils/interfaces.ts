export interface ICurrentExercise {
    text: string;
    isCompleted: boolean;
    showGoal: boolean;
    canChangeSettings: boolean;
    blocks: Array<IBlock>
}

export interface IBlock {
    text: string;
    type: "coq" | "comment"
}

export interface IUser {
    name: string;
    isStudent: boolean;
    isAdmin: boolean;
}