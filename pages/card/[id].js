import { useRouter } from 'next/router';

export default function Card() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Card page for ID: {id} (coming soon...)</div>;
}
