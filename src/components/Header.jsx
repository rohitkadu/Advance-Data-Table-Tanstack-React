import React from 'react';
import logo_img from '../../public/table-icon.png';
import reactLogo from '../../public/reactLogo.png';
import tanstackLogo from '../../public/tanstackLogo.png';
import jsLogo from '../../public/javascriptLogo.png';
import cssLogo from '../../public/cssLogo.png';
import muiLogo from '../../public/muiLogo.png';

const Header = () => (
  <header className="header">
    <div className="site">
        <div className="logo-container">
        <img src={logo_img} alt="Logo" className="logo" />
        </div>
        <h1 className="title">ADVANCE DATA TABLE</h1>
    </div>
    <div className="tech-stack">
        <img src={reactLogo} alt="React Logo" className='techLogo'/>
        <img src={tanstackLogo} alt="Tanstack Logo" className='techLogo'/>
        <img src={muiLogo} alt="Material UI Logo" className='techLogo'/>
        <img src={jsLogo} alt="JavaScript Logo" className='techLogo'/>
        <img src={cssLogo} alt="CSS Logo" className='techLogo'/>
    </div>
  </header>
);

export default Header;
