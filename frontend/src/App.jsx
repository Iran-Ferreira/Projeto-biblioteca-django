import { useEffect, useState } from 'react'
import { BookOpen, CheckCircle2, ChevronRight, CircleUserRound, LibraryBig, LogOut, Menu, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import './App.css'
import api from './services/api'

function App() {
  const [session, setSession] = useState(Boolean(localStorage.getItem('access_token')))
  const [view, setView] = useState('dashboard')
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState(null)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    if (session) loadBooks()
  }, [session])

  async function loadBooks() {
    setLoading(true)
    try {
      const { data } = await api.get('/livros/')
      setBooks(Array.isArray(data) ? data : [])
    } catch (error) {
      if (error.response?.status === 401) logout()
      else showNotice('Não foi possível carregar os livros.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function showNotice(message, type = 'success') {
    setNotice({ message, type })
    window.setTimeout(() => setNotice(null), 3500)
  }

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setSession(false)
  }

  if (!session) return <Auth onLogin={() => setSession(true)} showNotice={showNotice} />

  const filteredBooks = books.filter((book) => `${book.titulo} ${book.autor}`.toLowerCase().includes(query.toLowerCase()))
  const available = books.filter((book) => book.disponivel).length

  async function saveBook(form) {
    try {
      if (modal?.book) await api.put(`/livros/${modal.book.id}/atualizar/`, form)
      else await api.post('/livros/criar/', form)
      setModal(null)
      await loadBooks()
      showNotice(modal?.book ? 'Livro atualizado com sucesso.' : 'Livro adicionado à biblioteca.')
    } catch (error) {
      const message = Object.values(error.response?.data || {})[0]
      showNotice(Array.isArray(message) ? message[0] : 'Confira os dados e tente novamente.', 'error')
    }
  }

  async function deleteBook(book) {
    if (!window.confirm(`Excluir “${book.titulo}”?`)) return
    try {
      await api.delete(`/livros/${book.id}/deletar/`)
      await loadBooks()
      showNotice('Livro removido da biblioteca.')
    } catch {
      showNotice('Não foi possível remover o livro.', 'error')
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="brand"><span className="brand-mark"><LibraryBig size={21} /></span><span>Estante</span></div>
        <div className="sidebar-label">Biblioteca</div>
        <nav>
          <button className={view === 'dashboard' ? 'active' : ''} onClick={() => { setView('dashboard'); setMobileNav(false) }}><BookOpen size={18} /> Visão geral</button>
          <button className={view === 'books' ? 'active' : ''} onClick={() => { setView('books'); setMobileNav(false) }}><LibraryBig size={18} /> Acervo <span className="nav-count">{books.length}</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="user-mini"><CircleUserRound size={30} /><span><strong>Bibliotecário</strong><small>acesso administrativo</small></span></div><button className="logout" onClick={logout}><LogOut size={17} /> Sair</button></div>
      </aside>
      {mobileNav && <button className="nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Fechar menu" />}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu /></button><div><h1>{view === 'dashboard' ? 'Visão geral' : 'Acervo de livros'}</h1></div><div className="topbar-actions"><button className="icon-button" aria-label="Perfil"><CircleUserRound /></button></div></header>
        {view === 'dashboard' ? <Dashboard books={books} available={available} onBooks={() => setView('books')} /> : <section className="content-section"><div className="section-heading"><div><span className="eyebrow">CATÁLOGO COMPLETO</span><h2>Todos os livros</h2></div><button className="primary-button" onClick={() => setModal({})}><Plus size={18} /> Novo livro</button></div><div className="toolbar"><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título ou autor" /></label><span className="result-count">{filteredBooks.length} resultados</span></div><BookGrid books={filteredBooks} loading={loading} onEdit={(book) => setModal({ book })} onDelete={deleteBook} /></section>}
      </main>
      {modal && <BookModal book={modal.book} onClose={() => setModal(null)} onSave={saveBook} />}
      {notice && <div className={`notice ${notice.type}`}><CheckCircle2 size={18} /> {notice.message}</div>}
    </div>
  )
}

function Auth({ onLogin, showNotice }) {
  const [register, setRegister] = useState(false)
  const [form, setForm] = useState({ username: '', password: '', email: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      if (register) { await api.post('/usuarios/cadastro/', form); setRegister(false); showNotice('Cadastro realizado. Faça seu login.') }
      else { const { data } = await api.post('/token/', { username: form.username, password: form.password }); localStorage.setItem('access_token', data.access); localStorage.setItem('refresh_token', data.refresh); onLogin() }
    } catch { setError(register ? 'Não foi possível criar sua conta.' : 'Usuário ou senha inválidos.') } finally { setBusy(false) }
  }

  return <main className="auth-page"><div className="auth-visual"><div className="auth-brand"><span className="brand-mark"><LibraryBig size={21} /></span> Estante</div><div className="visual-copy"><span className="eyebrow">SEU ACERVO, COM CALMA</span><h1>Conhecimento<br /><em>encontra</em> espaço.</h1><p>Uma biblioteca organizada para descobrir, cuidar e compartilhar boas histórias.</p></div><div className="quote">“Cada livro é uma nova janela para o mundo.”<small>Biblioteca Estante</small></div></div><section className="auth-form-wrap"><div className="auth-form"><div className="mobile-auth-brand"><span className="brand-mark"><LibraryBig size={21} /></span> Estante</div><span className="eyebrow">{register ? 'JUNTE-SE A NÓS' : 'BEM-VINDO DE VOLTA'}</span><h2>{register ? 'Crie sua conta' : 'Acesse seu acervo'}</h2><p className="form-intro">{register ? 'Comece a organizar sua biblioteca.' : 'Entre para continuar sua leitura.'}</p><form onSubmit={submit}>{register && <label>E-mail<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" /></label>}<label>Usuário<input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="seu.usuario" /></label><label>Senha<input type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button full" disabled={busy}>{busy ? 'Aguarde...' : register ? 'Criar minha conta' : 'Entrar na biblioteca'} <ChevronRight size={18} /></button></form><p className="switch-auth">{register ? 'Já possui uma conta?' : 'Ainda não possui uma conta?'} <button onClick={() => { setRegister(!register); setError('') }}>{register ? 'Entrar' : 'Cadastre-se'}</button></p></div></section></main>
}

function Dashboard({ books, available, onBooks }) {
  const recent = books.slice(-4).reverse()
  return <section className="content-section dashboard"><div className="welcome"><div><span className="eyebrow">SEU ESPAÇO DE LEITURA</span><h2>Olá, bibliotecário.</h2><p>Veja como está o seu acervo hoje.</p></div><button className="primary-button" onClick={onBooks}>Explorar acervo <ChevronRight size={18} /></button></div><div className="stats-grid"><article className="stat-card accent"><span className="stat-icon"><LibraryBig size={20} /></span><span className="stat-label">Total de livros</span><strong>{books.length}</strong><small>itens no acervo</small></article><article className="stat-card"><span className="stat-icon green"><CheckCircle2 size={20} /></span><span className="stat-label">Disponíveis</span><strong>{available}</strong><small>prontos para leitura</small></article><article className="stat-card"><span className="stat-icon orange"><BookOpen size={20} /></span><span className="stat-label">Indisponíveis</span><strong>{books.length - available}</strong><small>fora da estante</small></article></div><div className="recent-heading"><div><span className="eyebrow">ATUALIZADO AGORA</span><h2>Adicionados recentemente</h2></div><button className="text-button" onClick={onBooks}>Ver todos <ChevronRight size={16} /></button></div><BookGrid books={recent} onEdit={() => {}} onDelete={() => {}} compact /></section>
}

function BookGrid({ books, loading, onEdit, onDelete, compact }) {
  if (loading) return <div className="empty-state">Carregando acervo...</div>
  if (!books.length) return <div className="empty-state"><BookOpen size={30} /><strong>Nenhum livro encontrado</strong><span>Adicione um novo título para começar o acervo.</span></div>
  return <div className={`book-grid ${compact ? 'compact' : ''}`}>{books.map((book) => <article className="book-card" key={book.id}><div className="book-cover"><BookOpen size={30} /><span>{String(book.ano_publicacao).slice(-2)}</span></div><div className="book-info"><span className={`availability ${book.disponivel ? 'available' : 'unavailable'}`}>{book.disponivel ? 'Disponível' : 'Indisponível'}</span><h3>{book.titulo}</h3><p>{book.autor}</p><small>{book.ano_publicacao}</small></div>{!compact && <div className="card-actions"><button onClick={() => onEdit(book)} aria-label={`Editar ${book.titulo}`}><Pencil size={16} /></button><button onClick={() => onDelete(book)} aria-label={`Excluir ${book.titulo}`}><Trash2 size={16} /></button></div>}</article>)}</div>
}

function BookModal({ book, onClose, onSave }) {
  const [form, setForm] = useState({ titulo: book?.titulo || '', autor: book?.autor || '', descricao: book?.descricao || '', ano_publicacao: book?.ano_publicacao || new Date().getFullYear(), disponivel: book?.disponivel ?? true })
  function update(key, value) { setForm({ ...form, [key]: value }) }
  return <div className="modal-backdrop"><section className="modal"><div className="modal-heading"><div><span className="eyebrow">ACERVO</span><h2>{book ? 'Editar livro' : 'Novo livro'}</h2></div><button onClick={onClose} aria-label="Fechar"><X /></button></div><form onSubmit={(event) => { event.preventDefault(); onSave({ ...form, ano_publicacao: Number(form.ano_publicacao) }) }}><div className="form-grid"><label>Título<input required value={form.titulo} onChange={(e) => update('titulo', e.target.value)} /></label><label>Autor<input required value={form.autor} onChange={(e) => update('autor', e.target.value)} /></label><label>Ano de publicação<input required type="number" value={form.ano_publicacao} onChange={(e) => update('ano_publicacao', e.target.value)} /></label><label className="checkbox-label"><input type="checkbox" checked={form.disponivel} onChange={(e) => update('disponivel', e.target.checked)} /> Disponível para empréstimo</label><label className="wide">Descrição<textarea rows="4" value={form.descricao} onChange={(e) => update('descricao', e.target.value)} /></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button">Salvar livro</button></div></form></section></div>
}

export default App
