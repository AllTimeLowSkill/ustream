import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import InputControl from '../components/InputControl'
import { updateAvatar, updateProfile } from '../store/slices/userSlice'

const Profile = () => {
    const { user, profile } = useSelector(state => state.user)
    const dispach = useDispatch()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [birthday, setBirthday] = useState('')
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)

    useEffect(() => {
        if(profile) {
            profile.firstname? setFirstname(profile.firstname) : setFirstname('')
            profile.lastname? setLastname(profile.lastname) : setLastname('')
            profile.aboutMe? setAboutMe(profile.aboutMe) : setAboutMe('')
            profile.address? setAddress(profile.address) : setAddress('')
            profile.date? setBirthday(profile.date) : setBirthday('')
        }
    }, [profile])

    return (
        <div className="bg-[#10002B]">
            <section className='p-[28px]'>
                <span className="text-accent text-xl font-semibold block">Profile picture</span>
                <div className="py-[28px] flex items-center border-solid border-b-2 border-gradient_end">
                    <div className='flex items-center'>
                        <img src={`http://localhost:9000/avatars/${profile.avatar}`} width={128} height={128} className='rounded-full w-[90px] h-[90px]' alt="Avatar" />
                        <div className='pl-[28px]'>
                            <label className="block text-sm font-semibold text-accent" htmlFor="BtnChangeAvatar">Update profile picture</label>
                            <input
                                onChange={e => setAvatar(e.target.files)} 
                                className="block w-full text-xs text-accent rounded-lg cursor-pointer bg-primary-800 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                id="BtnChangeAvatar" 
                                type="file" 
                            />
                            <span className='text-xs text-accent'>Must be JPEG, PNG, or GIF and cannot exceed 10MB</span>
                            {avatar? <Button accent={true}  title='Update avatar' onClick={() => dispach(updateAvatar({id:user.id, avatar}))} sx={{ width: 'w-full', shadow: 'shadow shadow-black', margin: 'mt-[18px]' }} /> : null}
                        </div> 
                    </div>
                </div>
            </section>
            <section className='p-[28px]'>
                <span className="text-accent text-xl font-semibold block">Profile settings</span>
                <div className="my-[28px]">
                    <InputControl value={username}  placeholder='Email' onChange={setUsername} />
                    <InputControl value={email}  placeholder='Username' onChange={setEmail} sx={{ 
                        margin: 'my-[24px]'
                    }} />
                    <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)} className='bg-gradient_start px-[20px] py-2 w-full rounded-[10px] text-accent shadow shadow-black' rows={10} placeholder='About me' />
                    <span className='text-xs text-accent'>Description for the About panel on your channel page in under 300 characters</span>
                </div>
                <Button title='Submit changes' accent={true} />
            </section>
            <section className='p-[28px]'>
                <span className='text-accent text-xl font-semibold block'>Private Settings</span>
                <div className='my-[28px]'>
                    <InputControl value={firstname}  placeholder='Firsname' onChange={setFirstname} />
                    <InputControl value={lastname}  placeholder='Lastname' onChange={setLastname} sx={{ 
                        margin: 'my-[24px]'
                    }} />
                    <InputControl value={address} onChange={setAddress} placeholder='Address' sx={{ margin: 'mb-[24px]' }} />
                    <InputControl value={birthday} onChange={setBirthday} type='date' placeholder='Birth date' />
                </div>
            </section>
            <footer className='px-[28px]'>
                <Button onClick={() => dispach(updateProfile({ id: user.id, data: { firstname, lastname, aboutMe, address, date: birthday } }))} title='Submit changes' accent={true} />
            </footer>
        </div>
    )
}

export default Profile