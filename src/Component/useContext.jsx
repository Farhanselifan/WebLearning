import React, { useState, useEffect, useContext, createContext } from 'react';

// 1. Buat Context
const MyContext = createContext();

// 2. Buat Komponen Provider
function MyProvider({ children }) {
  const value = "Hello from context!";
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Gunakan useContext untuk mengakses
function MyComponent() {
  const contextValue = useContext(MyContext);
  return <p>{contextValue}</p>;
}

const ThemexContext = createContext();

function ThemexProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemexSwitcher() {
  const { theme, setTheme } = useContext(ThemexContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}







const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}







const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Simulate user data from token
      setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const userData = { id: 1, name: 'John Doe', email };
      setUser(userData);
      localStorage.setItem('authToken', 'fake-token');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

    return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

function UseContext() {
  return (
    <div>
        <AuthProvider>
           <logout/>
        </AuthProvider>
    </div>
  );
}


export default UseContext;