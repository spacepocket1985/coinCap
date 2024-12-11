import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { Header } from './components/layout/Header';

import '@fontsource/roboto/400.css';

const App: FC = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Header />
      <AppRouter />
    </Router>
  );
};

export default App;
