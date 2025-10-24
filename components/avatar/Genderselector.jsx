import styles from '../../styles/AvatarPage.module.css';

/**
 * GenderSelector Component
 * Simple button group for selecting user gender
 * Options: Male, Female, Non-Binary
 */
const GenderSelector = ({ selectedGender, onGenderChange }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non_binary", label: "Non-Binary" }
  ];

  return (
    <div className={styles.configSection}>
      <h2 className={styles.sectionTitle}>Step 2: Select Gender</h2>
      
      <div className={styles.configPanel}>
        <div className={styles.buttonGroup}>
          {genderOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.optionButton} ${
                selectedGender === option.value ? styles.selected : ''
              }`}
              onClick={() => onGenderChange(option.value)}
              aria-pressed={selectedGender === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderSelector;