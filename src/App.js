import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Photos, Photo, User, Search, Collection } from 'pages';
import { Navbar } from 'components';
import Favorites from 'pages/Favorites';
import { ThemeProvider } from 'styled-components';
import { Component } from 'react';
import { theme } from 'styles/ColorStyles';
import { GlobalStyles } from 'styles/GlobalStyles';

class App extends Component {
  state = {
    on: true,
  };
  toggleTheme = () => {
    this.setState({ on: !this.state.on });
  };
  render() {
    return (
      <ThemeProvider theme={this.state.on ? theme.light : theme.dark}>
        <GlobalStyles />
        <Router>
          <Navbar toggleTheme={this.toggleTheme} />
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
  }
}
export default App;
