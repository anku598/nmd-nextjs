import '../styles/globals.css'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 100);
  }, []);
  return (
    <>
      {
        loading ? (<Component {...pageProps} />) : (<div></div>)
      }

    </>


  )
}

export default MyApp
