import TopBannerStyles from '../styles/TopBannerTest.module.css';
import FeaturesStyles from '../styles/FeaturesTest.module.css';
import howItWorksStyles from '../styles/HowItWorks.module.css';
import heroStyles from '../styles/Hero.module.css';
import testimonialsStyles from '../styles/Testimonials.module.css';
import pricingStyles from '../styles/Pricing.module.css';
import ctaStyles from '../styles/CTA.module.css';
import faqStyles from '../styles/FAQ.module.css';
import aiShowcaseStyles from '../styles/AIShowcase.module.css';
import Image from 'next/image';
import ImageCompareSlider from '../components/ImageCompareSlider';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={heroStyles.hero}>
        <div className={heroStyles.heroContent}>
          <h1 className={heroStyles.heroTitle}>
            Restore Memories, <span className={heroStyles.accent}>Not Just Images</span>
          </h1>
          <p className={heroStyles.heroSubtitle}>
            Bring your old family photos back to life with cutting-edge, privacy-first AI technology. 
            No subscriptions, no gimmicks — just beautifully restored memories in under 2 minutes.
          </p>
          <div className={heroStyles.heroButtons}>
            <button className={heroStyles.primaryButton}>Try 3 Photos Free</button>
            <button className={heroStyles.secondaryButton}>See Examples</button>
          </div>
          <div className={heroStyles.trustBadges}>
            <span className={heroStyles.badge}>🔐 Privacy First</span>
            <span className={heroStyles.badge}>⚡ 47s Average</span>
            <span className={heroStyles.badge}>🆓 No Signup</span>
          </div>
        </div>
      </section>

      {/* Top Banner Section */}
    <section className={TopBannerStyles.banner}>
      <div className={TopBannerStyles.bannerContent}>
        <div className={TopBannerStyles.bannerBadge}>🔄 About Anastasis</div>
        <h2 className={TopBannerStyles.bannerTitle}>
          Heritage-Specific <span className={TopBannerStyles.titleAccent}>AI Restoration</span>
        </h2>
        <p className={TopBannerStyles.bannerSubtitle}>
          Unlike generic photo apps, Anastasis is trained specifically on vintage photography, 
          film grain, sepia tones, and analog damage from the 1900s-1990s.
        </p>
      </div>
    </section>


      {/* Image Compare Slider Section */}
      <section className={heroStyles.compareSection}>
        <h2 className={heroStyles.compareTitle}>
          See the <span className={heroStyles.accent}>Transformation</span>
        </h2>
        <p className={heroStyles.compareSubtitle}>
          Real restorations from families like yours
        </p>
        <ImageCompareSlider
          beforeImage="/images/old-photo.jpg"
          afterImage="/images/restored-photo.jpg"
        />
      </section>

      {/* Features Section */}
      <section className={FeaturesStyles.features}>
        <div className={FeaturesStyles.container}>
          <h2 className={FeaturesStyles.title}>What Makes Anastasis Different?</h2>
          <p className={FeaturesStyles.subtitle}>
            Built specifically for family memories and genealogy projects
          </p>
          <div className={FeaturesStyles.grid}>
            <div className={FeaturesStyles.card}>
              <div className={FeaturesStyles.iconWrapper}>
                <Image src="/icons/heritage.svg" alt="Heritage AI" width={48} height={48} />
              </div>
              <h3 className={FeaturesStyles.cardTitle}>🔬 Heritage-Specific AI</h3>
              <p className={FeaturesStyles.cardDescription}>
                Trained on vintage photography, film grain, sepia tones, and analog damage. 
                Our models understand historical nuances from 1930s portraits to 1970s color casts.
              </p>
            </div>
            <div className={FeaturesStyles.card}>
              <div className={FeaturesStyles.iconWrapper}>
                <Image src="/icons/quality.svg" alt="Genealogy Quality" width={48} height={48} />
              </div>
              <h3 className={FeaturesStyles.cardTitle}>📚 Genealogy-Grade Quality</h3>
              <p className={FeaturesStyles.cardDescription}>
                Trusted by family archivists and professional genealogists. 
                We don&apos;t slap filters — we bring clarity and color to moments that matter most.
              </p>
            </div>
            <div className={FeaturesStyles.card}>
              <div className={FeaturesStyles.iconWrapper}>
                <Image src="/icons/privacy.svg" alt="Fort Knox Privacy" width={48} height={48} />
              </div>
              <h3 className={FeaturesStyles.cardTitle}>🔐 Fort Knox Privacy</h3>
              <p className={FeaturesStyles.cardDescription}>
                Every photo is processed securely and automatically deleted within one hour. 
                No permanent storage, no creepy scraping, no training on your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={howItWorksStyles.container}>
        <div className={howItWorksStyles.titleWrapper}>
          <h2 className={howItWorksStyles.sectionTitle}>
            How <span className={howItWorksStyles.titleAccent}>It Works</span>
          </h2>
          <div className={howItWorksStyles.titleUnderline} />
          <p className={howItWorksStyles.subtitle}>
            Seamless restoration powered by heritage-grade AI
          </p>
        </div>
        <div className={howItWorksStyles.featuresGrid}>
          {[
            {
              icon: '📤',
              title: 'Upload Your Photo',
              description: 'No signup required. Just upload your image and select a restoration option. All you need is a digital scan or smartphone photo.',
            },
            {
              icon: '🧠',
              title: 'AI-Powered Restoration',
              description: 'Our neural models detect age damage, noise, blur, and color degradation — and correct them with surgical precision.',
            },
            {
              icon: '⚡',
              title: 'Lightning-Fast Results',
              description: 'Your photo is processed in under 2 minutes. Even full restorations rarely take more than 90 seconds.',
            },
            {
              icon: '⬇️',
              title: 'Download & Share Freely',
              description: 'Restored photos are downloadable in high-res formats, and yours to use forever. Share with loved ones or print as keepsakes.',
            },
          ].map((step, i) => (
            <div key={i} className={howItWorksStyles.featureCard}>
              <div className={howItWorksStyles.featureStat}>{step.icon}</div>
              <div className={howItWorksStyles.featureLabel}>
                <h3 className={howItWorksStyles.stepTitle}>{step.title}</h3>
                <p className={howItWorksStyles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className={pricingStyles.pricing}>
        <div className={pricingStyles.container}>
          <h2 className={pricingStyles.title}>Subscriptions? Not Here.</h2>
          <p className={pricingStyles.subtitle}>
            While others charge $9.99/month whether you use them or not, 
            Anastasis uses a simple credit system. Only pay for what you need.
          </p>
          <div className={pricingStyles.pricingGrid}>
            <div className={pricingStyles.pricingCard}>
              <div className={pricingStyles.pricingBadge}>FREE TRIAL</div>
              <h3 className={pricingStyles.pricingTitle}>Photo Fix</h3>
              <div className={pricingStyles.price}>
                <span className={pricingStyles.priceAmount}>Free</span>
              </div>
              <p className={pricingStyles.pricingDescription}>
                3 FREE repairs — sharpen, repair, and clean images instantly
              </p>
              <ul className={pricingStyles.featureList}>
                <li>✅ Dust & scratch removal</li>
                <li>✅ Image sharpening</li>
                <li>✅ Light repair</li>
                <li>✅ No signup required</li>
              </ul>
              <button className={pricingStyles.pricingButton}>Try Free Now</button>
            </div>
            <div className={`${pricingStyles.pricingCard} ${pricingStyles.featured}`}>
              <div className={pricingStyles.pricingBadge}>MOST POPULAR</div>
              <h3 className={pricingStyles.pricingTitle}>Photo Revival</h3>
              <div className={pricingStyles.price}>
                <span className={pricingStyles.priceAmount}>40</span>
                <span className={pricingStyles.priceUnit}>credits</span>
              </div>
              <p className={pricingStyles.pricingDescription}>
                Full colorization and enhancement — heritage-grade quality
              </p>
              <ul className={pricingStyles.featureList}>
                <li>✨ Full colorization</li>
                <li>✨ Blemish removal</li>
                <li>✨ Heritage-grade enhancement</li>
                <li>✨ High-resolution output</li>
              </ul>
              <button className={pricingStyles.pricingButton}>Get Started</button>
            </div>
            <div className={pricingStyles.pricingCard}>
              <div className={pricingStyles.pricingBadge}>BEST VALUE</div>
              <h3 className={pricingStyles.pricingTitle}>Credit Packs</h3>
              <div className={pricingStyles.price}>
                <span className={pricingStyles.priceAmount}>$4.99</span>
                <span className={pricingStyles.priceUnit}>starting</span>
              </div>
              <p className={pricingStyles.pricingDescription}>
                As low as $0.37 per restoration
              </p>
              <ul className={pricingStyles.featureList}>
                <li>💸 Multiple pack sizes</li>
                <li>💸 Credits never expire</li>
                <li>💸 Volume discounts</li>
                <li>💸 10 free credits on signup</li>
              </ul>
              <button className={pricingStyles.pricingButton}>View Packs</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={testimonialsStyles.testimonials}>
        <div className={testimonialsStyles.container}>
          <h2 className={testimonialsStyles.title}>👨‍👩‍👧‍👦 Trusted by Real Families</h2>
          <div className={testimonialsStyles.testimonialGrid}>
            <div className={testimonialsStyles.testimonialCard}>
              <div className={testimonialsStyles.testimonialContent}>
                <p className={testimonialsStyles.testimonialText}>
                  "Restored my grandmother&apos;s 1943 wedding photo for our reunion. Everyone was in tears!"
                </p>
              </div>
              <div className={testimonialsStyles.testimonialAuthor}>
                <strong>Sarah M.</strong>
                <span>Family Reunion</span>
              </div>
            </div>
            <div className={testimonialsStyles.testimonialCard}>
              <div className={testimonialsStyles.testimonialContent}>
                <p className={testimonialsStyles.testimonialText}>
                  "Perfect for our genealogy project. The colorization brought our ancestors to life."
                </p>
              </div>
              <div className={testimonialsStyles.testimonialAuthor}>
                <strong>Linda K.</strong>
                <span>Heritage Researcher</span>
              </div>
            </div>
            <div className={testimonialsStyles.testimonialCard}>
              <div className={testimonialsStyles.testimonialContent}>
                <p className={testimonialsStyles.testimonialText}>
                  "Now my dad&apos;s 70-year-old baby photos hang proudly in our living room."
                </p>
              </div>
              <div className={testimonialsStyles.testimonialAuthor}>
                <strong>Marcus T.</strong>
                <span>Father&apos;s Day Gift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className={aiShowcaseStyles.aiShowcase}>
        <div className={aiShowcaseStyles.container}>
          <div className={aiShowcaseStyles.showcaseHeader}>
            <div className={aiShowcaseStyles.aiLabel}>✨ AI POWERED</div>
            <h2 className={aiShowcaseStyles.showcaseTitle}>
              Witness the <span className={aiShowcaseStyles.titleGradient}>Neural Magic</span>
            </h2>
            <p className={aiShowcaseStyles.showcaseSubtitle}>
              Our heritage-trained AI doesn&apos;t just enhance—it resurrects lost memories with surgical precision
            </p>
          </div>
          
          <div className={aiShowcaseStyles.transformationGrid}>
            {[
              {
                before: "/images/before1.jpg",
                after: "/images/after1.jpg",
                year: "1952",
                category: "Wedding Portrait",
                aiFeatures: ["Colorization", "Detail Recovery", "Noise Reduction"]
              },
              {
                before: "/images/before2.jpg",
                after: "/images/after2.jpg",
                year: "1938",
                category: "Family Photo",
                aiFeatures: ["Crack Repair", "Color Revival", "Texture Enhancement"]
              },
              {
                before: "/images/before3.jpg",
                after: "/images/after3.jpg",
                year: "1945",
                category: "Military Portrait",
                aiFeatures: ["Fade Correction", "Uniform Colorization", "Face Enhancement"]
              }
            ].map((item, index) => (
              <div key={index} className={aiShowcaseStyles.transformationCard}>
                <div className={aiShowcaseStyles.imageContainer}>
                  <div className={aiShowcaseStyles.beforeAfterWrapper}>
                    <div className={aiShowcaseStyles.imageBox}>
                      <Image 
                        src={item.before} 
                        alt={`Before restoration - ${item.category}`}
                        width={300}
                        height={200}
                        className={aiShowcaseStyles.showcaseImage}
                      />
                      <div className={aiShowcaseStyles.imageLabel}>BEFORE</div>
                    </div>
                    <div className={aiShowcaseStyles.imageBox}>
                      <Image 
                        src={item.after} 
                        alt={`After restoration - ${item.category}`}
                        width={300}
                        height={200}
                        className={aiShowcaseStyles.showcaseImage}
                      />
                      <div className={aiShowcaseStyles.imageLabel}>AFTER</div>
                    </div>
                  </div>
                </div>
                <div className={aiShowcaseStyles.cardInfo}>
                  <div className={aiShowcaseStyles.photoMeta}>
                    <span className={aiShowcaseStyles.year}>{item.year}</span>
                    <span className={aiShowcaseStyles.category}>{item.category}</span>
                  </div>
                  <div className={aiShowcaseStyles.aiFeatures}>
                    {item.aiFeatures.map((feature, i) => (
                      <span key={i} className={aiShowcaseStyles.featureTag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={aiShowcaseStyles.showcaseStats}>
            <div className={aiShowcaseStyles.statItem}>
              <div className={aiShowcaseStyles.statNumber}>2.3M+</div>
              <div className={aiShowcaseStyles.statLabel}>Photos Restored</div>
            </div>
            <div className={aiShowcaseStyles.statItem}>
              <div className={aiShowcaseStyles.statNumber}>98.7%</div>
              <div className={aiShowcaseStyles.statLabel}>Success Rate</div>
            </div>
            <div className={aiShowcaseStyles.statItem}>
              <div className={aiShowcaseStyles.statNumber}>47s</div>
              <div className={aiShowcaseStyles.statLabel}>Avg Process Time</div>
            </div>
          </div>
          
          <button className={aiShowcaseStyles.showcaseCTA}>
            <span className={aiShowcaseStyles.ctaText}>Experience AI Magic</span>
            <div className={aiShowcaseStyles.ctaGlow}></div>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={faqStyles.faq}>
        <div className={faqStyles.container}>
          <h2 className={faqStyles.title}>💬 Frequently Asked Questions</h2>
          <div className={faqStyles.faqGrid}>
            <div className={faqStyles.faqItem}>
              <h3 className={faqStyles.faqQuestion}>
                What makes Anastasis better than apps like Remini or MyHeritage?
              </h3>
              <p className={faqStyles.faqAnswer}>
                We don&apos;t use generic models or push subscriptions. Anastasis is tailored for historic, 
                sentimental photos and built by people who care about family legacy.
              </p>
            </div>
            <div className={faqStyles.faqItem}>
              <h3 className={faqStyles.faqQuestion}>Is it really free to try?</h3>
              <p className={faqStyles.faqAnswer}>
                Yes! You get 3 free Photo Fix restorations. No signup, no payment info required.
              </p>
            </div>
            <div className={faqStyles.faqItem}>
              <h3 className={faqStyles.faqQuestion}>What happens to my photo after it&apos;s restored?</h3>
              <p className={faqStyles.faqAnswer}>
                It&apos;s securely deleted within one hour. We never save, sell, or reuse your uploads.
              </p>
            </div>
            <div className={faqStyles.faqItem}>
              <h3 className={faqStyles.faqQuestion}>Can I use restored photos commercially?</h3>
              <p className={faqStyles.faqAnswer}>
                Absolutely. Once restored, they&apos;re yours to print, gift, publish, or share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={ctaStyles.cta}>
        <div className={ctaStyles.container}>
          <h2 className={ctaStyles.ctaTitle}>
            📸 Try It Now – <span className={ctaStyles.accent}>No Signup Required</span>
          </h2>
          <p className={ctaStyles.ctaSubtitle}>
            Upload a photo and see the transformation in seconds
          </p>
          <div className={ctaStyles.ctaButtons}>
            <button className={ctaStyles.primaryButton}>
              🎁 Photo Fix (3 FREE)
            </button>
            <button className={ctaStyles.secondaryButton}>
              ✨ Photo Revival (Premium)
            </button>
          </div>
          <p className={ctaStyles.ctaNote}>
            No subscription. Instant results. Free trial.
          </p>
        </div>
      </section>
    </main>
  );
}