import '../styles/globals.css';
import '../styles/layout.css';
import "../styles/component.css";
import { Provider as AuthProvider } from 'next-auth/client'
import { Provider } from 'react-redux';
import store from "../lib/store";

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <AuthProvider session={pageProps.session}>
              <Component {...pageProps} />
          </AuthProvider>
      </Provider>
  )
}

export default MyApp
