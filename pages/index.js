import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Anastasis — Resurrection of Memories, powered by Throwback AI</title>
        <meta
          name="description"
          content="Anastasis powered by Throwback AI restores your vintage photos to life with advanced AI technology."
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Anastasis — Resurrection of Memories, powered by Throwback AI"
        />
        <meta
          property="og:description"
          content="Anastasis powered by Throwback AI restores your vintage photos to life with advanced AI technology."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://throwback-ai.vercel.app" />
        <meta
          property="og:image"
          content="https://throwback-ai.vercel.app/og-image.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Anastasis — Resurrection of Memories, powered by Throwback AI"
        />
        <meta
          name="twitter:description"
          content="Anastasis powered by Throwback AI restores your vintage photos to life with advanced AI technology."
        />
        <meta
          name="twitter:image"
          content="https://throwback-ai.vercel.app/info-2.png"
        />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Anastasis",
              url: "https://throwback-ai.vercel.app/",
              description:
                "Anastasis powered by Throwback AI restores your vintage photos to life with advanced AI technology.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://throwback-ai.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* Greek Themed Hero Section */}
      <section className={styles.greekBackground}>
        <div className={styles.greekContent}>
          <h1>Anastasis — The Resurrection of Memories</h1>
          <p>
            Restore your vintage photos with Greek-inspired brilliance, powered by
            Throwback AI.
          </p>

          {/* Restore Options in Hero */}
          <div className={styles.optionGridHero}>
            <OptionCard
              emoji="🧽"
              title="Restore Basic"
              desc="Quick fix for faded black & white photos."
              onClick={() => router.push("/replicate/restore-basic")}
              className={`${styles.optionCard} ${styles.optionCardBasic}`}
            />
            <OptionCard
              emoji="💎"
              title="Restore Premium"
              desc="High-quality color restoration and enhancements."
              onClick={() => router.push("/replicate/restore-premium")}
              className={`${styles.optionCard} ${styles.optionCardPremium}`}
            />
          </div>
        </div>
      </section>

      {/* Greek Before & After Section */}
      <section className={styles.beforeAfterSection}>
        <h2>Before & After — Greek Restoration</h2>
        <div className={styles.beforeAfterImagesGreek}>
          <Image
            src="/images/greek-before.png"
            alt="Greek Before"
            width={600}
            height={400}
          />
          <Image
            src="/images/greek-after.png"
            alt="Greek After"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Greek Explanation Section */}
      <section className={styles.infoGreek}>
        <p>
          <strong>Anastasis</strong> (Greek for “resurrection”) represents bringing your
          old photos back to life, restoring memories with the magic of AI.
        </p>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <FeatureCard
          icon="/icons/ai.svg"
          title="AI Yearbook Styles"
          desc="Turn your photo into a high-school throwback using AI magic."
        />
        <FeatureCard
          icon="/icons/gamepad.svg"
          title="Interactive 90s House"
          desc="Walk through your own virtual bedroom, kitchen, and more."
        />
        <FeatureCard
          icon="/icons/star.svg"
          title="Premium Content"
          desc="Unlock collectible styles, secret rooms, and bonus designs."
        />
      </section>

      {/* Info Blocks */}
      <section className={styles.infoWrap}>
        <div className={styles.infoBlock}>
          <div className={styles.beforeAfterContainer}>
            <Image
              src="/images/info-1-before.png"
              alt="Before"
              className={styles.beforeImage}
              width={400}
              height={300}
            />
            <Image
              src="/images/info-1-after.png"
              alt="After"
              className={styles.afterImage}
              width={400}
              height={300}
            />
          </div>
          <div className={styles.infoText}>
            <h2>First Info Title</h2>
            <p>Description text goes here for the first info block.</p>
          </div>
        </div>

        <div className={`${styles.infoBlock} ${styles.reverse}`}>
          <div className={styles.beforeAfterContainer}>
            <Image
              src="/images/info-2-before.png"
              alt="Before"
              className={styles.beforeImage}
              width={400}
              height={300}
            />
            <Image
              src="/images/info-2-after.png"
              alt="After"
              className={styles.afterImage}
              width={400}
              height={300}
            />
          </div>
          <div className={styles.infoText}>
            <h2>Second Info Title</h2>
            <p>Description text goes here for the second info block.</p>
          </div>
        </div>
      </section>

      {/* SEO Text for 90s Keywords */}
      <section
        className={styles.seoText}
        aria-label="90s Nostalgia and Retro Culture"
      >
        <h2>Experience the Best of the 90s with Throwback AI</h2>
        <p>
          Dive deep into the nostalgia of the 1990s with our AI-powered retro experiences.
          Whether you&apos;re looking to relive the iconic 90s fashion, vintage gaming
          vibes, classic music hits, or the unforgettable pop culture moments, Throwback AI
          brings the decade back to life. Explore authentic 90s style yearbook photos,
          interact with a virtual 90s house, and unlock exclusive content that celebrates
          everything from neon colors and cassette tapes to grunge and early internet
          culture.
        </p>
        <p>
          Perfect for 90s kids, millennials, and anyone passionate about retro trends, our
          platform offers a unique blend of nostalgia and cutting-edge AI technology.
          Rediscover your favorite decade with Throwback AI — your ultimate 90s time
          capsule.
        </p>
      </section>
    </>
  );
}

// OptionCard component
function OptionCard({ title, desc, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// FeatureCard component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className={styles.card}>
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className={styles.icon}
      />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
