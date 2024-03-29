import React from 'react';
import {IndexRoute, Route} from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Main,
    Home,
    List,
    Detail,
    Login,
    Post,
    NotFound
  } from 'containers';

export default (store) => {
  console.log(store);
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
  //   }
  // };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={App}>
      {/* Home (main) route */}
      {/* <IndexRoute component={List}/> */}

      {/* Routes requiring login */}
      {/* <Route onEnter={requireLogin}>TODO</Route> */}


      {/*
      <Route path='main' component={Main} />
      <Route path='login' component={Login} />
      <Route path='list' component={List} />
      */}
      <Route component={Main}>
        <IndexRoute component={Home} />
        <Route path='/list/:index' component={List} />
        <Route path='/detail/:id' component={Detail} />
      </Route>

      {/* Routes */}
      <Route path='/admin/login' component={Login} />
      <Route path='/admin/post' component={Post} />

      {/* Catch all route */}
      <Route path='*' component={NotFound} status={404} />
    </Route>
  );
};
