const Modal = ({ children, toggle }) => {
    return (
        <section className="absolute flex justify-center items-center w-full z-20">
            <div onClick={() => toggle(false)} className="w-full h-full bg-black opacity-70 min-h-[100vh]" />
            <div className="absolute ">
                { children }
            </div>
        </section>
    )
}

export default Modal