// export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

declare global {
  interface Window {
      gtag:any;
  }
}

/*
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
*/

// lib/gtagHelper.ts

export const pageview = (GA_MEASUREMENT_ID : string, url : string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events

interface GAEvent {
  action: string, 
  category: string,
  label: string, 
  value: any
}

export const event = ({ action, category, label, value }: GAEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};