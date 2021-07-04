export const adaptOffers = (rawData) => {
  const {
    bedrooms,
    city,
    description,
    goods,
    host: rawHost,
    id,
    images,
    'is_favorite': isFavorite,
    'is_premium': isPremium,
    location,
    'max_adults': maxAdults,
    'preview_image': previewImage,
    price,
    rating,
    title,
    type,
  } = rawData;

  const {
    'avatar_url': avatarUrl,
    id: hostId,
    'is_pro': isPro,
    name,
  } = rawHost;

  return {
    bedrooms,
    city,
    description,
    goods,
    host: {
      avatarUrl,
      id: hostId,
      isPro,
      name,
    },
    id,
    isFavorite,
    images,
    isPremium,
    location,
    maxAdults,
    previewImage,
    price,
    rating,
    title,
    type,
  };
};
