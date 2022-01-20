import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Signup from "../pages/Signup";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
