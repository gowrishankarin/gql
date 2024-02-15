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
          fontSize: '3rem',
          border: "1px solid #fff",
          padding:"1rep"
        }}
      />
    </>
  )
}

export default Login