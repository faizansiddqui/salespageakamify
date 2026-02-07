import TrustStats from "../components/TrustStats";
import Testimonials from "../components/Testimonials";
import BlogsArticles from "../components/BlogsArticles";
import Faq from "../components/Faq";
import Services from "../components/Services";
import WhyAkamify from "../components/WhyAkamify";
import HeroCta from "../components/HeroCta";
import TrustedBrands from "../components/TrustedBrands";
import Differentiator from "../components/Differentiator";
import UgcVideos from "../components/UgcVideos";
import serviceData from "../data";
import "../components/ResponsiveUtils.css";

function Home() {
  return (
    <div className="home-page">
      <div className="section-spacing">
        <HeroCta />
      </div>
      <div className="section-spacing">
        <TrustedBrands />
      </div>
      <div className="section-spacing">
        <Differentiator />
      </div>
      <div className="section-spacing">
        <Services />
      </div>
      <div className="section-spacing">
        <UgcVideos videos={serviceData.ugcVideos} />
      </div>
      <div className="section-spacing">
        <WhyAkamify />
      </div>
      <div className="section-spacing">
        <TrustStats />
      </div>
      <div className="section-spacing">
        <Testimonials />
      </div>
      <div className="section-spacing">
        <BlogsArticles />
      </div>
      <div className="section-spacing">
        <Faq />
      </div>
    </div>
  );
}

export default Home;
