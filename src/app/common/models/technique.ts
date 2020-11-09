import { TechniqueSetModel } from './technique-set';
import { MediaModel } from './media';

export interface TechniqueModel {
    title: string;
    id: number;
    description: string;
    grade: number;
    techniqueSet: TechniqueSetModel;
    media: MediaModel[];
    tags: number[];
}
