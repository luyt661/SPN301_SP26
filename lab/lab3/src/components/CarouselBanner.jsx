import Carousel from "react-bootstrap/Carousel";
import banners from "../data/banners";

function CarouselBanner({ height = 400 }) {
  return (
    <Carousel style={{ width: "100vw", margin: "20px 0" }}>
      {banners.map((banner, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={banner.src}
            alt={banner.alt}
            style={{ height, objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselBanner;