const Button = ({ title, accent = false, sx = {}, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${
        accent
          ? "bg-gradient-to-r from-[#3C096C] to-[#5A189A] rounded-[10px]"
          : ""
      } text-white text-base font-semibold px-[16px] py-[8px] ${
        sx
          ? Object.keys(sx)
              .map((key) => sx[key])
              .join(" ")
          : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
