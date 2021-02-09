import { Partner } from './partner';
import { Locale } from './locale';
import { Category } from './category';

export interface CategoryTranslate {
  "@id": string,
  "@type": string,
  title: string,
  description: string,
  category: Category,
  locale: Locale,
}
