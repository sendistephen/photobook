import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PhotoList from 'pages/PhotoList';
import Navbar from 'components/Navbar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={PhotoList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
