import { Partner } from './partner';
import { ResourceType } from './resource_type';

export interface Resource {
  "@id": string,
  "@type": string,
  link: string,
  visible: boolean,
  type: ResourceType,
  position: number,
}
