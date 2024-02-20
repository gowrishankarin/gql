import { gql } from "@apollo/client";

const SIGN_UP_GOOGLE = gql `
  mutation signUpGoogle($accessToken: String!) {
    signUpGoogle(accessToken: $accessToken) {
      refreshToken,
      accessToken
    }
  }
`;

export { SIGN_UP_GOOGLE };