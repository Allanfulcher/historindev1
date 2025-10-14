# Historin Dev

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account (for database features)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd historindev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   - Get them from: https://app.supabase.com/project/_/settings/api
   - `NEXT_PUBLIC_SUPABASE_URL` - Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon/public key

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000

### Deployment (Vercel)

**Important:** When deploying a fork, you must configure environment variables in Vercel:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the same variables from `.env.example`
3. Redeploy

Without these variables, the build will succeed but database features won't work.

### Troubleshooting

If deployment fails, see **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** for:
- Common build errors & solutions
- Step-by-step debugging guide
- Environment variable setup
- What to check when builds fail

---

## 📋 Development Checklist

- [x] Migrar Pagina de ruas e historias
- [x] Migrar Pagina Referencias
- [x] Migrar Pagina Adicionar Historia
- [x] Migrar Pagina Sobre
- [x] Migrar Pagina Legado Africano
- [x] Atualizar paginas para terem o mesmo conteudo que o site atual
- [x] Migrar CSS para ter paridade com o site atual
- [x] Serch bar funcional
- [x] popup de feedback
- [x] Adcionar Design de "scroll" para ver historias
- [x] Adcionar Pagina do Quiz
- [x] Adcionar pins no mapa
- [x] Migrar funcionalidade completa do mapa
- [x] Adcionar selecionar ruas
- [x] Adcionar selecionar cidades
- [x] Adicionar Botao de Centralizar Mapa
- [x] Adicionar formulario de feedback
- [x] Adicionar funcionalidade de busca
- [x] Adicionar funcionalidade de feedback
- [x] Adicionar funcionalidade de add story

- [ ] Adcionar sistema de tags
- [ ] Migrar Banco de dados para um tradicional
- [ ] Criar Sistema de atualizacao de banco de dados
- [ ] Simplificacao e organizacao de componentes


- [x] Home Page

    - [x] Make the map take the full width
    - [x] Remove stories from the map, keep only street icons
    - [x] On map click, show a photo preview of the location instead of opening Maps

- [ ] Street / Story Page

    - [ ] Show recommended places below the street (only from the selected city)
    - [X] Copy Instagram-style story display:
        - [x] Show the story image above the title, taking full screen width
        - [x] If multiple images exist, allow swiping like a carousel
        - [x] Show only the beginning of the story text with a "more" link to expand the full text (like Instagram)

- [x] Timeline view:

    - [x] Default to the Instagram-like timeline
    - [x] Add side year timeline view

- [X] Quiz

    - [X] Add name and city fields to the form
    - [X] Separate questions by city or "general"