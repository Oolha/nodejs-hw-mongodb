const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isContactType(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'string';
  if (!isBoolean) return;

  return isFavourite.toLowerCase() === 'true';
};

export const parseFilterParams = (query) => {
  const contactType = parseContactType(query.contactType);
  const isFavourite = parseIsFavourite(query.isFavourite);

  return {
    contactType,
    isFavourite,
  };
};
