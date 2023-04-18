import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Avatar from "../../../components/avatar"
import { useNavigate } from "react-router-dom"

const StreamListItem = ({ streamKey, username, avatar, id }) => {
    const { categories } = useSelector(state => state.category)

    const navigate = useNavigate()
    const [categoryName, setCategory] = useState('')

    useEffect(() => {
        const category = categories.find(item => item.id === id)
        setCategory(category.title)
    }, [categories])

    return (
        <div onClick={() => navigate(`/stream/${streamKey}`)} className="cursor-pointer">
            <img className="rounded-[10px] max-w-[280px] max-h-[320px] mb-3" src={`http://localhost:8080/${streamKey}.png`} alt="thumbnail" />
            <div className="flex items-center mt-[16px]">
                <Avatar size="medium" img={avatar}/>
                <div className="ml-[18px]">
                    <span className="text-xl text-white">{ username }</span>
                    <br />
                    {categoryName? <span className="text-base text-[#E0AAFF] font-semibold">{ categoryName }</span> : null}
                </div>
            </div>
        </div>
    )
}

export default StreamListItem