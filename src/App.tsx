import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { Recognizer } from './pages/Recognizer';
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Recognizer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
