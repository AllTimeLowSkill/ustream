import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

const Modal = ({ toggleModel, type=0 }) => {
    return (
        <section className="absolute w-full h-full z-20 flex justify-center items-center">
            <div onClick={() => toggleModel()} className="w-full h-full bg-black opacity-70" />
            { type === 0? <SignIn toggleModal={toggleModel} /> : <SignUp toggleModal={toggleModel} /> }
        </section>
    )
}

export default Modal