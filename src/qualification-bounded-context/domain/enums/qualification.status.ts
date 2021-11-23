export enum QualificationStatus {
    NOTDONE = 0,
    DONE = 1
}

export const QualificationStatusLabel = new Map<number, string>([
    [QualificationStatus.NOTDONE, 'Not done'],
    [QualificationStatus.DONE, 'Done'],
]);