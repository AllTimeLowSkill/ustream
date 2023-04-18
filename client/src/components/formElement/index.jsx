import InputControl from "../input";

const FormElement = ({ label, type, sx = null, onChange, value }) => {
  return (
    <div
      className={`${
        sx
          ? Object.keys(sx)
              .map((key) => sx[key])
              .join(" ")
          : ""
      }`}
    >
      <label className="text-white text-sm">{label}</label>
      <InputControl type={type} onChange={onChange} value={value} />
    </div>
  );
};

export default FormElement;
