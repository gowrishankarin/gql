import { useGoogleLogin } from "@react-oauth/google"
import { FcGoogle } from "react-icons/fc"

function Login() {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
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