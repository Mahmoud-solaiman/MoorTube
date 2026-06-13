import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

export function filterSearch(searchText: any): boolean {
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  return matcher.hasMatch(searchText) ? true : false;
}