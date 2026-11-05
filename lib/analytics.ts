/** Google Analytics 4 衡量 ID */
export const GA_MEASUREMENT_ID = "G-8WF0S87W7F";

/** Google AdSense 广告位客户 ID */
export const ADSENSE_CLIENT_ID = "ca-pub-7274710287377352";

/** GA4 的内联初始化代码 */
export const GA_INIT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`;

export const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
export const ADS_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
