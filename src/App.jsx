import { useEffect, useState } from 'react';
import './App.css';

const defaultItems = [
  { id: 1, name: 'Lights are off', category: 'Home', completed: false },
  { id: 2, name: 'Gas is off', category: 'Home', completed: false },
  { id: 3, name: 'Water taps are closed', category: 'Home', completed: false },
  { id: 4, name: 'Door is locked', category: 'Home', completed: false },
  { id: 5, name: 'Mobile', category: 'Essentials', completed: false },
  { id: 6, name: 'Keys', category: 'Essentials', completed: false },
  { id: 7, name: 'Wallet', category: 'Essentials', completed: false },
];

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ready2leave-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('ready2leave-items');
    return savedItems ? JSON.parse(savedItems) : defaultItems;
  });

  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('ready2leave-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ready2leave-theme', theme);
  }, [theme]);

  const toggleItem = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const resetChecklist = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        completed: false,
      }))
    );
  };

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark'
    );
  };

  const addItem = (event) => {
    event.preventDefault();

    const trimmedItem = newItem.trim();

    if (!trimmedItem) return;

    const item = {
      id: Date.now(),
      name: trimmedItem,
      category: 'Custom',
      completed: false,
    };

    setItems((currentItems) => [...currentItems, item]);
    setNewItem('');
  };

  const removeItem = (id) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const completedCount = items.filter(
    (item) => item.completed
  ).length;

  const allCompleted =
    items.length > 0 && completedCount === items.length;

  const homeItems = items.filter(
    (item) => item.category === 'Home'
  );

  const essentialItems = items.filter(
    (item) => item.category === 'Essentials'
  );

  const customItems = items.filter(
    (item) => item.category === 'Custom'
  );

  const renderItem = (item) => (
    <div className={`checklist-item ${item.completed ? 'completed' : ''}`} key={item.id}>
      <label>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleItem(item.id)}
        />
        <span>{item.name}</span>
      </label>

      {item.category === 'Custom' && (
        <button
          className="delete-button"
          onClick={() => removeItem(item.id)}
          aria-label={`Delete ${item.name}`}
        >
          ×
        </button>
      )}
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo">✓</div>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
        <h1>Ready2Leave</h1>
        <p>Before you leave, make sure everything is okay.</p>
      </header>

      <main>
        {allCompleted && (
          <div className="success-message">
            <span>🎉</span>
            <div>
              <strong>You're Ready2Leave!</strong>
              <p>Everything on your checklist is complete.</p>
            </div>
          </div>
        )}

        <div className="progress-card">
          <div>
            <strong>{completedCount} / {items.length}</strong>
            <span> completed</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${items.length ? (completedCount / items.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {homeItems.length > 0 && (
          <section className="checklist-section">
            <h2>🏠 Home</h2>
            <div className="checklist">
              {homeItems.map(renderItem)}
            </div>
          </section>
        )}

        {essentialItems.length > 0 && (
          <section className="checklist-section">
            <h2>🎒 Essentials</h2>
            <div className="checklist">
              {essentialItems.map(renderItem)}
            </div>
          </section>
        )}

        {customItems.length > 0 && (
          <section className="checklist-section">
            <h2>📝 Custom</h2>
            <div className="checklist">
              {customItems.map(renderItem)}
            </div>
          </section>
        )}

        <section className="add-section">
          <h2>Add something</h2>

          <form onSubmit={addItem} className="add-form">
            <input
              type="text"
              placeholder="e.g. Laptop"
              value={newItem}
              onChange={(event) => setNewItem(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </section>

        <button
          className="reset-button"
          onClick={resetChecklist}
        >
          Reset Checklist
        </button>
      </main>

      <footer>
        <p>{'<ud4uddav>'}</p>
      </footer>
    </div>
  );
}

export default App;