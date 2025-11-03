
import React from 'react'
import { Link } from 'react-router-dom'

function media(avaliacoes=[]) {
  if (!avaliacoes.length) return "sem avaliações"
  const s = avaliacoes.reduce((a,b)=>a+b,0)
  return (s/avaliacoes.length).toFixed(2)
}

export default function ItemCard({ item, onInteract }) {
  return (
    <div className="card">
      <img src={item.foto} alt={item.nome} />
      <h3>{item.nome}</h3>
      <div className="small">{item.marca} • {item.data}</div>
      <p className="small">{item.descricao}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
        <div>
          <strong>R$ {item.preco.toFixed(2)}</strong>
          <div className="small">Média: {media(item.avaliacoes)}</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          <button className="button" onClick={()=>onInteract(item)}>Interagir</button>
          <Link to={`/itens/${item.id}`} className="small">Ver detalhes</Link>
        </div>
      </div>
    </div>
  )
}
