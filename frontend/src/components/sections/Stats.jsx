import StatsCard from "../common/StatsCard";

function Stats(){
  return(

    <section className="py-20">

    <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
      <StatsCard 
        number="10K+"
        label="Pages Scanned"
      />

      <StatsCard 
        number="95%"
        label="AI Accuracy"
      />

      <StatsCard 
        number="WCAG 2.2"
        label="Compliance"
      />
    </div>

    </section>

  );
}

export default Stats;