export const getProviderLoginUrl = (provider) => {
  return process.env.NEXT_PUBLIC_BASE_URL + `/oauth2/authorization/${provider}`;
};
