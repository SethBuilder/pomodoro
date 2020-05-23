import React from 'react'
import './NavBar.css'


const NavBar = () => (
    <header className="ampstart-headerbar fixed flex justify-start items-center top-0 left-0 right-0 pl2 pr4 ">
    <a href="land-see.amp.html" className="text-decoration-none inline-block mx-auto ampstart-headerbar-home-link  ">
      <div className="ampstart-headerbar-title mx-auto ">Pomodoro</div>
    </a>
    <nav className="ampstart-headerbar-nav ampstart-nav  xs-hide sm-hide">
      <ul className="list-reset center m0 p0 flex justify-center nowrap">
        <li className="ampstart-nav-item "><a href="#" className="text-decoration-none block">About</a></li>
        {/* <li className="ampstart-nav-item "><a href="#" className="text-decoration-none block">Contact</a></li> */}
        <li className="ampstart-nav-item "><a href="#" className="text-decoration-none block">Tweet about us!</a></li>
      </ul>
    </nav>
  </header>
)

export default NavBar