import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Avatar from "../../components/avatar"
import InputControl from "../../components/input"
import Button from '../../components/button'
import FormElement from '../../components/formElement'
import { updateAvatar, updateProfile } from '../../store/slices/userSlice'
import { useMemo } from 'react'

const Profile = () => {
    const { user } = useSelector(state => state.user)
    const dispath = useDispatch()

    const userMemo = useMemo(() => {
        const local = JSON.parse(localStorage.getItem('user'))
        if(!local) return user
        return local
    }, [user])

    const [avatar, setAvatar] = useState(null)
    const [username, setUsername] = useState(userMemo.user.username)
    const [email, setEmail] = useState(userMemo.user.email)
    const [bio, setBio] = useState(userMemo.profile.aboutMe)
    const [firstname, setFirstname] = useState(userMemo.profile.firstname)
    const [lastname, setLastname] = useState(userMemo.profile.lastname)
    const [birthdate, setBirthdate] = useState(userMemo.profile.date)
    const [address, setAddress] = useState(userMemo.profile.address)



    return (
        <div className="px-[36px] py-[48px]">
            <span className="text-white text-[40px] font-semibold">Settings</span>
            <section className='my-[28px]'>
                <span className="text-white text-xl font-semibold">Profile Picture</span>
                <div className="flex items-center mt-[28px]">
                    <Avatar img={userMemo.profile.avatar} size="xl"/>
                    <div className='ml-[28px]'>
                        { avatar? 
                            <Button title='Update Profile Picture' onClick={() => dispath(updateAvatar({ id:user.id, avatar }))} /> 
                            : 
                            <InputControl type="file" placeholder="Update Profile Picture" onChange={setAvatar} /> 
                        }
                        <span className='text-white text-sm'>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
                    </div>
                </div>
            </section>
            <section className='py-[28px] border-t-2 border-b-2 solid border-[#E0AAFFB2]'>
                <span className="text-white text-xl font-semibold">Profile Settings</span>
                <div className='mt-[28px]'>
                    <FormElement label='Username' onChange={setUsername} value={username} />
                    <FormElement label='Email' type='email' onChange={setEmail} value={email} sx={{ margin: 'my-[28px]' }} />
                    <FormElement label='About Me' type='textarea' onChange={setBio} value={bio} />
                    <span className='text-white text-sm'>Description for the About panel on your channel page in under 300 characters</span>
                </div>
                <Button title='Save Changes' accent={true} sx={{ margin: 'mt-[20px]' }} />
            </section>
            <section className='py-[28px]'>
                <span className="text-white text-xl font-semibold">Private Settings</span>
                <div>
                    <FormElement label='Firstname' value={firstname} onChange={setFirstname} />
                    <FormElement label='Lastname' value={lastname} onChange={setLastname} sx={{ margin: 'my-[28px]' }} />
                    <FormElement label='Birth Date' value={birthdate} onChange={setBirthdate} type='date' />
                    <FormElement label='Address' value={address} onChange={setAddress} />
                    <Button onClick={() => dispath(updateProfile({ id: user.id, data: { firstname, lastname, aboutMe: bio, address, date: birthdate } }))} title='Save Changes' accent={true} sx={{ margin: 'mt-[20px]' }} />
                </div>
            </section>
        </div>
    )
}

export default Profile