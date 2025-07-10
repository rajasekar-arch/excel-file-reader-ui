import Header from './components/Header';
import FileReaderPage from './components/FileReaderPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-100">
        <FileReaderPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
