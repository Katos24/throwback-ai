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
              Neural Image
              <span className={heroStyles.titleBreak}></span>
              <span className={heroStyles.gradient}>Enhancement</span>
            </h1>
            
            <p className={heroStyles.heroSubtitle}>
              Advanced computer vision algorithms analyze and reconstruct your images 
              with <strong>pixel-perfect precision</strong>. Experience the future of photo restoration.
            </p>
            
            <div className={heroStyles.statsRow}>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>2.3s</div>
                <div className={heroStyles.statLabel}>Avg Processing</div>
              </div>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>99.4%</div>
                <div className={heroStyles.statLabel}>Accuracy Rate</div>
              </div>
              <div className={heroStyles.stat}>
                <div className={heroStyles.statNumber}>50K+</div>
                <div className={heroStyles.statLabel}>Images Enhanced</div>
              </div>
            </div>
          </div>

          {/* AI Services Grid */}
          <div className={heroStyles.servicesContainer}>
            <h2 className={heroStyles.servicesTitle}>Choose Your Enhancement Protocol</h2>
            
            <div className={heroStyles.servicesGrid}>
              
              {/* Damage Repair AI */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                  <div className={heroStyles.serviceIcon}>🔧</div>
                  <div className={heroStyles.cardBadge}>REPAIR</div>
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
                    <span className={heroStyles.processLabel}>Restored</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Damage Repair AI</h3>
                  <p className={heroStyles.serviceDesc}>
                    Reconstruct missing pixels and repair structural damage using advanced inpainting algorithms
                  </p>
                  
                  <Link href="/replicate/restore-basic" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Initialize Repair</span>
                    <div className={heroStyles.creditCost}>
                      <span className={heroStyles.costNumber}>1</span>
                      <span className={heroStyles.costLabel}>Credit</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Style Transfer AI */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                  <div className={heroStyles.serviceIcon}>🎨</div>
                  <div className={heroStyles.cardBadge}>TRANSFORM</div>
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
                    <span className={heroStyles.processLabel}>Cartoon</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Style Transfer AI</h3>
                  <p className={heroStyles.serviceDesc}>
                    Neural style transfer converts photographic content into artistic cartoon representations
                  </p>
                  
                  <Link href="/replicate/cartoon" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Execute Transform</span>
                    <div className={heroStyles.creditCost}>
                      <span className={heroStyles.costNumber}>15</span>
                      <span className={heroStyles.costLabel}>Credits</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Colorization AI */}
              <div className={heroStyles.serviceCard}>
                <div className={heroStyles.cardHeader}>
                  <div className={heroStyles.serviceIcon}>🌈</div>
                  <div className={heroStyles.cardBadge}>COLORIZE</div>
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
                    <span className={heroStyles.processLabel}>B&W</span>
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
                    <span className={heroStyles.processLabel}>Colored</span>
                  </div>
                </div>
                
                <div className={heroStyles.serviceInfo}>
                  <h3 className={heroStyles.serviceName}>Colorization AI</h3>
                  <p className={heroStyles.serviceDesc}>
                    Deep learning models predict and apply historically accurate color palettes to monochrome images
                  </p>
                  
                  <Link href="/replicate/restore-premium" className={heroStyles.actionButton}>
                    <span className={heroStyles.buttonText}>Deploy Colorization</span>
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
                <strong>Initialize Free Trial</strong>
                <span className={heroStyles.offerDetails}>
                  <Link href="/signup" className={heroStyles.ctaLink}>Activate 5 Credits</Link> • No subscription required
                </span>
              </div>
            </div>
            
            <div className={heroStyles.securityBadges}>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Enterprise Security</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Zero Data Retention</span>
              </div>
              <div className={heroStyles.securityBadge}>
                <span className={heroStyles.checkmark}>✓</span>
                <span>Edge Processing</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}