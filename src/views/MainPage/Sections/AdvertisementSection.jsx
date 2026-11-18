import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Carousel from "react-slick";
import "./campaign.css";

const campaigns = [
  { title: "Black is the new black", model: "Canvas High-Top" },
  { title: "Smooth like…", model: "Yeezy Boost 350 V2 Butter" },
  { title: "Shop Off-White", model: "Off-White" },
];

function AdvertisementSection({
  pcSliderImages,
  mobileSliderImages,
  active,
  onChange,
}) {
  const slider = useRef(null);
  const [motion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  );
  const [reducedMotion, setReducedMotion] = useState(motion.matches);
  useEffect(() => {
    const update = () => setReducedMotion(motion.matches);
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, [motion]);
  return (
    <section className="home-campaign" aria-label="메인 배너">
      <div className="campaign-tabs" role="group" aria-label="배너 선택">
        {campaigns.map(({ title, model }, i) => (
          <button
            key={title}
            type="button"
            aria-pressed={active === i}
            onClick={() => slider.current?.slickGoTo(i)}
          >
            <span className="campaign-number">0{i + 1}</span>
            <span className="campaign-title">{title}</span>
            <span className="campaign-model">{model}</span>
          </button>
        ))}
      </div>
      <div className="campaign-strip">
        {pcSliderImages.length === campaigns.length && (
          <Carousel
            ref={slider}
            initialSlide={2}
            autoplay={!reducedMotion}
            autoplaySpeed={4500}
            speed={reducedMotion ? 0 : 500}
            arrows={false}
            swipeToSlide
            beforeChange={(_, next) => onChange(next)}
          >
            {campaigns.map(({ title, model }, i) => (
              <div key={title}>
                <div className="campaign-frame">
                  <picture>
                    <source
                      media="(max-width: 599px)"
                      srcSet={mobileSliderImages[i]}
                    />
                    <img
                      className={i === 0 ? "campaign-canvas" : undefined}
                      src={pcSliderImages[i]}
                      alt={title + " · " + model}
                    />
                  </picture>
                  {i === 0 && <strong aria-hidden="true">{title}</strong>}
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default connect(({ pcSliderImages, mobileSliderImages }) => ({
  pcSliderImages,
  mobileSliderImages,
}))(AdvertisementSection);
