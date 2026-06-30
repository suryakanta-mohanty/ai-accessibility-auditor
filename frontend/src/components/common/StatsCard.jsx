function StatsCard({
  number,
  label,
}) {
  return(
    
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-3 hover:border-blue-300 hover:shadow-xl">

      <h3 className="text-3xl font-bold text-blue-600">
        {number}
      </h3>

      <p className="mt-2 text-gray-600">
        {label}
      </p>

    </div>

  );
}

export default StatsCard;