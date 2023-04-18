import { useState } from "react"
import Button from "../button"
import FormElement from "../formElement"
import FormWrapper from "../formWrapper"
import InputControl from "../input"

const SignUp = ({ handleSubmit }) => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [avatar, setAvatar] = useState(null)

    return (
        <FormWrapper title='Get started with USTREAM'>
            <section className="mb-[36px]">
                <FormElement onChange={setUsername} label='Username'  />
                <FormElement onChange={setEmail} label='Email' type='email' sx={{ margin: 'my-[12px]' }} />
                <FormElement onChange={setPassword} label='Password' type='password' />
                <FormElement onChange={setRePassword} label='Repeat password' type='password' sx={{ margin: 'my-[12px]' }} />
                <InputControl onChange={setAvatar} type="file" placeholder="Choose your avatar" />
            </section>
            <Button onClick={() => handleSubmit(email, password, username, avatar, rePassword)} title='Sign Up' accent={true} sx={{ width: 'w-full' }} />
        </FormWrapper>
    )
}

export default SignUp