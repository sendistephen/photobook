import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Photos, Photo, User, Search, Collection } from 'pages';
import { Navbar } from 'components';
import Favorites from 'pages/Favorites';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/ColorStyles';
import { GlobalStyles } from 'styles/GlobalStyles';
import { getThemePreference } from 'store/theme/themeReducer';
import { useSelector } from 'react-redux';

const App = () => {
  const { darkThemeEnabled } = useSelector(getThemePreference);

  return (
    <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Photos} />
          <Route path='/photos/:id' component={Photo} />
          <Route path='/users/:username' component={User} />
          <Route exact path='/search/photos/:searchWord' component={Search} />
          <Route
            exact
            path='/search/collections/:searchWord'
            component={Search}
          />
          <Route
            exact
            path='/collections/:collectionId/photos'
            component={Collection}
          />
          <Route exact path='/favorites' component={Favorites} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
