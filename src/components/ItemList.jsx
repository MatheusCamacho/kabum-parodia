
import React, { useEffect, useState } from 'react'
import { fetchItens, updateItem } from '../api'
import ItemCard from './ItemCard'
import SearchBar from './SearchBar'

export default function ItemList(){
  const [itens, setItens] = useState([])
  const [filtered, setFiltered] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(()=>{
    load()
  },[])

  async function load(){
    const data = await fetchItens()
    setItens(data)
    setFiltered(data)
  }

  function doSearch(q){
    if(!q){
      setFiltered(itens)
      setMsg("")
      return
    }
    const ql = q.toLowerCase()
    const res = itens.filter(it => 
      it.nome.toLowerCase().includes(ql) ||
      it.marca.toLowerCase().includes(ql) ||
      (it.descricao || "").toLowerCase().includes(ql)
    )
    if(!res.length) setMsg("Nenhum item contém a palavra-chave pesquisada.")
    else setMsg("")
    setFiltered(res)
  }

  async function handleInteract(item){
    // interação simples: adicionar interesse com nome fictício e nota aleatória via prompt
    const nome = prompt("Seu nome (para registrar interesse):")
    if(!nome) return
    const notaStr = prompt("Dê uma nota para este item (0-5):")
    const nota = Number(notaStr)
    if(Number.isNaN(nota) || nota < 0 || nota > 5) {
      alert("Nota inválida. Use 0-5.")
      return
    }
    // atualiza arrays: comentarios e avaliacoes
    const novaListaComentarios = Array.isArray(item.comentarios) ? [...item.comentarios, `${nome}: interessado`] : [`${nome}: interessado`]
    const novaListaAvaliacoes = Array.isArray(item.avaliacoes) ? [...item.avaliacoes, nota] : [nota]

    const updated = await updateItem(item.id, { comentarios: novaListaComentarios, avaliacoes: novaListaAvaliacoes })
    // atualizar lista local
    setItens(prev => prev.map(p => p.id === updated.id ? updated : p))
    setFiltered(prev => prev.map(p => p.id === updated.id ? updated : p))
    alert("Interação registrada com sucesso.")
  }

  return (
    <div>
      <SearchBar onSearch={doSearch} />
      {msg && <div className="card" style={{marginTop:12}}>{msg}</div>}
      <div className="grid" style={{marginTop:12}}>
        {filtered.map(item=>(
          <ItemCard key={item.id} item={item} onInteract={handleInteract} />
        ))}
      </div>
    </div>
  )
}
