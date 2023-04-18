import { useState } from "react";
import Button from "../button";
import FormElement from "../formElement";
import FormWrapper from "../formWrapper";

const LoginForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <FormWrapper title="Login to USTREAM">
      <section className="mb-[36px]">
        <FormElement onChange={setEmail} label="Email" type="email" />
        <FormElement
          onChange={setPassword}
          label="Password"
          type="password"
          sx={{ margin: "mt-[16px]" }}
        />
      </section>
      <Button
        onClick={() => handleSubmit(email, password)}
        title="Login"
        accent={true}
        sx={{ width: "w-full" }}
      />
    </FormWrapper>
  );
};

export default LoginForm;
