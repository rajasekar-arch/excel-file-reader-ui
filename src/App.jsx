import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-100">
        <h2 className="text-xl font-semibold">Welcome to My Excel File Reader App!</h2>
        <p>This is a simple page with a header and footer layout.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
