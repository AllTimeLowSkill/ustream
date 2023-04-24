import { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ initialState, handleSendData }) => {
  const [formData, setFormData] = useState(initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSendData)}>
      {Object.keys(formData).map((item, idx) => (
        <label key={idx} className="mb-[18px] block">
          <span className="text-white text-sm">{item}</span>
          <input
            className={`${
              formData[item].type === "file"
                ? "block text-white file:rounded-[10px] file:bg-gradient-to-r file:cursor-pointer file:from-[#3C096C] file:to-[#5A189A] file:px-[16px] file:py-[8px] file:text-white file:border-0"
                : "px-[18px] py-[8px] w-full rounded-[10px] bg-[#3C096C] text-white text-base"
            }`}
            {...register(item, { required: "Required field!" })}
            value={formData[item].value}
            onChange={(e) =>
              setFormData((prev) => {
                prev[item].value = e.target.value;
                return { ...prev };
              })
            }
            placeholder={item}
            type={formData[item].type}
          />
          <p>
            {errors[item]?.message && (
              <span className="text-red-500 text-sm font-semibold">
                {errors[item].message}
              </span>
            )}
          </p>
        </label>
      ))}
      <button
        type="submit"
        className="bg-gradient-to-r from-[#3C096C] to-[#5A189A] rounded-[10px] text-white text-base font-semibold px-[16px] py-[8px] w-full"
      >
        Send
      </button>
    </form>
  );
};

export default Form;
