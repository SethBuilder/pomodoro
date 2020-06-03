import React from 'react'
import './NavBar.css'
import { TwitterShareButton } from 'react-twitter-embed';



const NavBar = () => (
  <header style={{ position: 'absolute', height: '40px', marginBottom: '10px' }} className="ampstart-headerbar flex justify-start items-center top-0 left-0 right-0 pl2 pr4 ">
    <a href="/" className="text-decoration-none inline-block mx-auto ampstart-headerbar-home-link  ">
      <div className="ampstart-headerbar-title mx-auto ">Pomodoro</div>
    </a>
    <nav className="ampstart-headerbar-nav ampstart-nav  xs-hide sm-hide">
      <ul className="list-reset center m0 p0 flex justify-center nowrap">
        {/* <li className="ampstart-nav-item "><a href="#" className="text-decoration-none block">About</a></li> */}
        {/* <li className="ampstart-nav-item "><a href="#" className="text-decoration-none block">Contact</a></li> */}
        <li className="ampstart-nav-item " style={{marginTop: '10px'}}>
          <a href="#" className="text-decoration-none block">
            <TwitterShareButton
              url={'https://pomodoro.seif.rocks'}
              options={{ text: 'This #pomodoro timer is awesome', via: 'seifjo1', height: 600 }}
            />
          </a></li>
      </ul>
    </nav>
  </header>
)

export default NavBar