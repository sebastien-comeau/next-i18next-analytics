import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
// import nextI18NextConfig from '../next-i18next.config.js'

// help to prevent double firing of analytics pageLoad event
let appPreviousLocationPathname = '';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  // Web Analytics - taken from Google Analytics example
  // @see https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // only push event if pathname is different
      if (window.location.pathname !== appPreviousLocationPathname) {
        appPreviousLocationPathname = window.location.pathname;

        console.log({
          url,
          appPreviousLocationPathname,
          pathname: window.location.pathname,
          title: document.title,
        });

        setTimeout(() => {
          console.log({
            action: 'timeout',
            url,
            appPreviousLocationPathname,
            pathname: window.location.pathname,
            title: document.title,
          });
        }, 500);
      }
    };

    handleRouteChange(window.location.pathname);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

// https://github.com/i18next/next-i18next#unserializable-configs
export default appWithTranslation(MyApp /*, nextI18NextConfig */);
