function FeatureCard({
  icon,
  title,
  description,
}) {
  return(
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <h3 className="text-xl font-bold">
          {title}
        </h3>
      </div>

      <p className="text-gray-600 leading-7">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;