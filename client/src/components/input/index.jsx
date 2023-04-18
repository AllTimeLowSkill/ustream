const InputControl = ({ placeholder='', type='text', value, onChange }) => {
    if(type === 'file') {
        return (
            <label className="block cursor-pointer">
                <span className="sr-only">{placeholder}</span>
                <input
                    onChange={e => onChange(e.target.files)}
                    className="block text-white file:rounded-[10px] file:bg-gradient-to-r file:cursor-pointer file:from-[#3C096C] file:to-[#5A189A] file:px-[16px] file:py-[8px] file:text-white file:border-0" 
                    type="file" 
                />
            </label>
        )
    } else if(type === 'textarea') {
        return (
            <textarea 
                onChange={e => onChange(e.target.value)} value={value} 
                className="bg-[#3C096C] rounded-[10px] w-full px-[18px] py-[8px] text-white text-base" 
                rows="10" 
            />
        )
    } else {
        return (
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className="px-[18px] py-[8px] w-full rounded-[10px] bg-[#3C096C] text-white text-base" 
                type={type} 
                placeholder={placeholder} 
            />
        )
    }
}

export default InputControl