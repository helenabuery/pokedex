# Pokédex

> 🔴 **Deploy:** (https://helenabuery.github.io/pokedex/)

Catálogo de Pokémons construído com React + Vite, consumindo a [PokeAPI](https://pokeapi.co) — uma API pública, gratuita e sem necessidade de chave :). 

---

## Funcionalidades

- Listagem paginada de pokémons (20 por página)
- Busca por nome ou número
- Ficha completa: sprite, tipos, stats, habilidades, altura e peso
- Integração com a PokeAPI via `fetch` nativo

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite |
| Estilo | CSS Modules |
| Testes | Vitest + MSW (mock de API) |
| CI | GitHub Actions |
| Deploy | Vercel |

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/pokedex.git
cd pokedex

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`.

## Testes

```bash
npm test
```

Os testes de integração validam o serviço `pokeApi.js` com mocks de rede via MSW, sem depender de internet.

## Deploy

O projeto está configurado para deploy automático na Vercel.  
A cada push na branch `main`, um novo deploy é gerado.

## API utilizada

**PokeAPI** — `https://pokeapi.co/api/v2`

- Gratuita e aberta, sem necessidade de cadastro ou chave
- Endpoints usados:
  - `GET /pokemon?limit={n}&offset={n}` — listagem paginada
  - `GET /pokemon/{name|id}` — ficha completa

---

*Projeto desenvolvido como parte da Etapa Intermediária da disciplina.*
