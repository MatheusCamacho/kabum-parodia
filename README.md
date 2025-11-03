
Kabum-paródia — Trabalho de Programação Web
==========================================

Resumo
- App em React (Vite) que persiste dados em uma API Fake (json-server).
- Funcionalidades: listar itens, adicionar item, pesquisar, interagir (avaliar/comentar),
  persistir interações como arrays, calcular média de avaliações e exibir.
- Projeto em português, pensado para entrega acadêmica.

Como rodar
1. Node.js 18+ instalado.
2. Na pasta do projeto:
   npm install
3. Em um terminal rode o json-server:
   npm run server
   (http://localhost:3001)
4. Em outro terminal rode o app React:
   npm run dev
   (http://localhost:5173)

API (db.json)
- Recurso principal: /itens
- Cada item tem pelo menos:
  id, nome, marca, preco, foto, data, descricao, avaliacoes (array de números), comentarios (array de strings)
