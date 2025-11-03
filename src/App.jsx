
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ItemList from './components/ItemList'
import ItemDetail from './components/ItemDetail'
import ItemForm from './components/ItemForm'

export default function App(){
  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="logo">Kabum-paródia</div>
          <div className="small">Trabalho: Renderização, persistência e rotas</div>
        </div>
        <nav>
          <Link to="/" className="small" style={{marginRight:12}}>Home</Link>
          <Link to="/novo" className="small">Cadastrar Item</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/novo" element={<ItemForm />} />
        <Route path="/itens/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  )
}
