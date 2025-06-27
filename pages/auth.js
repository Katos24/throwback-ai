import SignupForm from '../components/SignupForm';

export default function AuthPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onSuccess={() => alert('Welcome! You can now log in.')} />
    </div>
  );
}