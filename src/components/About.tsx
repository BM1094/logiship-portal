
import { motion } from "framer-motion";
import { Check, MapPin, Users, Award } from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started with a vision to revolutionize logistics",
    },
    {
      year: "2013",
      title: "Global Expansion",
      description: "Expanded operations to over 20 countries",
    },
    {
      year: "2016",
      title: "Tech Innovation",
      description: "Launched our proprietary tracking system",
    },
    {
      year: "2019",
      title: "Sustainability Focus",
      description: "Implemented green logistics initiatives",
    },
    {
      year: "2023",
      title: "Industry Leader",
      description: "Recognized as top logistics provider globally",
    },
  ];

  return (
    <div id="about" className="bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-sm bg-logistics-100 text-logistics-800 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="section-title">The LogiShip Story</h2>
            <p className="section-subtitle">
              Founded in 2010, LogiShip has grown from a small local courier
              service to a global logistics leader with operations in over 120
              countries.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Trusted by 500+ global enterprises",
                "99.8% on-time delivery rate",
                "Proprietary tracking technology",
                "Sustainable logistics solutions",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="bg-green-100 rounded-full p-1">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: <MapPin size={20} className="text-primary" />,
                  title: "Global Reach",
                  description: "Operations in 120+ countries",
                },
                {
                  icon: <Users size={20} className="text-primary" />,
                  title: "Expert Team",
                  description: "2,500+ logistics professionals",
                },
                {
                  icon: <Award size={20} className="text-primary" />,
                  title: "Industry Awards",
                  description: "15+ excellence awards",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-logistics-50 p-4 rounded-lg"
                >
                  <div className="mb-2">{item.icon}</div>
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-xl p-8 relative"
              >
                <div className="flex items-center mb-6">
                  <div className="h-16 w-1 bg-logistics-800 rounded-full mr-4"></div>
                  <div>
                    <h3 className="text-2xl font-medium">Our Timeline</h3>
                    <p className="text-muted-foreground">
                      Key milestones in our journey
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex"
                    >
                      <div className="mr-4">
                        <div className="h-10 w-10 rounded-full bg-logistics-100 flex items-center justify-center font-medium text-logistics-800">
                          {milestone.year.slice(2)}
                        </div>
                        <div className="h-full w-1 bg-logistics-100 mx-auto mt-2"></div>
                      </div>
                      <div>
                        <p className="text-sm text-logistics-500">
                          {milestone.year}
                        </p>
                        <h4 className="text-lg font-medium">
                          {milestone.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
