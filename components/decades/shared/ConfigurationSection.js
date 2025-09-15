// components/ConfigurationSection.js
export default function ConfigurationSection({
  userGender,
  setUserGender,
  selectedStyle,
  setSelectedStyle,
  styleStrength,
  setStyleStrength,
  workflowType,
  setWorkflowType,
  expandedSections,
  setExpandedSections,
  styles,
  decade = "90s",
  decadeStyles
}) {
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={styles.optionsGrid || styles.controlPanel}>
      {/* Row 1: Gender & Workflow */}
      <div className={styles.optionRow || styles.controlRow}>
        {/* Gender Section */}
        <div className={styles.optionSection || styles.controlSection}>
          <button 
            className={`${styles.sectionButton || styles.controlButton} ${expandedSections.gender ? styles.expanded : ''} ${userGender ? styles.completed : ''}`}
            onClick={() => toggleSection('gender')}
          >
            <span className={styles.sectionIcon || styles.controlIcon}>👤</span>
            <span className={styles.sectionTitle || styles.controlTitle}>Gender</span>
            <span className={styles.sectionValue || styles.controlValue}>{userGender || 'Select'}</span>
            <span className={styles.expandIcon}>{expandedSections.gender ? '−' : '+'}</span>
          </button>
          
          {expandedSections.gender && (
            <div className={styles.sectionContent || styles.controlContent}>
              <div className={styles.buttonGroup}>
                {["male", "female", "non-binary"].map((gender) => (
                  <button
                    key={gender}
                    className={`${styles.optionButton} ${userGender === gender ? styles.selected : ''}`}
                    onClick={() => {
                      setUserGender(gender);
                      setExpandedSections(prev => ({ ...prev, workflow: true }));
                    }}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Workflow Section */}
        <div className={styles.optionSection || styles.controlSection}>
          <button 
            className={`${styles.sectionButton || styles.controlButton} ${expandedSections.workflow ? styles.expanded : ''} ${workflowType ? styles.completed : ''}`}
            onClick={() => toggleSection('workflow')}
          >
            <span className={styles.sectionIcon || styles.controlIcon}>⚙️</span>
            <span className={styles.sectionTitle || styles.controlTitle}>Photo Quality</span>
            <span className={styles.sectionValue || styles.controlValue}>{workflowType === 'HyperRealistic-likeness' ? 'HyperRealistic' : workflowType}</span>
            <span className={styles.expandIcon}>{expandedSections.workflow ? '−' : '+'}</span>
          </button>
          
          {expandedSections.workflow && (
            <div className={styles.sectionContent || styles.controlContent}>
              <div className={styles.buttonGroup}>
                {[
                  { value: "HyperRealistic-likeness", label: "HyperRealistic" },
                  { value: "Realistic", label: "Realistic" },
                  { value: "Stylistic", label: "Stylistic" }
                ].map((workflow) => (
                  <button
                    key={workflow.value}
                    className={`${styles.optionButton} ${workflowType === workflow.value ? styles.selected : ''}`}
                    onClick={() => {
                      setWorkflowType(workflow.value);
                      setExpandedSections(prev => ({ ...prev, style: true }));
                    }}
                  >
                    {workflow.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Style & Style Strength */}
      <div className={styles.optionRow || styles.controlRow}>
        {/* Style Selection */}
        <div className={styles.optionSection || styles.controlSection}>
          <button 
            className={`${styles.sectionButton || styles.controlButton} ${expandedSections.style ? styles.expanded : ''} ${selectedStyle ? styles.completed : ''}`}
            onClick={() => toggleSection('style')}
          >
            <span className={styles.sectionIcon || styles.controlIcon}>{getDecadeEmoji(decade)}</span>
            <span className={styles.sectionTitle || styles.controlTitle}>Choose {decade} Style</span>
            <span className={styles.sectionValue || styles.controlValue}>
              {selectedStyle ? decadeStyles.find(s => s.id === selectedStyle)?.label || 'Selected' : 'Select'}
            </span>
            <span className={styles.expandIcon}>{expandedSections.style ? '−' : '+'}</span>
          </button>
          
          {expandedSections.style && (
            <div className={styles.sectionContent || styles.controlContent}>
              <div className={styles.styleGrid}>
                {decadeStyles.map((style) => (
                  <button
                    key={style.id}
                    className={`${styles.styleButton} ${selectedStyle === style.id ? styles.selected : ''}`}
                    onClick={() => {
                      setSelectedStyle(style.id);
                      setExpandedSections(prev => ({ ...prev, strength: true }));
                    }}
                    title={style.description}
                  >
                    <span className={styles.styleEmoji}>{style.emoji}</span>
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Style Strength */}
        <div className={styles.optionSection || styles.controlSection}>
          <button 
            className={`${styles.sectionButton || styles.controlButton} ${expandedSections.strength ? styles.expanded : ''} ${styles.completed}`}
            onClick={() => toggleSection('strength')}
          >
            <span className={styles.sectionIcon || styles.controlIcon}>📊</span>
            <span className={styles.sectionTitle || styles.controlTitle}>Style Strength</span>
            <span className={styles.sectionValue || styles.controlValue}>{styleStrength}%</span>
            <span className={styles.expandIcon}>{expandedSections.strength ? '−' : '+'}</span>
          </button>
          
          {expandedSections.strength && (
            <div className={styles.sectionContent || styles.controlContent}>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={styleStrength}
                  onChange={(e) => setStyleStrength(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>Preserve Face</span>
                  <span>Strong {decade} Style</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
