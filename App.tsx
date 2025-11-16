// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext';

// Pages
import MatchesPage from './pages/matchPage';
import TeamsPageComponent from './pages/TeamsPage'; 
import GroupsPage from './pages/GroupsPage';
import CartPage from './pages/cartPage';
import Loginpage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import Checkoutpage from './pages/checkoutPage';

// Composants
import Navbar from './composants/Layout/Navbar';
import Footer from './composants/Layout/Footer';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<MatchesPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/teams" element={<TeamsPageComponent />} /> {/* ← Utilisez l'alias */}
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<Checkoutpage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;