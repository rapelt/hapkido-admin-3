export interface EnvironementModel {
    environmentName: string;
    ionicEnvName: string;
    APIEndpoint: string;
    classAPIEndpoint: string;
    studentAPIEndpoint: string;
    familyAPIEndpoint: string;
    techniqueAPIEndpoint: string;
    tagAPIEndpoint: string;
    getClassTime: number;
    firebase?: string;
    firebasedomain?: string;
    aws_cognito_region: string;
    aws_user_pools_id: string;
    aws_user_pools_web_client_id: string;
    feature_toggle: {
        cognito_login: boolean;
        download_graphs: boolean;
        techniques: boolean;
        io: boolean;
    };
    file_upload_buckets: {
        video_uploads: string;
        other_upload: string;
    };
    static_image_location: string;
    default_logo: string;
}
