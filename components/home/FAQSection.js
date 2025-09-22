import React from 'react';
import faqStyles from '../../styles/FAQ.module.css';

const FAQSection = () => {
  const faqs = [
    {
      question: "What makes Throwback AI better than apps like Remini or MyHeritage?",
      answer:
        "We don't use generic models or push subscriptions. Throwback AI is tailored for historic, sentimental photos and built by people who care about family legacy.",
    },
    {
      question: "Is it really free to try?",
      answer: "Yes! You get 1 free Photo Fix restoration. If you sign up you will also get an additional 40 credits!",
    },
    {
      question: "What happens to my photo after it's restored?",
      answer:
        "It's securely deleted within one hour. We never save, sell, or reuse your uploads.",
    },
    {
      question: "Can I use restored photos commercially?",
      answer:
        "Absolutely. Once restored, they're yours to print, gift, publish, or share.",
    },
  ];

  return (
    <section className={faqStyles.faq}>
      <div className={faqStyles.container}>
        <h2 className={faqStyles.title}>💬 Frequently Asked Questions</h2>
        <div className={faqStyles.faqGrid}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={faqStyles.faqItem}>
              <h3 className={faqStyles.faqQuestion}>{faq.question}</h3>
              <p className={faqStyles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
