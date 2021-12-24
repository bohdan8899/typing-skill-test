import Head from "next/head";
import { store } from '../src/store';
import { Provider } from 'react-redux'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Typing Skill Test Demo</title>
      <meta name="description" content="Typing skill test demo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>;
}

export default MyApp
