// Login page serving file
function LoginPage(): JSX.Element {
  return <div>
    <div>Login</div>
    <form action='/api/login' method='post' id='login'>
      <input id='username' name="username" placeholder="username"></input>
      <input id='password' name='password' placeholder='password' type='text'></input>
      <button type='submit' value='send'>Login</button>
    </form>

  </div>
}

export default LoginPage;
