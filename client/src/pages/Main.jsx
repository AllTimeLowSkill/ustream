import { useEffect } from "react"
import StreamList from "../components/StreamsList"
import { getStreams } from "../store/slices/streamsSlice"
import { useSelector, useDispatch } from 'react-redux'
import CourouselSection from "../components/CarouselSection"
import CategoriesSection from "../components/CategoriesSection"

const Main = () => {
    const { streams } = useSelector(state => state.streams)
    const { categories } = useSelector(state => state.category)
    const dispath = useDispatch()

    useEffect(() => {
        dispath(getStreams())
    }, [])

    return (
        <div className="">
            { categories? <CourouselSection /> : null }
            { categories? <CategoriesSection /> : null }
            
            { categories? <StreamList streams={streams} />: null }
        </div>
    )
}

export default Main