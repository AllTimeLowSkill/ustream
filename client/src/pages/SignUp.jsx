import { useState } from "react"
import InputControl from "../components/InputControl"
import { signUp } from "../store/slices/userSlice"
import Button from "../components/Button"
import { useDispatch } from "react-redux"

const SignUp = ({ toggleModal }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [repeatPassword, setReapetPassword] = useState(null)

    const handleSignUp = () => {
        if(repeatPassword === password) {
            dispatch(signUp({email, password, username, avatar}))
            toggleModal()
        }
    }

    return (
            <div className="px-[114px] py-6 min-w-[320px] rounded-[10px] bg-primary-500 absolute">
                <header className="flex justify-center items-center pb-[24px]">
                    <span className="text-5xl text-accent font-semibold">Sign Up Form</span>
                </header>
                <main className="mt-4">
                    <InputControl placeholder='Username' onChange={setUsername} />
                    <InputControl placeholder='Email' onChange={setEmail} sx={{ margin: 'mt-[18px]' }} />
                    <InputControl type="password" placeholder='Password' onChange={setPassword} sx={{ margin: 'mt-[18px]' }} />
                    <InputControl type="password" placeholder='Reapeat password' onChange={setReapetPassword} sx={{ margin: 'my-[18px]' }} />
                    <input type="file" onChange={e => setAvatar(e.target.files)} />
                </main>
                <footer className="mt-4">
                    <Button title='Sign up' accent={true} onClick={() => handleSignUp()} sx={{ width: 'w-full' }} />
                </footer>
            </div>
    )
}

export default SignUp