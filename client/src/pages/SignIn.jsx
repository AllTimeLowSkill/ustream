import { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "../components/Button"
import InputControl from "../components/InputControl"
import { signIn } from "../store/slices/userSlice"

const SignIn = ({ toggleModal }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        dispatch(signIn({email, password}))
        toggleModal()
    }

    return (
        <div className="px-[114px] py-6 min-w-[320px] rounded-[10px] absolute bg-primary-500 shadow-md shadow-black">
            <header className="flex justify-center items-center pb-[24px] ">
                <span className="text-5xl text-accent font-semibold">Sign In Form</span>
            </header>
            <main className="mt-4">
                <InputControl placeholder='Email' onChange={setEmail} />
                <InputControl type="password" placeholder='Password' onChange={setPassword} sx={{ margin: 'mt-[18px]' }} />
            </main>
            <footer className="mt-[38px]">
                <Button title='Sign in' accent={true} onClick={() => handleSignIn()} sx={{ width: 'w-full' }} />
            </footer>
        </div>
    )
}

export default SignIn