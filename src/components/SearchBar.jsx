
import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("")
  function submit(e){
    e.preventDefault()
    onSearch(q.trim())
  }
  return (
    <form onSubmit={submit} style={{display:'flex', gap:8, marginTop:12}}>
      <input className="input" placeholder="Pesquisar por nome, marca ou descrição..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="button">Buscar</button>
    </form>
  )
}
