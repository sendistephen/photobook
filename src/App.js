import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PhotoList from 'pages/Photos/PhotoList';
import { Photos, Photo} from 'pages';
import Navbar from 'components/Navbar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Photos} />
          <Route path='/photos/:id' component={Photo} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
