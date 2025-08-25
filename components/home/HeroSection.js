import React from 'react'
import Link from 'next/link'
import heroStyles from '../../styles/Hero.module.css'

export default function HeroSection() {
  return (
    <>
      <section className={heroStyles.hero}>
        {/* Background Elements */}
        <div className={heroStyles.backgroundGrid}></div>
        <div className={heroStyles.gradientOrb}></div>
        
        <div className={heroStyles.heroContainer}>
          {/* Main Header */}
          <div className={heroStyles.heroHeader}>
            <div className={heroStyles.aiIndicator}>
              <span className={heroStyles.dot}></span>
              <span className={heroStyles.aiText}>AI-POWERED</span>
            </div>
            
            <h1 className={heroStyles.heroTitle}>
              Bring Your Precious
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>Memories Back to Life</span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              Transform faded family photos into <strong>vibrant treasures</strong>. Repair damage, 
              add stunning colors, or create beautiful cartoon artwork from your most cherished memories.
            </p>
            
            <div className={heroStyles.statsRow}>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>50K+</div>
                <div className={heroStyles.statLabel}>Families Helped</div>
              </div>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>2.3s</div>
                <div className={heroStyles.statLabel}>Average Results</div>
              </div>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>98%</div>
                <div className={heroStyles.statLabel}>Love Their Results</div>
              </div>
            </div>
          </div>

          {/* AI Services Grid */}
          <div className={heroStyles.servicesContainer}>
            <h2 className={heroStyles.servicesTitle}>Choose Your Memory Transformation</h2>
            
            <div className={heroStyles.servicesGrid}>
              
              {/* Photo Restoration */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                </div>
                
                <div className={heroStyles.processDemo}>
                  <div className={heroStyles.beforeImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/damaged-snippet.jpg" 
                          alt="Damaged photo preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.damageOverlay}>
                          <div className={heroStyles.scratchLine}></div>
                          <div className={heroStyles.tearMark}></div>
                        </div>
                        <div className={heroStyles.circularMask}></div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Damaged</span>
                  </div>
                  
                  <div className={heroStyles.aiProcessor}>
                    <div className={heroStyles.neuralPath}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.neuralPath}></div>
                  </div>
                  
                  <div className={heroStyles.afterImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/repaired-snippet.jpg" 
                          alt="Repaired photo preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.enhancementGlow}></div>
                        <div className={heroStyles.circularMask}></div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Like New</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Photo Restoration</h3>
                  <p className={heroStyles.serviceDesc}>
                    Remove scratches, tears, and fading from your treasured family photos. 
                    Perfect for preserving irreplaceable memories.
                  </p>
                  
                  <Link href="/replicate/restore-basic" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Restore My Photo</span>
                    <div className={heroStyles.creditCost}>
                      <span className={heroStyles.costNumber}>1</span>
                      <span className={heroStyles.costLabel}>Credit</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Photo Colorization */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                </div>
                
                <div className={heroStyles.processDemo}>
                  <div className={heroStyles.beforeImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/before6.jpg" 
                          alt="Black and white photo preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.splitReveal}>
                          <div className={heroStyles.bwSide}></div>
                        </div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Black & White</span>
                  </div>
                  
                  <div className={heroStyles.aiProcessor}>
                    <div className={heroStyles.neuralPath}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.neuralPath}></div>
                  </div>
                  
                  <div className={heroStyles.afterImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/after6.jpg" 
                          alt="Colorized photo preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.splitReveal}>
                          <div className={heroStyles.colorSide}></div>
                        </div>
                        <div className={heroStyles.colorBurst}></div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Full Color</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Photo Colorization</h3>
                  <p className={heroStyles.serviceDesc}>
                    Transform black and white photos with historically accurate, beautiful colors. 
                    See your ancestors come alive like never before.
                  </p>
                  
                  <Link href="/replicate/restore-premium" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Add Color</span>
                    <div className={heroStyles.creditCost}>
                      <span className={heroStyles.costNumber}>40</span>
                      <span className={heroStyles.costLabel}>Credits</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Cartoon Creation */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                </div>
                
                <div className={heroStyles.processDemo}>
                  <div className={heroStyles.beforeImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/cartoon-before.jpg" 
                          alt="Portrait photo preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.hexagonalMask}></div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Photo</span>
                  </div>
                  
                  <div className={heroStyles.aiProcessor}>
                    <div className={heroStyles.neuralPath}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.processingDot}></div>
                    <div className={heroStyles.neuralPath}></div>
                  </div>
                  
                  <div className={heroStyles.afterImage}>
                    <div className={heroStyles.imageSlot}>
                      <div className={heroStyles.imagePreview}>
                        <img 
                          src="/images/cartoon-example.jpg" 
                          alt="Cartoon style preview" 
                          className={heroStyles.snippetImage}
                        />
                        <div className={heroStyles.cartoonSparkle}>✨</div>
                        <div className={heroStyles.hexagonalMask}></div>
                      </div>
                    </div>
                    <span className={heroStyles.processLabel}>Cartoon Art</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Cartoon Creator</h3>
                  <p className={heroStyles.serviceDesc}>
                    Turn family photos into beautiful cartoon artwork. Perfect for gifts, 
                    social media, or creating unique family portraits.
                  </p>
                  
                  <Link href="/replicate/cartoon" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Make Cartoon</span>
                    <div className={heroStyles.creditCost}>
                      <span className={heroStyles.costNumber}>40</span>
                      <span className={heroStyles.costLabel}>Credits</span>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom CTA */}
          <div className={heroStyles.bottomCTA}>
            <div className={heroStyles.creditOffer}>
              <div className={heroStyles.offerIcon}>⚡</div>
              <div className={heroStyles.offerText}>
                <strong>Try It Free Right Now</strong>
                <span className={heroStyles.offerDetails}>
                  <Link href="/signup" className={heroStyles.ctaLink}>Get 5 Free Credits</Link> • No credit card needed
                </span>
              </div>
            </div>
            
            <div className={heroStyles.securityBadges}>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>100% Private</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Photos Deleted After 1 Hour</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}