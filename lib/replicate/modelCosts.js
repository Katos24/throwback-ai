export const modelVersions = {
  yearbook: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
  restoreBasic: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
  restorePremium: "flux-kontext-apps/restore-image", // this is the model name, no version id needed since it's run with replicate.run
  cartoon: "black-forest-labs/flux-kontext-pro", // Cartoon generation model
  photomakerStyle: "your-photomaker-style-version-id-here",
  // add others here
};

export const modelCosts = {
  yearbook: 1,
  restoreBasic: 1, 
  restorePremium: 40,
  cartoon: 40,           // ✅ Add this! Cartoon should cost 5 credits
  photomakerStyle: 2,
  // add others here
};