import FormWrapper from "../formWrapper";
import Form from "../form";
import { SIGNUP_DATA } from "../../constants/formsData";

const SignUp = ({ handleSubmit }) => {
  return (
    <FormWrapper title="Get started with USTREAM">
      <Form initialState={SIGNUP_DATA} handleSendData={handleSubmit} />
    </FormWrapper>
  );
};

export default SignUp;
