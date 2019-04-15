// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironementModel } from './environment.model';

export const environment = {
  production: true
};


export const config: EnvironementModel = {
  'environmentName': 'Test Environment',
  'ionicEnvName': 'test',
  'classAPIEndpoint': 'http://localhost:8080/class/',
  'studentAPIEndpoint': 'http://localhost:8080/student/',
  'familyAPIEndpoint': 'http://localhost:8080/family/',
  'getClassTime': 15000,
  'firebase': 'AIzaSyDejeeCDRpDwDi3gCqHUDqjeIF-8dbJKFo',
  'firebasedomain': 'hapkido-signin.firebaseapp.com',
  'aws_cognito_region': 'ap-southeast-2',
  'aws_user_pools_id': 'ap-southeast-2_xwJzu6o5o',
  'aws_user_pools_web_client_id': '1kjv0a3rm18od63enl28q9smj2',
  'feature_toggle': {
    'cognito_login': true,
    'download_graphs': true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
