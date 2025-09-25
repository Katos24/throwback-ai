// components/decades/shared/GenderSelector.jsx
export default function GenderSelector({ 
  userGender, 
  setUserGender, 
  styles 
}) {
  const genderOptions = [
    { id: 'male', label: 'MALE' },
    { id: 'female', label: 'FEMALE' },
    { id: 'non-binary', label: 'NON-BINARY' }
  ];

  return (
    <div className={styles.configPanel}>
      <h3 className={styles.configTitle}>CHOOSE GENDER</h3>
      <div className={styles.styleGrid}>
        {genderOptions.map((option) => (
          <button 
            key={option.id}
            className={`${styles.styleOption} ${userGender === option.id ? styles.active : ''}`}
            onClick={() => setUserGender(option.id)}
            aria-pressed={userGender === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}