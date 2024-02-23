import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google"
import { FcGoogle } from "react-icons/fc"

import { SIGN_UP_GOOGLE } from "../../mutations/authMutations";

function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const [signUpGoogle, { loading, error, data }] = useMutation(SIGN_UP_GOOGLE, {
    // eslint-disable-next-line no-use-before-define
    variables: { accessToken },
  });

  useEffect(() => {
    if(accessToken) {
      signUpGoogle(accessToken)

      if(data && !error) {
        console.log('Success');
      }

      if(loading) {
        console.log('Loading')
      }

      if(error) {
        console.log(error)
        setAccessToken(null)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    }, 
    onError: (error) => {
      console.log(error);
    }
  })

  return (
    <>
      <FcGoogle 
        onClick={handleGoogleLogin}
        style={{
          fontSize: '1.5rem',
        }}
      />
    </>
  )
}

export default Login