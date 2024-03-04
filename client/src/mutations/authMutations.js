import { gql } from "@apollo/client";

const SIGN_UP_GOOGLE = gql`
  mutation signUpGoogle($accessToken: String!) {
    signUpGoogle(accessToken: $accessToken) {
      displayName
      pictureUrl
      message
      accessToken
    }
  }
`;

export { SIGN_UP_GOOGLE };
