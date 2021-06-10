import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PhotoList from 'pages/PhotoList';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={PhotoList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
