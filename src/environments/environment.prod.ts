import { EnvironementModel } from './environment.model';

export const environment = {
    production: true,
};

export const config: EnvironementModel = {
    environmentName: 'Production Environment',
    ionicEnvName: 'prod',
    APIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/',
    classAPIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/class/',
    studentAPIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/student/',
    familyAPIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/family/',
    techniqueAPIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/technique/',
    tagAPIEndpoint:
        'https://cvw4yxgmn1.execute-api.ap-southeast-2.amazonaws.com/prod/tag/',
    getClassTime: 15000,
    firebase: 'AIzaSyDtY5L-fGBPiYs4Vxd6C7OFukduCKXM_ac',
    firebasedomain: 'hapkido-signin-prod.firebaseapp.com',
    aws_cognito_region: 'ap-southeast-2',
    aws_user_pools_id: 'ap-southeast-2_qhhN68Qu1',
    aws_user_pools_web_client_id: '7anuv5a2ajn6u898qqaad958ti',
    feature_toggle: {
        cognito_login: true,
        download_graphs: false,
    },
    static_image_location:
        'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/static_images/',
    default_logo: 'hapkido_brisbane_logo.png',
};
