import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/HowItWorksPage.module.css'

const OPTIONS = [
  {
    icon: '📷',
    title: 'Photo Fix',
    description:
      'Makes old or blurry photos clearer by sharpening details and improving brightness and contrast.',
    tip: 'Great for faded or low-quality pictures that need a refresh.',
    cost: '1 credit',
  },
  {
    icon: '🎨',
    title: 'Full Color Restore',
    description:
      'Adds realistic color to black-and-white photos and also improves sharpness and detail.',
    tip: 'Perfect for black-and-white photos you want to see in full color.',
    cost: '40 credits',
  },
]

function OptionCard({ icon, title, description, tip, cost }) {
  return (
    <article className={styles.optionCard}>
      <h2>
        <span aria-hidden="true">{icon}</span> {title}
      </h2>
      <p>{description}</p>
      <p className={styles.tip}><strong>Tip:</strong> {tip}</p>
      <p className={styles.price}>
        <strong>Cost:</strong> {cost}
      </p>
    </article>
  )
}

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How It Works | Anastasis</title>
        <meta
          name="description"
          content="Learn how to restore and enhance your old photos with Anastasis."
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.heading}>How It Works</h1>

        <p className={styles.intro}>
          Anastasis helps you bring old memories back to life. Just follow a few easy steps to restore your photos using our smart tools.
        </p>

        {/* 👣 Step-by-Step Guide for Older Users */}
        <section className={styles.stepsSection}>
          <h2>👣 Step-by-Step Guide</h2>
          <ol className={styles.stepsList}>
            <li><strong>Choose a photo</strong> from your computer or phone that you want to improve.</li>
            <li><strong>Select a service:</strong> Use <em>Photo Fix</em> to sharpen and brighten, or <em>Full Color Restore</em> to add color.</li>
            <li><strong>Use your credits</strong> to apply the enhancement. You get 1 free credit to start!</li>
            <li><strong>Save or Download your new photo</strong> and enjoy the results.</li>
          </ol>
             <div className={styles.proTip}>
          💡 <strong>Pro Tip:</strong> Start with <strong>Photo Fix</strong> to clean up old or faded images. Then use <strong>Full Color Restore</strong> to add beautiful color.
        </div>
        </section>

    
        <section className={styles.options}>
          {OPTIONS.map((opt) => (
            <OptionCard key={opt.title} {...opt} />
          ))}
        </section>

        <section className={styles.creditsSection}>
          <h3>💳 How Credits Work</h3>
          <ul>
            <li><strong>1 free credit</strong> for every visitor—no signup needed.</li>
            <li><strong>+5 bonus credits</strong> when you register.</li>
            <li>
              Buy more anytime: <strong>$4.99 for 400 credits</strong> (enough for 400 Photo Fixes or 10 Full Color Restores).
            </li>
          </ul>
          <Link href="/signup" className={styles.ctaButton}>
            Get Started for Free
          </Link>
        </section>
      </main>
    </>
  )
}
