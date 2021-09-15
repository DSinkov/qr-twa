import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Scanner from './features/Scanner/Scanner';
import { ROUTES } from './constants/routes';
import LastScanResult from './features/LastScanResult/LastScanResult';

function App() {
  return (
    <Switch>
      <Route path={ROUTES.scanner} exact={true} component={Scanner} />
      <Route path={ROUTES.lastScanResult} exact={true} component={LastScanResult} />
    </Switch>
  );
}

export default App;
