import { CognitoUser } from 'amazon-cognito-identity-js';


export class AuthenticationUser {
  constructor(
    public user: CognitoUser,
  ) {}
}
