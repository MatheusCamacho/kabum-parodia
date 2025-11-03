
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItem, updateItem } from '../api'

export default function ItemDetail(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [comentario, setComentario] = useState("")
  const [nota, setNota] = useState(5)

  useEffect(()=>{
    load()
  },[id])

  async function load(){
    const data = await getItem(id)
    setItem(data)
  }

  function media(avaliacoes=[]){
    if(!avaliacoes.length) return 0
    return (avaliacoes.reduce((a,b)=>a+b,0)/avaliacoes.length).toFixed(2)
  }

  async function enviarComentario(e){
    e.preventDefault()
    if(!comentario) return
    const novas = Array.isArray(item.comentarios) ? [...item.comentarios, comentario] : [comentario]
    const novasAval = Array.isArray(item.avaliacoes) ? [...item.avaliacoes, Number(nota)] : [Number(nota)]
    const updated = await updateItem(item.id, { comentarios: novas, avaliacoes: novasAval })
    setItem(updated)
    setComentario("")
    alert("Comentário e nota salvos.")
  }

  if(!item) return <div className="small">Carregando...</div>

  return (
    <div style={{marginTop:12}}>
      <div className="card" style={{display:'flex', gap:12}}>
        <img src={item.foto} alt={item.nome} style={{width:320, height:200}} />
        <div>
          <h2>{item.nome}</h2>
          <div className="small">{item.marca} • {item.data}</div>
          <p>{item.descricao}</p>
          <div><strong>R$ {item.preco.toFixed(2)}</strong></div>
          <div className="small">Média de avaliações: {media(item.avaliacoes)}</div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Deixe um comentário / nota</h3>
        <form onSubmit={enviarComentario} style={{display:'grid', gap:8}}>
          <textarea className="input" placeholder="Seu comentário" value={comentario} onChange={e=>setComentario(e.target.value)} />
          <label className="small">Nota:
            <select className="input" value={nota} onChange={e=>setNota(e.target.value)}>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
              <option value={0}>0</option>
            </select>
          </label>
          <button className="button">Enviar</button>
        </form>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Comentários ({item.comentarios?.length || 0})</h3>
        <ul>
          {(item.comentarios || []).map((c, i)=> <li key={i} className="small">{c}</li>)}
        </ul>
      </div>
    </div>
  )
}
