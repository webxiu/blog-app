import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddArticle from './pages/AddArticle'
import ArticleList from './pages/ArticleList'
import Home from './pages/Home'
import Main from './pages/Main'
import React from "react";
import { Redirect } from "react-router";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/person" component={Person} /> */}
        <Main>
          {/* /根目录 放最下面 */}
          <Route
            path="/"
            render={() => (
              <Switch>
                <Redirect exact={true} from="/" to="/admin" />
                <Route path="/admin" exact component={Home} />
                <Route path="/admin/list" exact component={ArticleList} />
                <Route path="/admin/add" exact component={AddArticle} />
                <Route component={<div>没找到页面...</div>} />
              </Switch>
            )}
          />
        </Main>
      </Switch>
    </Router>
  );
};

export default App;