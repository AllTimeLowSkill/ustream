import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../Button"
import Logo from '../../../assets/Logo.svg'
import { CgMenuGridR } from 'react-icons/cg'
import { BsPersonCircle } from 'react-icons/bs'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Searchbar from "./Searchbar"
import Logout from '../../../assets/Logout.svg'
import Profile from '../../../assets/Profile.svg'
import Studio from '../../../assets/Studio.svg'
import { clearUser } from "../../../store/slices/userSlice"

const Header = ({ toggle, setToggle, isModal }) => {
    const { user, profile } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [userModal, setUserModal] = useState(false)
    const [findUserVal, setFindUser] = useState('')
    const [findedUsers, setFindedUsers] = useState(null)

    useEffect(() => {
        setTimeout(async () => {
            const users = await axios.post('http://localhost:3000/api/user/find', { username: findUserVal })
            setFindedUsers(users.data) 
        }, 200)
    }, [findUserVal])

    return (
        <nav className="flex justify-between items-center bg-primary-500 px-6 py-4 border-b-2 border-solid border-black shadow-lg shadow-black">
            <div className="flex items-center">
                    <CgMenuGridR onClick={() => setToggle(!toggle)} className="mr-2 text-accent text-3xl font-semibold cursor-pointer" />
                    <Link to='/' className="sm:text-xl sm:inline-block sm:text-purple-600 sm:font-semibold hidden">
                        <img src={Logo} className="w-[96px] h-[64px]" alt="Logo" />
                    </Link> 
            </div>
            <div className="md:relative md:block hidden">
                <Searchbar onChange={setFindUser} />
                <div className={`${findUserVal !== ''? 'absolute mt-4 bg-primary-500 h-[240px] py-2 w-full rounded-[10px] z-10' : 'hidden'}`}>
                    <div>
                        <header className="flex items-center px-4 py-2 w-full">
                            <span className="text-xl text-accent font-bold">Finded users</span>
                        </header>
                        {
                            findedUsers? findedUsers.map((user, idx) => (
                                <div key={idx} className="px-4">
                                    <span className="text-accent text-lg font-semibold">{ user.username }</span>
                                </div>
                            )) : null
                        }
                    </div>
                </div>
            </div>
            {
                user? 
                    <div className="">
                        <div onClick={() => setUserModal(!userModal)} className="flex items-center cursor-pointer">
                            <section className="flex justify-between items-center mr-[24px]">
                                <img onClick={() => dispatch(clearUser())} src={Logout} alt="Logout" className="w-[20px] h-[20px]" />
                                <Link to={`/page/${user.id}`} className="text-purple-600 font-semibold block mx-[24px]">
                                    <img src={Profile} alt="Profile" />
                                </Link>
                                <Link to={`/studio/${user.id}`} className="">
                                    <img src={Studio} alt="Profile"className="w-[20px] h-[20px]" />
                                </Link>
                            </section>
                            { profile.avatar? 
                                <Link to={`/profile/${user.id}`}>
                                    <img src={`http://localhost:9000/avatars/${profile.avatar}`} alt="Avatar" className="w-[40px] h-[40px] rounded-full border-2 border-solid border-[#E0AAFF]" />
                                </Link> : <BsPersonCircle className="text-2xl text-yellow-400 font-semibold" /> }
                        </div>
                    </div> 
                    :
                    <div className="flex">
                        <Button title='Sign In' sx={{ margin: 'mr-3' }} onClick={() => isModal(0)} />
                        <Button title='Sign Up' accent={true} onClick={() => isModal(1)} />
                    </div>
            }
        </nav>
    )
}

export default Header