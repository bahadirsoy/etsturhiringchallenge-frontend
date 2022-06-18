
//import styles
import './App.css';

//import react router components
import {
  BrowserRouter as Router,
  Routes,                   // Switch = Routes
  Route, 
  Link,
  useInRouterContext
} from 'react-router-dom'

//import pages
import HomePage from './pages/homepage/homepage';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <HomePage/>
        }/>
      </Routes>
    </>
  );
}

export default App;
