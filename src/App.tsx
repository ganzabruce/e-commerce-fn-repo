import './App.css'
import BestSellingProducts from './bestSellingProduct'
import Footer from './components/footer'
import Nav from './components/navbar/nav'
import { BrowserRouter as Router , Routes, Route  } from 'react-router-dom'
import Section1 from './components/section1'
import FeaturedProductsSection from './FeaturedProduct'
import ProductGrid from './productGrid'
import ProductShowcase from './productShowcase'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin" element={<A />} />
      </Routes>
    </Router>
    <div className="home">
      <nav>
        <Nav />
      </nav>
      <section>
        <Section1 />
      </section>
      <section>
        <ProductShowcase />
      </section>
      <section>
        <ProductGrid />
      </section>
      <section >
        <BestSellingProducts />
      </section>
      <section>
        <FeaturedProductsSection />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
    </>
  )
}
export default App
