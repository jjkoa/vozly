import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Provide a default locale if undefined
  const resolvedLocale = locale || 'en';
  
  return {
    locale: resolvedLocale,
    messages: (await import(`/lib/messages/${resolvedLocale}.json`)).default
  };
});