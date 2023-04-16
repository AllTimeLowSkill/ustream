import { useSelector } from "react-redux"
import Slider from "./Slider"
import { BTN_GRADIENT } from "../constants/gradients"

const CourouselSection = () => {
    const { categories } = useSelector(state => state.category)

    return (
        <section className={`md:flex md:justify-between md:items-center md:px-[28px] md:py-[42px] hidden`}>
            <Slider elements={categories} />
        </section>
    )
}

export default CourouselSection