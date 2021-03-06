import { Resource } from './resource';
import { PartnerTranslate } from './partner_translate';

export interface Category {
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  visible: boolean,
  position: number,
  resources: Array<Resource>,
  partnerTranslates: Array<PartnerTranslate>,
}
