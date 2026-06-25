import Script from "next/script";

const SMARTSUPP_KEY = "aa6219ee1c303c9decae7593290a792b9c74fafc";

export function SmartsuppChatScript() {
  return (
    <Script id="smartsupp-live-chat" strategy="lazyOnload">
      {`
var _smartsupp = _smartsupp || {};
_smartsupp.key = '${SMARTSUPP_KEY}';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
      `.trim()}
    </Script>
  );
}

export function SmartsuppChatNoScript() {
  return (
    <noscript>
      Powered by{" "}
      <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">
        Smartsupp
      </a>
    </noscript>
  );
}
