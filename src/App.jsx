import FileReaderPage from './components/FileReaderPage';
import Header from './components/header';
import Footer from './components/footer';

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
