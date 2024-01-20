export default function LoginForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="hi" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="******" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
