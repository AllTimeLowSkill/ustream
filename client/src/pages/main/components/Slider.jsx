import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Button from '../../../components/button'
import { DISPLAY_SIZES_SLIDER } from '../../../constants/displaySize';
import { useNavigate } from 'react-router-dom';

const Slider = ({ categories }) => {
    const navigate = useNavigate()

    return (
        <section className=''>
            <Carousel
                className='lg:max-w-[980px] xl:max-w-[1150px] 2xl:max-w-[1250px]'
                responsive={DISPLAY_SIZES_SLIDER}
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={["xxl", "xl", "lg"]}
                partialVisible={false}
                
            >
                {
                    categories.map(item => (
                        <section key={item.id} className='flex justify-between'>
                            <img onClick={() => navigate(`/category/${item.id}`)} src={`http://localhost:9000/category-image/${item.image}`} alt={item.title} className='xl:w-[800px] 2xl:w-[880px] h-[400px] rounded-[10px]' width={800} height={500} />
                            <section className='py-[28px] flex flex-col h-[400px] justify-between items-center'>
                                <header className='text-center'>
                                    <span className='text-lg text-white'>{item.title}</span>
                                </header>
                                <p className='text-white text-left py-[28px] w-[340px]'>
                                    {item.desc}
                                </p>
                                <Button onClick={() => navigate(`/category/${item.id}`)} title='Watch Now' accent={true} sx={{ width: 'w-full' }} />
                            </section>
                        </section>
                    ))
                }
            </Carousel>
        </section>
    )
}

export default Slider