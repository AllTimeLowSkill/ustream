import { useDispatch, useSelector } from "react-redux"
import { clearUser } from '../../../store/slices/userSlice'
import Avatar from "../../avatar"
import Icon from "../../icon"
import { useState } from "react"
import { NAVIGATE } from "../../../constants/navigate"
import { useNavigate } from "react-router-dom"
import Logout from '../../../assets/Logout.svg'


const UserNavidation = () => {
    const { profile, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [isNavigate, setIsNavigate] = useState(false)

    const handleLink = (path) => {
        navigate(path)
        setIsNavigate(false)
    }


    return (
        <section className="flex flex-col justify-between items-end relative w-[150px] cursor-pointer"  onClick={() => setIsNavigate(!isNavigate)}>
            <div className="flex items-center">
                <span className="text-lg text-white font-semibold mr-[18px]">{ user.username }</span>
                <Avatar img={profile.avatar} />
            </div>
            {
                isNavigate?
                <section className="absolute px-[16px] py-[12px] rounded-[10px] bg-[#240046] right-0 w-full mt-[48px] z-10">
                    <span className="inline-block pb-[12px] border-b-2 border-solid border-[#E0AAFFB2] text-white font-semibold w-full text-center">{ user.username }</span>
                    <section>
                    {
                        NAVIGATE.map((item, idx) => (
                            <div onClick={() => handleLink(`${item.path}/${user.id}`)} key={idx} className='flex items-center mt-[12px] cursor-pointer'>
                                <Icon icon={item.icon} />
                                <span className="text-base text-white ml-[12px]">{ item.title }</span>
                            </div>
                        ))
                    }
                    </section>
                    <div onClick={() => dispatch(clearUser())} className="flex items-center mt-[12px] cursor-pointer">
                        <Icon icon={Logout} />
                        <span className="text-base text-[#E0AAFF] ml-[12px]">Logout</span>
                    </div>
                </section> : null
            }
        </section>
    )
}

export default UserNavidation