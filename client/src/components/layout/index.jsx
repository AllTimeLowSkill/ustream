import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { BTN_GRADIENT } from "../../constants/gradients"
import Modal from "../Modal"

const Layout = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true)
    const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(0)

    const toggleModal = (type) => {
        setIsModal(!isModal)
        setModalType(type)
    }

    return (
        <div className="w-[100wv] relative">
            { isModal? <Modal toggleModel={toggleModal} type={modalType} /> : null }
            <Header toggle={toggleSidebar} setToggle={setToggleSidebar} isModal={toggleModal} modal={isModal} />
            <div className="flex">
                <Sidebar toggle={toggleSidebar} />
                <div className={`w-full bg-gray-700 min-h-[100vh] ${BTN_GRADIENT}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout