const Icon = ({ icon, alt, sx=null }) => {
    return (
        <img src={icon} alt={alt} className={`w-[20px] h-[20px] ${sx? Object.keys(sx).map(key => sx[key]).join(''): ''}`} />
    )
}

export default Icon