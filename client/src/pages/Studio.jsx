import { useDispatch, useSelector } from "react-redux"
import Stream from "../components/Stream"
import { useState } from "react"
import { useEffect } from "react"
import StreamChat from "../components/StreamChat"
import Button from "../components/Button"
import { updateCategory } from "../store/slices/categorySlice"

const Studio = () => {
    const { user, profile } = useSelector(state => state.user)
    const { streams } = useSelector(state => state.streams)
    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [streamCategory, setStreamCategory] = useState(null)

    useEffect(() => {
        if(streams.length !== 0) {
            const stream = streams.find(stream => stream.streamId === user.streamKey)
            const category = categories.find(item => item.id === stream.category)
            setStreamCategory(category)
        }
    }, [streams])

    const updateStreameCategory = () => {
        console.log(streamCategory)
        dispatch(updateCategory({ id: streamCategory, streamKey: user.streamKey }))
    }

    return (
        <div>
            <header className="px-4 py-2">
                <span className="text-lg text-accent font-semibold">Studio</span>
            </header>
            <div className="px-4 py-2 rounded bg-gray-800 shadow-md mt-4">
                {
                    streamCategory?
                        <section className="flex">
                            <Stream streamKey={user.streamKey} avatar={profile.avatar} username={user.username} id={streamCategory.id} />
                            <StreamChat id={user.streamKey} />
                        </section> : null
                }
                <div className="mt-6 flex justify-between items-center">
                   {
                    streamCategory?  
                    <select defaultValue={streamCategory.id} onChange={e => setStreamCategory(e.target.value)} className="w-full rounded-[10px] bg-primary-500 px-2 py-2 text-accent mr-[18px]" name="categories" id="">
                        <option value="DEFAULT" disabled>Choose a salutation ...</option>
                        {
                            categories.map(item => (
                                <option selected={streamCategory.id === item.id} key={item.id} value={item.id}>{ item.title }</option>
                            ))
                        }
                    </select> : null
                   }
                    <Button title='Update category' accent={true} onClick={() => updateStreameCategory()} />
                </div>
            </div>
        </div>
    )
}

export default Studio