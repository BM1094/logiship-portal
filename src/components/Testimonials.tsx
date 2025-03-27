
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Supply Chain Director, TechGlobal Inc.",
    content:
      "LogiShip completely transformed our logistics operations. Their real-time tracking and efficient delivery system has reduced our shipping costs by 30% while improving delivery times. The level of customer service is exceptional.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "David Chen",
    title: "Operations Manager, Retail Solutions",
    content:
      "We've worked with several logistics providers, but none match LogiShip's reliability and efficiency. Their team goes above and beyond to ensure our products reach our customers on time, every time.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Michelle Rodriguez",
    title: "CEO, Global Imports Ltd.",
    content:
      "LogiShip's international shipping solutions have enabled us to expand our business globally with confidence. Their customs expertise and global network make complex international logistics feel simple and manageable.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "James Wilson",
    title: "Fulfillment Director, E-Commerce Giants",
    content:
      "Our e-commerce business relies on fast, reliable shipping to maintain customer satisfaction. LogiShip's integrated solutions have helped us achieve 99.8% on-time delivery rates, significantly improving our customer feedback.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimer = useRef(null);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayTimer.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [autoplay]);

  // Reset autoplay on manual navigation
  useEffect(() => {
    if (!autoplay) {
      const timer = setTimeout(() => {
        setAutoplay(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [autoplay]);

  return (
    <div id="testimonials" className="bg-logistics-50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from the businesses that have
            transformed their logistics operations with LogiShip.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-xl shadow-xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 text-logistics-100 opacity-20 transform rotate-12 translate-x-10 -translate-y-10">
              <Quote size={150} />
            </div>

            <div className="carousel relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-item ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <div className="md:flex items-center mb-8">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-100"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{testimonial.name}</h3>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index
                        ? "w-8 bg-logistics-800"
                        : "w-2 bg-gray-300"
                    }`}
                    onClick={() => handleIndicatorClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: "500+", label: "Clients Worldwide" },
              { number: "10M+", label: "Shipments Delivered" },
              { number: "120+", label: "Countries Served" },
              { number: "99.8%", label: "On-time Delivery" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg text-center shadow-sm"
              >
                <p className="text-3xl font-medium text-logistics-800">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
