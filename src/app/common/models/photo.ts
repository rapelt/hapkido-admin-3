export interface PhotoModel {
    id: number;
    file_name: string;
    file_type: string;
    original_file_name: string;
    folder: string;
    size: 'T' | 'F'; // Thumbnail, Full
    tags?: number[];
}
