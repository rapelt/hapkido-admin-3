export interface MediaModel {
    id: number;
    file_name: string;
    file_type: string;
    original_file_name: string;
    folder: string;
    size?: string; // Thumbnail, Full
    tags?: number[];
    uploadStatus: string | number;
    publishedStatus: string;
    views: number;
    url: string;
    updatedAt?: Date;
}
