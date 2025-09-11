import './App.css'
import BestSellingProducts from './bestSellingProduct'
import Footer from './components/footer'
import Section1 from './components/section1'
import FeaturedProductsSection from './FeaturedProduct'
import ProductGrid from './productGrid'
import ProductShowcase from './productShowcase'
function LandingPage() {
  return (
    <>
    <div className="home">
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
export default LandingPage
