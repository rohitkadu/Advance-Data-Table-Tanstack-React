import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <p>Created with ❤️ by Rohit</p>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
