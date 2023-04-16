const Searchbar = ({ onChange }) => {
    return (
        <input
            onChange={e => onChange(e.target.value)} 
            type="search" placeholder="Search..."
            className="bg-gradient_start px-[20px] py-2 rounded-[10px] w-[350px] text-accent" 
        />
    )
}

export default Searchbar