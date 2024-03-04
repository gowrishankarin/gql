import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google"
import { FcGoogle } from "react-icons/fc"
import { Avatar, Popover, Button } from "antd";

import { SIGN_UP_GOOGLE } from "../../mutations/authMutations";

import { User } from "../../types/user";
import { getCurrentUser } from "./auth.header";

function Login() {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [signUpGoogle, { loading, error, data }] = useMutation(SIGN_UP_GOOGLE, {
    // eslint-disable-next-line no-use-before-define
    variables: { accessToken },
  });

  useEffect(() => {
    if (accessToken) {
      signUpGoogle(accessToken);
    }

    if (data && !error) {
      // TODO: Why intermediate signUoGoogle object
      const { accessToken, pictureUrl, message, displayName } =
        data.signUpGoogle;

      setCurrentUser({ accessToken, pictureUrl, message, displayName });

      localStorage.setItem(
        "user",
        JSON.stringify({ accessToken, pictureUrl, message, displayName })
      );
    }

    if (loading) {
      console.log("Loading");
    }

    if (error) {
      console.log(error);
      setAccessToken(null);
    }

    if (getCurrentUser() !== undefined) {
      setCurrentUser(getCurrentUser());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const popoverContent = (
    <div>
      <Button type="link" onClick={signout}>
        Signout
      </Button>
    </div>
  );

  return (
    <>
      {!currentUser ? (
        <FcGoogle
          onClick={handleGoogleLogin}
          style={{
            fontSize: "1.5rem",
          }}
        />
      ) : (
        <Popover content={popoverContent}>
          <Avatar size="small" src={currentUser.pictureUrl} />
        </Popover>
      )}
    </>
  );
}

export default Login;
