import testimonialsSectionData from "./testimonials-section.json";

export type TestimonialsSectionData = typeof testimonialsSectionData;

export function getTestimonialsSectionData(): TestimonialsSectionData {
  return testimonialsSectionData;
}
