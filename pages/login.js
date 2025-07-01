// pages/login.js
import LoginForm from '../components/LoginForm'; // adjust path if needed

export default function LoginPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: 500, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Log In</h1>
      <LoginForm />
    </main>
  );
}
