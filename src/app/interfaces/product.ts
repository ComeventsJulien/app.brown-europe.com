import { Resource } from './resource';
import { PartnerTranslate } from './partner_translate';

export interface Product {
    productTranslates: any;
  startAt: string ;
  endAt: string;
  promotion: any;
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  visible: boolean,
  position: number,
  image: string,
  resources: Array<Resource>
}
