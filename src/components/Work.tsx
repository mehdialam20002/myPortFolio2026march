import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Aura Orbit",
    category: "AI-Powered Habit Intelligence System",
    tools: "React.js, Node.js, Gemini API, Razorpay",
    image: "https://mehdiiialam.netlify.app/static/media/goodhabits.ea18b355e9e3b7b4a9f6.png",
    link: "https://goodhabits-teal.vercel.app/", // Placeholder, replace with actual demo link
  },
  {
    title: "HighQClasses",
    category: "Modular E-Learning Platform",
    tools: "React, Node.js, MySQL, JWT",
    image: "https://mehdiiialam.netlify.app/static/media/highq.f9cab5bcffa63575861b.png",
    link: "http://highqclasses.ideovent.com/", // Placeholder
  },
  {
    title: "Water Productivity Atlas",
    category: "Scenario Modelling Dashboard",
    tools: "FastAPI, PostgreSQL, Python",
    image: "https://mehdiiialam.netlify.app/static/media/elearn.1b585492490c8c1cace9.png",
    link: "https://indiawpatlas.shinyapps.io/wpatlas/#/scenario", // Placeholder
  },
  {
    title: "Gmail → Calendar Automation",
    category: "Smart Reminders Automation",
    tools: "Gemini API, Google APIs, NLP",
    image: "https://mehdiiialam.netlify.app/static/media/gstrucking.fb8ab7f271a937d5fc01.png",
    link: "https://github.com/mehdialam20002/gmaill-starred-reminder", // Placeholder
  },
  {
    title: "Ideovent.com",
    category: "Agency Website + Chatbot",
    tools: "React, Netlify, Gemini API",
    image: "https://mehdiiialam.netlify.app/static/media/highq.f9cab5bcffa63575861b.png",
    link: "https://www.ideovent.com/",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} link={project.link} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
