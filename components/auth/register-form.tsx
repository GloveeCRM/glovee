export default function RegisterPage() {
  return (
    <form action="">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}
