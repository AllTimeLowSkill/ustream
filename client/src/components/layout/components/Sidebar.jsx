import { useSelector } from "react-redux"

const Sidebar = ({ toggle }) => {
    const { user, follows } = useSelector(state => state.user)

    return (
        <aside className={`${toggle? 'min-w-[15%] min-h-[100vh] bg-primary-500 py-[14px] px-[12px]' : 'hidden'}`}>
            {
                (user && follows)? 
                    <div>
                        <header className="">
                            <h2 className="text-2xl text-accent font-semibold">For you</h2>
                        </header>
                        <div className="px-4 py-6">
                            {
                                follows.map((follow, idx) => 
                                    <div key={idx} className="flex items-center">
                                        <img src={`http://localhost:9000/avatars/${follow.avatar}`} alt="user avatar" className="w-[40px] h-[40px] rounded-full border-solid border-2 border-[#E0AAFF]" />
                                        <span className="text-accent text-2xl ml-[12px]">{ follow.username }</span>
                                    </div>
                                )
                            }
                        </div>
                    </div> : null
            }
        </aside>
    )
}

export default Sidebar