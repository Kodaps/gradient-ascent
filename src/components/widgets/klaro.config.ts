export const klaroConfig = {
  translations: {
    en: {
      googleAnalytics: {
        title: "Google Analytics",
        description:
          "The analytics service ran by a most definitely non-evil company.",
      },
      purposes: {
        analytics: "Analytics",
        styling: "Styling",
      },
    },
  },
  services: [
    {
      name: "googleAnalytics",
      purposes: ["analytics"],
    },
    {
      name: "bootstrap",
      title: "Bootstrap (external resource)",
      description: "Example for embedding external stylesheets.",
      purposes: ["styling"],
    },
  ],
}
