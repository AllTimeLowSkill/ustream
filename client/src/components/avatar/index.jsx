const Avatar = ({ size='base', img }) => {
    return (
        <img
            className={`${size === 'base'? 'w-[40px] h-[40px]' : size === 'xl'? 'w-[90px] h-[90px]' : 'w-[65px] h-[65px]'} rounded-full border-2 border-solid border-[#E0AAFF]`} 
            src={`http://localhost:9000/avatars/${img}`} 
            alt="Avatar" 
        />
    )
}

export default Avatar