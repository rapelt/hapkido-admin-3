export type classType =
    | ClassTypes.Adults
    | ClassTypes.Family
    | ClassTypes.Kumdo
    | ClassTypes.Advanced
    | ClassTypes.Other;

export enum ClassTypes {
    Adults = 'Adults',
    Family = 'Family',
    Kumdo = 'Kumdo',
    Advanced = 'Advanced',
    Other = 'Other',
}

export const classTypes = [
    ClassTypes.Adults,
    ClassTypes.Family,
    ClassTypes.Kumdo,
    ClassTypes.Advanced,
    ClassTypes.Other,
];
