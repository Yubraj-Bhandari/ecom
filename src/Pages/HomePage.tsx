import Hero from '../Components/Hero/Hero';
import BannerSlider from '../Components/BannerSlider/BannerSlider';
import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BannerSlider />
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default HomePage;