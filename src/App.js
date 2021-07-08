import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Photos, Photo, User, Search } from 'pages';
import { Navbar } from 'components';

function App() {
  return (
    <>
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
