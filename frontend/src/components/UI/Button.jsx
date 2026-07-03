function Button({
  children,
  variant = "Primary",
  className = "",
  onClick,
  type = "button",
}){
  const baseClasses = "rounded-lg cursor-pointer px-6 py-3 font-semibold transition duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return(
    <button
      type = {type}
      onClick = {onClick}
      className = {`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;