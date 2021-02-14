import 'antd/dist/antd.css';
import TopoPagina from './components/header/header';
import Routes from './routes';

function App() {
  return (
    <div className="App">      
      <TopoPagina />
      <Routes />
    </div>
  );
}

export default App;
