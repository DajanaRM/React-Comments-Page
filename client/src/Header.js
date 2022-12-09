import logo from './media/logo.png';
import avatar from './media/1.png';

function Header ({ user }) {
    
    return (
        <>
        <header>
            <div className="logo_container" onClick={() => document.querySelector('.hack').scrollIntoView()}><img src={logo} className="logo"  alt="logo" />{window.innerHeight > window.innerWidth ? '' : 'CompanyName'}
            </div>
            <div className = "avatar_container">
                <img fetchpriority="high" src={avatar} className="avatar" title={user} alt="avatar" />
            </div>
        </header>
        <div className = 'hack' ></div>
</>        
  );
}

export default Header;