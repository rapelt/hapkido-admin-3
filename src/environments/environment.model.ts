export interface EnvironementModel {
  environmentName: string;
  ionicEnvName: string;
  classAPIEndpoint: string;
  studentAPIEndpoint: string;
  familyAPIEndpoint: string;
  getClassTime: number;
  firebase?: string;
  firebasedomain?: string;
  aws_cognito_region: string;
  aws_user_pools_id: string;
  aws_user_pools_web_client_id: string;
  feature_toggle: {
    cognito_login: boolean;
    download_graphs: boolean;

  };

}
