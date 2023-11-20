import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_C0TWoebcC",
  ClientId: "4a7ulof4l52r7id84oe33rvh1h",
};

export default new CognitoUserPool(poolData);