import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.nav}>
        <div>Product</div>
        <div>Solutions</div>
        <div>Resources</div>
        <div>Open Source</div>
        <div>Enterprise</div>
        <div>Pricing</div>
      </div>
      <div>
        <input type="text" placeholder="Search or jump to..." style={styles.searchInput} />
        <button style={styles.signInButton}>Sign in</button>
        <button style={styles.signUpButton}>Sign up</button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#000',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  searchInput: {
    padding: '5px',
    marginRight: '10px',
  },
  signInButton: {
    marginRight: '10px',
  },
  signUpButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default Header;
