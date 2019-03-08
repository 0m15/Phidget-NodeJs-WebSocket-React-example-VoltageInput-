// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    // const linksFix = `if(("standalone" in window.navigator) && window.navigator.standalone){ var noddy, remotes = true; document.addEventListener('click', function(event) { noddy = event.target; while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") { noddy = noddy.parentNode; } if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) { event.preventDefault(); document.location.href = noddy.href; } },false); }`
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/app-icon.png" />
        </Head>
        {/* <script dangerouslySetInnerHTML={{
          __html: linksFix,
        }}>
        </script> */}
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
