import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const StreamListItem = ({ streamkey, username, avatar, id }) => {
    const { categories } = useSelector(state => state.category)
    const [categoryName, setCategory] = useState([])

    useEffect(() => {
        const category = categories.find(item => item.id === id)
        setCategory(category.title)
    }, [categories])

    return (
    <div className="w-fit pb-4 px-2 text-center hover:drop-shadow-xl hover:shadow-md hover:shadow-[#FFFFFF] duration-200">
        <img className="rounded-[10px] max-w-[320px] max-h-[320px] mb-3" src={`http://localhost:8080/${streamkey}.png`} alt="thumbnail" />
        {
            categoryName?
            <div className="flex items-center">
                <img src={`http://localhost:9000/avatars/${avatar}`} alt="User avatar" className="w-[64px] h-[64px] rounded-full border-[#C77DFF] mr-3" />
                <div>
                    <span className="text-2xl text-accent">{username}</span>
                    <br />
                    <span className="text-md text-accent">{ categoryName }</span>
                </div>
            </div> : null
        }
    </div>
    )
}

export default StreamListItem