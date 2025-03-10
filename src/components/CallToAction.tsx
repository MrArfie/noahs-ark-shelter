
import { Link } from 'react-router-dom';
import { Heart, PawPrint, HeartHandshake } from 'lucide-react';

const CallToAction = () => {
  const actions = [
    {
      title: "Adopt a Pet",
      description: "Give a loving home to a pet in need. Browse our available animals and start your adoption journey today.",
      icon: <PawPrint size={28} className="text-pawpal-teal" />,
      button: "Find a Pet",
      link: "/pets",
      bgColor: "bg-pawpal-light-teal",
      borderColor: "border-pawpal-teal/30",
      hoverColor: "hover:bg-pawpal-teal hover:text-white"
    },
    {
      title: "Make a Donation",
      description: "Your generous contributions help us provide food, shelter, and medical care to animals waiting for their forever homes.",
      icon: <Heart size={28} className="text-pawpal-red" />,
      button: "Donate Now",
      link: "/donate",
      bgColor: "bg-red-50",
      borderColor: "border-pawpal-red/30",
      hoverColor: "hover:bg-pawpal-red hover:text-white"
    },
    {
      title: "Volunteer With Us",
      description: "Become a volunteer and make a difference in the lives of our shelter animals. We have various roles to match your skills.",
      icon: <HeartHandshake size={28} className="text-pawpal-yellow" />,
      button: "Join Our Team",
      link: "/volunteer",
      bgColor: "bg-pawpal-light-yellow",
      borderColor: "border-pawpal-yellow/30",
      hoverColor: "hover:bg-pawpal-yellow hover:text-foreground"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            How You Can <span className="text-pawpal-teal">Help</span>
          </h2>
          <p className="text-muted-foreground">
            There are many ways to support our mission of finding loving homes for every animal in our care.
            Join our community of animal lovers making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <div 
              key={index}
              className={`${action.bgColor} border ${action.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-highlight hover-scale`}
            >
              <div className="mb-5">{action.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{action.title}</h3>
              <p className="text-muted-foreground mb-6">{action.description}</p>
              <Link
                to={action.link}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-300 border ${action.borderColor} ${action.hoverColor}`}
              >
                {action.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
