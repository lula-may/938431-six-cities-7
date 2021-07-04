export const adaptOffers = (rawData) => {
  const {
    host: rawHost,
    'is_favorite': isFavorite,
    'is_premium': isPremium,
    'max_adults': maxAdults,
    'preview_image': previewImage,
  } = rawData;

  const {
    'avatar_url': avatarUrl,
    id,
    'is_pro': isPro,
    name,
  } = rawHost;

  return {
    ...rawData,
    host: {
      avatarUrl,
      id,
      isPro,
      name,
    },
    isFavorite,
    isPremium,
    maxAdults,
    previewImage,
  };
};
