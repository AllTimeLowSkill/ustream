import FormWrapper from "../formWrapper";
import Form from "../form";
import { LOGIN_DATA } from "../../constants/formsData";

const LoginForm = ({ handleSubmit }) => {
  return (
    <FormWrapper title="Login to USTREAM">
      <Form initialState={LOGIN_DATA} handleSendData={handleSubmit} />
    </FormWrapper>
  );
};

export default LoginForm;
