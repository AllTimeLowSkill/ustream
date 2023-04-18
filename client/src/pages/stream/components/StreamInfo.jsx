import Avatar from '../../../components/avatar'

const StreamInfo = ({ avatar, username, category }) => {
    return (
        <section className="rounded-[10px] mt-[12px] px-[18px] py-[16px] w-full bg-[#240046]">
            <section className='flex items-center'>
                <Avatar img={avatar} size='medium' />
                <div className='ml-[24px]'>
                    <span className='text-lg text-white'>{ username }</span>
                    <br />
                    { category? <span className='text-sm text-[#E0AAFF] font-semibold'>{ category }</span> : null }
                </div>
            </section>
        </section>
    )
}

export default StreamInfo