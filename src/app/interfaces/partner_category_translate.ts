import { Partner } from './partner';
import { Locale } from './locale';
import { PartnerCategory } from './partner_category';

export interface PartnerCategoryTranslate {
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  locale: Locale,
  partnerCategory: PartnerCategory
}
