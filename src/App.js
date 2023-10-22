import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Form } from './Pages/index';
import { Provider } from './Utility/Provider';
import GoogleCallback from './Pages/GoogleCallback';

function App() {
  return (
    <Provider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/home' element={<Home />} />
          <Route path='/googleAuth' element={<GoogleCallback />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
