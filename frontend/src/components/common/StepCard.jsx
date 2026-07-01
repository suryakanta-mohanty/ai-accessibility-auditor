function StepCard({
  icon,
  title,
  description,
  number,
}) {
  return(

    <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl">

      {/* Step Number */}
      <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {number}
      </div>

      {/* Icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold">
        {title}
      </h3>

      {/* Description */}
      <p className="leading-8 text-gray-600">
        {description}
      </p>

    </div>

  );
}

export default StepCard;