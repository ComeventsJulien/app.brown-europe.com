import { PartnerCategoryTranslate } from './partner_category_translate';
import { Partner } from './partner';

export interface PartnerCategory {
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  image: string,
  visible: boolean,
  position: number,
  partners: Array<Partner>,
  partnerCategoryTranslates: Array<PartnerCategoryTranslate>,
}
