import { Partner } from './partner';
import { Locale } from './locale';

export interface PartnerTranslate {
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  partner: Partner,
  locale: Locale,
}
