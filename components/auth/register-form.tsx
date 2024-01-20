export default function RegisterForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" />
      </div>
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" />
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
