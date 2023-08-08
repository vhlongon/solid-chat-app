import { Route, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';

const Chat = lazy(() => import('./routes/Chat'));
const Login = lazy(() => import('./routes/Login'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" component={Chat} />
      <Route path="/login" component={Login} />
    </Routes>
  );
};
