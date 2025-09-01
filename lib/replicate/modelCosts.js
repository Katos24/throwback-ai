export const modelVersions = {
  yearbook: "467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769",
  restoreBasic: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
  restorePremium: "flux-kontext-apps/restore-image", // this is the model name, no version id needed since it's run with replicate.run
  cartoon: "black-forest-labs/flux-kontext-pro", // Cartoon generation model
  avatar: "easel/ai-avatars", // Avatar generation model
  // add others here
};

export const modelCosts = {
  yearbook: 20,
  restoreBasic: 1,
  restorePremium: 40,
  cartoon: 40,
  avatar: 50, // Avatar generation cost
  // add others here
};