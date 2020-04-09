import { VideoModel } from './video';
import { PhotoModel } from './photo';
import { TagModel } from './tag';

export interface TechniqueModel {
    title: string;
    id: number;
    description: string;
    grade: number;
    techniqueSet: number;

    videos: VideoModel[];
    photos: PhotoModel[];
    tags: number[];
}
