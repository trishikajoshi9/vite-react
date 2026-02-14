import { useMemo, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  label: string
  done: boolean
}

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  model?: string
}

const initialTodos: Todo[] = [
  { id: 1, label: 'Create project structure for Android TSX app', done: true },
  { id: 2, label: 'Set up chat with agent mode and plan view', done: true },
  { id: 3, label: 'Generate UI with code + live preview split', done: false },
  { id: 4, label: 'Run build and ship development-ready version', done: false },
]

const starterCode = `import React from 'react'
import { View, Text, Pressable } from 'react-native'

export function TaskCard() {
  return (
    <View style={{ padding: 16, borderRadius: 14, backgroundColor: '#111827' }}>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>TriConnect Sprint</Text>
      <Text style={{ color: '#9CA3AF', marginTop: 8 }}>3 tasks ready for execution.</Text>
      <Pressable style={{ marginTop: 12, backgroundColor: '#6366F1', padding: 10, borderRadius: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Open Agent Plan</Text>
      </Pressable>
    </View>
  )
}`

function selectModel(command: string) {
  const input = command.toLowerCase()

  if (input.includes('android') || input.includes('react native')) {
    return 'gpt-4.1-mini-code'
  }

  if (input.includes('plan') || input.includes('task')) {
    return 'gpt-4.1-planner'
  }

  if (input.includes('design') || input.includes('ui')) {
    return 'gpt-4.1-creative'
  }

  return 'auto-gpt-5.2-codex'
}

function App() {
  const [agentMode, setAgentMode] = useState(true)
  const [command, setCommand] = useState('Build directly working development TSX based android app.')
  const [todos, setTodos] = useState(initialTodos)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        'Agent ready. Share your command and I will auto-select the best model, generate a plan, and track progress.',
      model: 'auto-gpt-5.2-codex',
    },
  ])

  const completed = useMemo(() => todos.filter((item) => item.done).length, [todos])
  const progress = useMemo(() => Math.round((completed / todos.length) * 100), [completed, todos.length])

  const activeModel = useMemo(() => selectModel(command), [command])

  const handleSend = () => {
    const trimmed = command.trim()

    if (!trimmed) {
      return
    }

    const chosenModel = selectModel(trimmed)

    setMessages((previous) => [
      ...previous,
      { id: previous.length + 1, role: 'user', content: trimmed },
      {
        id: previous.length + 2,
        role: 'assistant',
        model: chosenModel,
        content:
          'Plan updated: initializing Android workspace, wiring agent tasks, then validating build. Progress is reflected in ToDo tracker.',
      },
    ])

    setTodos((previous) =>
      previous.map((item) =>
        item.id === 3 ? { ...item, done: true } : item.id === 4 && trimmed.length > 15 ? { ...item, done: true } : item,
      ),
    )
  }

  return (
    <div className="workspace">
      <header className="workspace-header">
        <h1>TriConnect Dev Agent</h1>
        <div className="header-controls">
          <label className="switch-row" htmlFor="agent-mode">
            Agent mode
            <input
              id="agent-mode"
              type="checkbox"
              checked={agentMode}
              onChange={(event) => setAgentMode(event.target.checked)}
            />
          </label>
          <span className="chip">Model: {activeModel}</span>
        </div>
      </header>

      <section className="layout-grid">
        <aside className="panel chat-panel">
          <h2>Chat</h2>
          <div className="messages">
            {messages.map((message) => (
              <article key={message.id} className={`message ${message.role}`}>
                <p>{message.content}</p>
                {message.model ? <small>{message.model}</small> : null}
              </article>
            ))}
          </div>
          <div className="command-box">
            <textarea
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              rows={4}
              aria-label="Command input"
            />
            <button type="button" onClick={handleSend}>
              Run Command
            </button>
          </div>
        </aside>

        <section className="panel plan-panel">
          <h2>Plan & ToDo Progress</h2>
          <div className="progress-row">
            <span>{completed} / {todos.length} tasks done</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${progress}%` }} />
          </div>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? 'done' : ''}>
                <span>{todo.done ? '✅' : '🟡'}</span>
                {todo.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel dev-panel">
          <div className="split-header">
            <h2>Code</h2>
            <h2>Android Preview</h2>
          </div>
          <div className="split-content">
            <pre>
              <code>{starterCode}</code>
            </pre>
            <div className="phone-shell">
              <div className="phone-notch" />
              <div className="preview-card">
                <h3>TriConnect Sprint</h3>
                <p>3 tasks ready for execution.</p>
                <button type="button">Open Agent Plan</button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default App
