import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

const TodoList: React.FC = () => { 
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Todo List</h1>
      
      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tambahkan todo baru..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Stats */}
      {totalCount > 0 && (
        <div className="text-sm text-gray-600 mb-4 text-center">
          {completedCount} dari {totalCount} tugas selesai
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Belum ada todo. Tambahkan yang pertama!
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                todo.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {todo.completed && <Check size={14} />}
              </button>
              
              <span
                className={`flex-1 ${
                  todo.completed 
                    ? 'text-gray-600 line-through' 
                    : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Hapus yang sudah selesai ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}
export default TodoList;