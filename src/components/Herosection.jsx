import React from 'react';

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>Let's build from here</h1>
      <p style={styles.subtitle}>The world’s leading AI-powered developer platform.</p>
      <input
        type="email"
        placeholder="Email address"
        style={styles.input}
      />
      <div style={styles.buttons}>
        <button style={styles.githubButton}>Sign up for GitHub</button>
        <button style={styles.trialButton}>Start a free enterprise trial</button>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#000',
    padding: '100px 20px',
  },
  title: {
    fontSize: '3em',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5em',
    marginBottom: '40px',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  githubButton: {
    backgroundColor: '#6f42c1',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  trialButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default HeroSection;
