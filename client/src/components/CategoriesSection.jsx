import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const CategoriesSection = () => {
    const { categories } = useSelector(state => state.category)

    return (
        <section className="lg:px-[28px] lg:block hidden">
            <header>
                <p className="text-accent text-5xl font-semibold"><span className="text-[#E0AAFF]">Games</span> you might like</p>
            </header>
            <div className="inline-grid grid-flow-row-dense gap-[24px] grid-cols-4 mt-[18px]">
                {
                    categories.map(item => (
                        <Link to={`/category/${item.id}`} key={item.id}>
                            <img src={`http://localhost:9000/category-image/${item.image}`} alt="Category" className="rounded-[20px] max-w-[240px] h-[320px]" />
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default CategoriesSection