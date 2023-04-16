import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Button from './Button'

const Slider = ({ elements=[] }) => {
    return (
        <Carousel
            autoPlay={true}
            stopOnHover={true}
            emulateTouch={true}
            showArrows={false}
            showThumbs={false}
            swipeable={true}
            showStatus={false}
            showIndicators={false}
            className=''
        >
            {
                elements.map(el => (
                    <div key={el.id} className={`flex items-center justify-between`}>
                        <img src={`http://localhost:9000/category-image/${el.image}`} className='rounded-[20px] inline-block shrink grow max-w-[1000px] max-h-[500px]'  alt="Category" />
                        <section className='xl:flex xl:flex-col xl:shrink-0 xl:ml-[48px] xl:w-[30%] xl:justify-start xl:pr-[24px] hidden'>
                            <header className='flex justify-start items-center'>
                                <h2 className='text-lg text-accent'>{ el.title }</h2>
                            </header>
                            <main className='my-[20px] w-[400px] '>
                                <p className='text-base text-accent text-left'>
                                    {el.desc}
                                </p>
                            </main>
                            <footer className=''>
                                <Button accent={true} title='Watch Now' sx={{ width: 'w-full', shadow: 'shadow shadow-black' }} />
                            </footer>
                        </section>
                    </div>
                ))
            }
        </Carousel>
    )
}

export default Slider