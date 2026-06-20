export type GoogleReview = {
  author: string;
  authorUri?: string;
  profilePhotoUri?: string;
  rating: number;
  text: string;
  relativeTime?: string;
  publishTime?: string;
};

export type GooglePlaceSummary = {
  available: boolean;
  rating?: number;
  userRatingCount?: number;
  reviews: GoogleReview[];
  googleMapsUri: string;
  writeReviewUri: string;
  updatedAt?: string;
};
