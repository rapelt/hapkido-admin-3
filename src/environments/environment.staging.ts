import { EnvironementModel } from './environment.model';

export const environment = {
  production: false
};


export const config: EnvironementModel = {
  'environmentName': 'Staging Environment',
  'ionicEnvName': 'staging',
  'classAPIEndpoint': ' https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/class/',
  'studentAPIEndpoint': ' https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/student/',
  'familyAPIEndpoint': 'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/family/',
  'getClassTime': 15000,
  'firebase': 'AIzaSyBe3EhBt9MeBmUfn8O3Pd6rqw190ATp1d8',
  'firebasedomain': 'hapkido-signin-staging.firebaseapp.com',
  'aws_cognito_region': 'ap-southeast-2',
  'aws_user_pools_id': 'ap-southeast-2_iSE7Uw8vG',
  'aws_user_pools_web_client_id': '6cmv8equdgsmvrhrphbggmd2at',
  'feature_toggle': {
  'cognito_login': true,
    'download_graphs': false
}

};
