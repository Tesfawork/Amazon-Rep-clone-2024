import style from "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/style/carousel.min.css";
import { img } from "./img/data";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((image, index) => (
          <img src={image} key={index} alt={`carousel image ${index}`} />
        ))}
      </Carousel>
      <div className={style.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;
