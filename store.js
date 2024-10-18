import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set, get) => ({
  todos: [],
  searchQuery: '',
  
  addTodo: (todo) => 
    set((state) => {
      const newTodos = [...state.todos, { ...todo, id: Date.now().toString() }];
      AsyncStorage.setItem('todos', JSON.stringify(newTodos))
        .catch(err => console.error('Error saving todos:', err));
      return { todos: newTodos };
    }),
  
  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter(todo => todo.id !== id);
      AsyncStorage.setItem('todos', JSON.stringify(newTodos))
        .catch(err => console.error('Error saving todos:', err));
      return { todos: newTodos };
    }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  loadTodos: async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        set({ todos: JSON.parse(storedTodos) });
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  },
  
  getFilteredTodos: () => {
    const state = get();
    if (!state.searchQuery) return state.todos;
    return state.todos.filter(todo => 
      todo.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }
}));

export default useStore;