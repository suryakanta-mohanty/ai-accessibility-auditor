function ReportItem({
  icon,
  title,
  status,
  statusColor,
  iconBgColor,
}) {
  return(

    <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-md ">

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}>
          {icon}
        </div>

        <span className="font-medium text-gray-800">
          {title}
        </span>
      </div>

      <span className={`font-semibold ${statusColor}`}>
        {status}
      </span>

    </div>

  );
}

export default ReportItem;