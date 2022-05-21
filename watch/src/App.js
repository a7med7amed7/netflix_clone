import Home from './pages/home/home';
import "./app.scss";
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const user=true;
  return (
    <div className="App">
      <Router>
      <Switch>
          {/* <Route path="/register">
          {user ? <Home /> : <Register/>}
          </Route>
          <Route path="/login">
          </Route>
          {user ? <Home /> : <Login/>}
          <Route path="/" exact>
            {user ? <Home /> : <Redirect to="/register" />}
          </Route> */}
          <Route path="/" exact>
          <Home />
          </Route>
          <Route path="/movies" >
          <Home type="movie" />
          </Route>
          
          <Route path="/series">
          <Home type="series" />

          </Route>

          <Route path="/watch">
            <Watch/>
          </Route>
          
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
