
import { useRouter } from 'next/router'

const Auth = async (userID) => {
  const router = useRouter();
  const body = JSON.stringify({ userID: userID });
  const response = await fetch('http://localhost:3000/api/validUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  })
    .then((response) => response.json());
  if (response) {
    try {
      // return router.push('/dashboard');
      return true;
    } catch (err) {
    }
  } else {
    return (false);
  }
}
export default Auth;