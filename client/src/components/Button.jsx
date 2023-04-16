import { BTN_GRADIENT } from "../constants/gradients"

const Button = ({ title, accent=false, sx=null, onClick }) => {
    return (
        <button
            onClick={() => onClick()}
            className={`${accent? `${BTN_GRADIENT} hover:bg-hover_bg rounded-[10px] px-6 py-2` : ''} ${sx? Object.keys(sx).map(key => sx[key]).join(' ') : ''} text-accent text-md font-semibold duration-150`}
        >
            <span className={`${accent? '' : 'hover:shadow-text'} duration-150`}>{ title }</span>
        </button>
    )
}

export default Button
