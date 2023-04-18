import { useDispatch, useSelector } from "react-redux"
import { getStreams } from '../../store/slices/streamsSlice'
import { getCategories, setCategories } from '../../store/slices/categorySlice'
import Slider from "./components/Slider"
import CategoryList from "./components/CatygoryList"
import StreamList from "./components/StreamList"
import { useEffect } from "react"

const Main = () => {
    const { streams } = useSelector(state => state.streams)
    const { categories } = useSelector(state => state.category)

    const dispath = useDispatch()

    useEffect(() => {
        dispath(getStreams())
        const storageCategories = sessionStorage.getItem('categories')
        if(!storageCategories) {
            dispath(getCategories())
        } else {
            dispath(setCategories(JSON.parse(storageCategories)))
        }
    }, [])

    return (
        <main className="px-[28px] py-[48px]">
           { categories? <Slider categories={categories} /> : null }
           { categories? <CategoryList categories={categories} /> : null }
           { categories? <StreamList streams={streams} /> : null }
        </main>
    )
}

export default Main