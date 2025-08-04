import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './hooks/redux';
import AuthForm from './components/AuthForm/AuthForm';
import Dashboard from './components/Dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <AuthForm />}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
