import Form from "../../../components/form";
import FormWrapper from "../../../components/formWrapper";
import { ADD_POST } from "../../../constants/formsData";

const CreatePostForm = ({ handleSendData }) => {
  return (
    <FormWrapper title="Add post">
      <Form initialState={ADD_POST} handleSendData={handleSendData} />
    </FormWrapper>
  );
};

export default CreatePostForm;
