import TestimonialCard from "./TestimonialCard";

function Testimonials(){
  return(
    
    <section className="mx-auto max-w-7xl px-6 py-28">

      {/* Heading */}
      <div className="mb-16 text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Testimonials
        </span>

        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Loved by{" "}
          <span className="font-extrabold text-blue-600">
            Developers
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          See how developers and teams use our AI Accessibility Auditor to build better and more inclusive website.
        </p>

      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* Card 1 */}
        <TestimonialCard 
          name="Sarah Johnson"
          role="Frontend Developer"
          company="TechNova"
          initials="SJ"
          review="The AI recommendations saved us hours of manual accessibility testing. It's become our part of our deployment workflow."
        />

        {/* Card 2 */}
        <TestimonialCard 
          name="David Chen"
          role="UI Designer"
          company="Pixel Studio"
          initials="DC"
          review="Beautiful reports, clear explanations, and actionable fixes. Highly recommended for every web team."
        />

        {/* Card 3 */}
        <TestimonialCard 
          name="Emily Brown"
          role="Product Manager"
          company="CloudApps"
          initials="EB"
          review="Accessibility is longer an afterthought. This tool helped us improve our WCAG compliance effortlessly."
        />
      </div>

    </section>

  );
}

export default Testimonials;