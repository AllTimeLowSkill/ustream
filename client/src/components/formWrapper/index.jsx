const FormWrapper = ({ children, title }) => {
    return (
        <section className="bg-[#240046] pb-[42px] px-[112px] rounded-[10px]">
            <header className="py-[42px]">
                <span className="text-4xl text-white font-semibold">{title}</span>
            </header>
            <main>
                { children }
            </main>
        </section>
    )
}

export default FormWrapper