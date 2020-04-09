import { EnvironementModel } from './environment.model';

export const environment = {
    production: false,
};

export const config: EnvironementModel = {
    environmentName: 'Development Environment',
    ionicEnvName: 'dev',
    APIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/',
    classAPIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/class/',
    studentAPIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/student/',
    familyAPIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/family/',
    techniqueAPIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/stechnique/',
    tagAPIEndpoint:
        'https://tfub8jwq4h.execute-api.ap-southeast-2.amazonaws.com/dev/tag/',
    getClassTime: 15000,
    aws_cognito_region: 'ap-southeast-2',
    aws_user_pools_id: 'ap-southeast-2_xwJzu6o5o',
    aws_user_pools_web_client_id: '1kjv0a3rm18od63enl28q9smj2',
    feature_toggle: {
        cognito_login: true,
        download_graphs: true,
    },
};
