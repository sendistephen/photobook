import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Photos, Photo, User } from 'pages';
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
