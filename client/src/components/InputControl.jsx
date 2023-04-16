const InputControl = ({ type='text', placeholder, onChange, sx=null, value, disable=true }) => {
    return (
        <div className={`${sx? Object.keys(sx).map(key => sx[key]).join(' ') : ''}`}>
            <input
                value={value}
                className="bg-gradient_start px-[20px] py-2 w-full rounded-[10px] text-accent shadow shadow-black" 
                type={type} 
                placeholder={placeholder} 
                onChange={e => onChange(e.target.value)}
                disabled={disable === false} 
            />
        </div>
    )
}

export default InputControl