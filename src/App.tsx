import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryAdd from './components/CatagoryAdd/CategoryAdd';
import Navbar from './components/Navbar/Navbar';
import Add from './containers/Add/Add';
import Category from './containers/Category/Category';
import Main from './containers/Main/Main';

function App() {
  return (
    <div className="App container-fluid">
      <header>
        <Navbar/>
      </header>
      <Routes>
        <Route path='/' element={(
          <Main/>
        )}/>
        <Route path='/categories' element={(
          <Category/>
        )}/>
        <Route path='/add' element={(
          <Add/>
        )}/>
        <Route path='/categories/:id' element={(
          <CategoryAdd/>
        )}/>
        <Route path='/category/add' element={(
          <CategoryAdd/>
        )}/>
        <Route path='/main/:id' element={(
          <Add/>
        )}/>
        <Route path='*' element={(
          <h2>Not Found !</h2>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
