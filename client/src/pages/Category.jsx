import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import StreamList from "../components/StreamsList"

const Category = () => {
    const { categories } = useSelector(state => state.category)
    const { streams } = useSelector(state => state.streams)
    const { id } = useParams()

    const [category, setCategory] = useState(null)
    const [categoryStreams, setCategoryStreams] = useState(null)

    useEffect(() => {
        const local = JSON.parse(sessionStorage.getItem('category'))
        if(!local || id !== local.id) {
            const cat = categories.find(item => item.id === id)
            setCategory(cat)
            sessionStorage.setItem('category', JSON.stringify(cat))
        } else {
            setCategory(local)
        }
    }, [])

    useEffect(() => {
        const stream = streams.filter(item => item.category === id)
        setCategoryStreams(stream)
    }, [category])

    return (
        <>
            {
                category? 
                <div className="px-[28px] py-[48px]">
                    <header className="flex items-center">
                        <img src={`http://localhost:9000/category-image/${category.image}`} alt="Category" className="w-[170px] h-[230px] rounded-[10px]" />
                        <div className="px-[28px]">
                            <span className="text-accent text-4xl font-bold mb-[64px] inline-block">{ category.title }</span>
                            <p className="text-base text-accent">
                                {category.desc}
                            </p>
                        </div>
                    </header>
                    {
                        categoryStreams?
                            <section className="mt-[40px]">
                                <StreamList streams={categoryStreams} />
                            </section> : null
                    }
                </div> : null
            }
        </>
    )
}

export default Category