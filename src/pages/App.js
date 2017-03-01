import React from 'react';
import styles from './App.pcss';
import Helmet from 'react-helmet';

const App = props => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <Helmet
        htmlAttributes={{ "lang": "fi" }}
        titleTemplate="%s - Fgr.fi courses"
        defaultTitle="Fgr.fi courses"
        meta={[
          {name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
        ]}
        link={[
          {"rel": "canonical", "href": "http://mysite.com/example"},
          {"rel": "apple-touch-icon", "href": "http://mysite.com/img/apple-touch-icon-57x57.png"},
          {"rel": "apple-touch-icon", "sizes": "72x72", "href": "http://mysite.com/img/apple-touch-icon-72x72.png"}
        ]}
        onChangeClientState={(newState) => console.log(newState)}
      />

      <div className={styles.inner}>
        <header>
          <h1>Fgr.fi courses</h1>
        </header>

        <main>
          {children}
        </main>

        <footer>

        </footer>
      </div>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
