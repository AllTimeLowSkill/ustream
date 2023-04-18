import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DISPLAY_SIZES_LIST } from '../../../constants/displaySize';
import { useNavigate } from 'react-router-dom';

const CategoryList = ({ categories=[] }) => {
    const navigate = useNavigate()

    return (
        <section className='mt-[42px]'>
            <header className='mb-[12px]'>
                <p className='text-white text-3xl font-semibold'>
                    <span className='text-[#E0AAFF]'>Games</span> you might like
                </p>
            </header>
            <Carousel 
                responsive={DISPLAY_SIZES_LIST}
                showDots={false}
            >
                {
                    categories.map(item => (
                        <img
                            onClick={() => navigate(`/category/${item.id}`)}
                            key={item.id}
                            className='rounded-[20px] w-[160px] h-[200px] hover:drop-shadow hover:shadow-black cursor-pointer' 
                            src={`http://localhost:9000/category-image/${item.image}`} 
                            alt={item.title} 
                            width={280} 
                            height={480} />
                    ))
                }
            </Carousel>
        </section>
    )
}

export default CategoryList