import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import router from './routes';
import Routes from './routes';
import { store } from './config/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
