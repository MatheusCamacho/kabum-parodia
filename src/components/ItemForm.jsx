
import React, { useState } from 'react'
import { addItem } from '../api'
import { useNavigate } from 'react-router-dom'

export default function ItemForm(){
  const [form, setForm] = useState({
    nome:'', marca:'', preco:0, foto:'', data:'', descricao:'', avaliacoes: [], comentarios: []
  })
  const navigate = useNavigate()

  function change(e){
    const {name, value} = e.target
    setForm(prev=>({...prev, [name]: name==='preco' ? Number(value) : value }))
  }

  async function submit(e){
    e.preventDefault()
    // validações mínimas
    if(!form.nome || !form.marca) {
      alert("Preencha nome e marca.")
      return
    }
    const created = await addItem(form)
    alert("Item criado!")
    navigate("/")
  }

  return (
    <div className="card" style={{maxWidth:720, marginTop:12}}>
      <h2>Cadastrar novo item</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input className="input" name="nome" placeholder="Nome" value={form.nome} onChange={change} />
        <input className="input" name="marca" placeholder="Marca" value={form.marca} onChange={change} />
        <input className="input" name="preco" type="number" step="0.01" placeholder="Preço" value={form.preco} onChange={change} />
        <input className="input" name="foto" placeholder="URL da foto" value={form.foto} onChange={change} />
        <input className="input" name="data" type="date" value={form.data} onChange={change} />
        <textarea className="input" name="descricao" placeholder="Descrição" value={form.descricao} onChange={change} />
        <div style={{display:'flex', gap:8}}>
          <button className="button" type="submit">Salvar</button>
          <button className="button" type="button" onClick={()=>{navigate('/')}} style={{background:'#6c757d'}}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
