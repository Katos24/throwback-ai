import Link from "next/link";

export default function About() {
  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif", padding: "0 1rem" }}>
      <h1>About Throwback AI</h1>

      <p>
        Throwback AI is a creative project dedicated to bringing the nostalgia of the 90s back to life through AI-generated images, designs, and more.
      </p>

      <p>
        Our goal is to combine cutting-edge AI technology with retro vibes to create unique and fun experiences for everyone.
      </p>

      <p>
        Want to get in touch? Feel free to <Link href="/contact">contact us</Link> or explore more on our website.
      </p>
    </main>
  );
}
