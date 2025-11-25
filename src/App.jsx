import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [selectedFile, setSelectedFile] = useState('app.js')
  const [openFiles, setOpenFiles] = useState(['app.js'])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Sample file structure
  const files = {
    'app.js': {
      name: 'app.js',
      language: 'javascript',
      content: `// Welcome to the Code Editor!
// This is a sample JavaScript file

function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');

// Try editing this code or switch to other files
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
`
    },
    'styles.css': {
      name: 'styles.css',
      language: 'css',
      content: `/* Sample CSS File */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.button:hover {
  transform: translateY(-2px);
}
`
    },
    'index.html': {
      name: 'index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample HTML Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Welcome to Code Editor</h1>
    <p>This is a sample HTML file.</p>
    <button class="button">Click Me</button>
  </div>
  <script src="app.js"></script>
</body>
</html>
`
    },
    'data.json': {
      name: 'data.json',
      language: 'json',
      content: `{
  "name": "Code Editor",
  "version": "1.0.0",
  "description": "A modern web-based code editor",
  "features": [
    "Syntax highlighting",
    "Multiple file support",
    "Light and dark themes",
    "Monaco Editor integration"
  ],
  "author": "Your Name",
  "license": "MIT"
}
`
    },
    'script.py': {
      name: 'script.py',
      language: 'python',
      content: `# Sample Python Script

def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    fib_sequence = [0, 1]
    
    for i in range(2, n):
        next_num = fib_sequence[i-1] + fib_sequence[i-2]
        fib_sequence.append(next_num)
    
    return fib_sequence

# Generate first 10 Fibonacci numbers
result = fibonacci(10)
print(f"Fibonacci sequence: {result}")

# Calculate sum
total = sum(result)
print(f"Sum: {total}")
`
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const openFile = (fileName) => {
    setSelectedFile(fileName)
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName])
    }
  }

  const closeFile = (fileName, e) => {
    e.stopPropagation()
    const newOpenFiles = openFiles.filter(f => f !== fileName)
    setOpenFiles(newOpenFiles)

    if (selectedFile === fileName && newOpenFiles.length > 0) {
      setSelectedFile(newOpenFiles[newOpenFiles.length - 1])
    }
  }

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()
    const icons = {
      'js': '📄',
      'css': '🎨',
      'html': '🌐',
      'json': '📋',
      'py': '🐍'
    }
    return icons[ext] || '📄'
  }

  return (
    <div className={`editor-container ${theme}`}>
      {/* Header/Toolbar */}
      <header className="toolbar">
        <div className="toolbar-left">
          <h1 className="logo">
            <span className="logo-icon">⚡</span>
            Code Editor
          </h1>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" title="New File">
            <span>📄</span> New
          </button>
          <button className="toolbar-btn" title="Save">
            <span>💾</span> Save
          </button>
          <button className="toolbar-btn" onClick={toggleTheme} title="Toggle Theme">
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>

      <div className="editor-main">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h3>Files</h3>
            <button
              className="collapse-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              {sidebarCollapsed ? '▶' : '◀'}
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="file-tree">
              {Object.keys(files).map(fileName => (
                <div
                  key={fileName}
                  className={`file-item ${selectedFile === fileName ? 'active' : ''}`}
                  onClick={() => openFile(fileName)}
                >
                  <span className="file-icon">{getFileIcon(fileName)}</span>
                  <span className="file-name">{fileName}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Editor Area */}
        <main className="editor-area">
          {/* Tabs */}
          <div className="tabs">
            {openFiles.map(fileName => (
              <div
                key={fileName}
                className={`tab ${selectedFile === fileName ? 'active' : ''}`}
                onClick={() => setSelectedFile(fileName)}
              >
                <span className="tab-icon">{getFileIcon(fileName)}</span>
                <span className="tab-name">{fileName}</span>
                {openFiles.length > 1 && (
                  <button
                    className="tab-close"
                    onClick={(e) => closeFile(fileName, e)}
                    title="Close"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Monaco Editor */}
          <div className="editor-wrapper">
            {selectedFile && files[selectedFile] && (
              <Editor
                height="100%"
                language={files[selectedFile].language}
                value={files[selectedFile].content}
                theme={theme === 'light' ? 'light' : 'vs-dark'}
                options={{
                  fontSize: 14,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on'
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <footer className="status-bar">
        <div className="status-left">
          <span className="status-item">
            {selectedFile && files[selectedFile] && (
              <>
                <span className="status-icon">{getFileIcon(selectedFile)}</span>
                {selectedFile}
              </>
            )}
          </span>
          <span className="status-item">
            {selectedFile && files[selectedFile] && files[selectedFile].language.toUpperCase()}
          </span>
        </div>
        <div className="status-right">
          <span className="status-item">UTF-8</span>
          <span className="status-item">Ln 1, Col 1</span>
        </div>
      </footer>
    </div>
  )
}

export default App
