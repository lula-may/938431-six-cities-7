export const adaptUserInfo = (rawUserInfo) => {
  const {
    'avatar_url': avatarUrl,
    email,
    id,
    'is_pro': isPro,
    name,
  } = rawUserInfo;

  return {
    avatarUrl,
    email,
    id,
    isPro,
    name,
  };
};

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

  return {
    bedrooms,
    city,
    description,
    goods,
    host: adaptUserInfo(rawHost),
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
