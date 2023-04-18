import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.svg'
import Button from '../button'
import Searchbar from './components/Searchbar'
import UserNavidation from './components/UserNavigation'

const Header = ({ toggle }) => {
    const { user } = useSelector(state => state.user)

    return (
        <nav className="flex justify-between items-center pl-[8px] pr-[28px] bg-[#240046] border-b-2 border-solid border-black">
            <Link to='/'>
                <img src={Logo} width={175} height={75} alt="Logo" />
            </Link>
            <Searchbar /> 
            {
                user? 
                <UserNavidation /> 
                : 
                <section>
                    <Button onClick={() => toggle(0)} title='Log in' />
                    <Button onClick={() => toggle(1)} title='Sign Up' accent={true} />
                </section>
            }
        </nav>
    )
}

export default Header