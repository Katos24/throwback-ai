// components/decades/shared/AdvancedSettings.jsx
export default function AdvancedSettings({
  showAdvancedSettings,
  toggleAdvancedSettings,
  workflowType,
  setWorkflowType,
  styleStrength,
  setStyleStrength,
  decade,
  styles
}) {
  const workflowOptions = [
    { id: 'HyperRealistic-likeness', label: 'REALISTIC', description: 'Preserves natural look' },
    { id: 'HyperRealistic', label: 'HYPER-REAL', description: 'Adds fine detail' },
    { id: 'Stylistic', label: 'STYLISTIC', description: `Emphasizes artistic ${decade}s effects` }
  ];

  return (
    <section className={styles.advancedSection}>
      <button 
        className={styles.advancedToggle} 
        onClick={toggleAdvancedSettings}
        aria-expanded={showAdvancedSettings}
        aria-controls="advanced-settings-content"
      >
        <span className={`${styles.toggleIcon} ${showAdvancedSettings ? styles.expanded : ''}`}>
          ▶
        </span>
        ADVANCED SETTINGS
        <span className={styles.optionalLabel}>(OPTIONAL)</span>
      </button>
      
      <div 
        id="advanced-settings-content"
        className={`${styles.advancedContent} ${showAdvancedSettings ? styles.show : ''}`}
      >
        <div className={styles.configSection}>
          {/* Photo Quality */}
          <div className={styles.configPanel}>
            <h4 className={styles.configTitle}>PHOTO QUALITY</h4>
            <div className={styles.styleGrid}>
              {workflowOptions.map((option) => (
                <button 
                  key={option.id}
                  className={`${styles.styleOption} ${workflowType === option.id ? styles.active : ''}`}
                  onClick={() => setWorkflowType(option.id)}
                  aria-pressed={workflowType === option.id}
                  title={option.description}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className={styles.settingDescription}>
              Realistic preserves natural look, Hyper-Real adds detail, Stylistic emphasizes artistic {decade}s effects
            </p>
          </div>

          {/* Style Strength */}
          <div className={styles.configPanel}>
            <h4 className={styles.configTitle}>STYLE STRENGTH</h4>
            <div className={styles.sliderContainer}>
              <label htmlFor="style-strength-slider" className={styles.sliderLabel}>SUBTLE</label>
              <input 
                id="style-strength-slider"
                type="range" 
                className={styles.styleSlider} 
                min="5" 
                max="35" 
                value={styleStrength}
                onChange={(e) => setStyleStrength(parseInt(e.target.value))}
                aria-label="Style strength"
              />
              <span className={styles.sliderLabel}>INTENSE</span>
            </div>
            <div className={styles.sliderValue} aria-live="polite">
              STRENGTH: {styleStrength}
            </div>
            <p className={styles.settingDescription}>
              Controls how dramatically the {decade}s style is applied
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}