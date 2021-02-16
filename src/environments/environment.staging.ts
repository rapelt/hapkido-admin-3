import { EnvironementModel } from './environment.model';

export const environment = {
    production: false,
};

export const config: EnvironementModel = {
    projectName: 'Hapkido Brisbane Administrators',
    environmentName: 'Staging Environment',
    ionicEnvName: 'staging',
    APIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/',
    classAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/class/',
    studentAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/student/',
    familyAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/family/',
    techniqueAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/technique/',
    tagAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/tag/',
    getClassTime: 15000,
    firebase: 'AIzaSyBe3EhBt9MeBmUfn8O3Pd6rqw190ATp1d8',
    firebasedomain: 'hapkido-signin-staging.firebaseapp.com',
    aws_cognito_region: 'ap-southeast-2',
    aws_user_pools_id: 'ap-southeast-2_iSE7Uw8vG',
    aws_user_pools_web_client_id: '6cmv8equdgsmvrhrphbggmd2at',
    feature_toggle: {
        cognito_login: true,
        download_graphs: false,
        techniques: true,
        io: true,
    },
    file_upload_buckets: {
        video_uploads: 'hapkido-uploaded-videos-dev',
        other_upload: 'hapkido-convert-videos-dev',
    },
    static_image_location:
        'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/static_images/',
    default_logo: 'hapkido_brisbane_logo.png',
};
