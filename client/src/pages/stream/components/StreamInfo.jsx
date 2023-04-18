import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../../components/avatar'
import Button from '../../../components/button'
import { addFollow } from '../../../store/slices/userSlice'

const StreamInfo = ({ avatar, username, category, streamKey }) => {
    const { user } = useSelector(state => state.user)
    const dispath = useDispatch()

    return (
        <section className="flex justify-between items-center rounded-[10px] mt-[12px] px-[18px] py-[16px] w-full bg-[#240046]">
            <section className='flex items-center'>
                <Avatar img={avatar} size='medium' />
                <div className='ml-[24px]'>
                    <span className='text-lg text-white'>{ username }</span>
                    <br />
                    { category? <span className='text-sm text-[#E0AAFF] font-semibold'>{ category }</span> : null }
                </div>
            </section>
            <section>
                <Button onClick={() => dispath(addFollow({ id: user.id, follow: streamKey }))} title='Follow' accent={true} />
            </section>
        </section>
    )
}

export default StreamInfo