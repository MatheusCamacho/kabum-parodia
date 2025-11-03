
const API_URL = "http://localhost:3001"

export async function fetchItens() {
  const res = await fetch(`${API_URL}/itens`)
  return res.json()
}

export async function addItem(item) {
  const res = await fetch(`${API_URL}/itens`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(item)
  })
  return res.json()
}

export async function updateItem(id, patch) {
  const res = await fetch(`${API_URL}/itens/${id}`, {
    method: "PATCH",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(patch)
  })
  return res.json()
}

export async function getItem(id) {
  const res = await fetch(`${API_URL}/itens/${id}`)
  return res.json()
}
