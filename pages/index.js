import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '50px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        textAlign: 'center',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.95)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <img src="https://media1.tenor.com/m/xwrEEmNxv5gAAAAC/march-7th-evernight.gif" alt="image" style={{ height: '80px', borderRadius: '25px', marginBottom: '20px' }} />
        <h1 style={{ color: '#333', marginBottom: '16px' }}>
          Student Manager
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Ever read Moby Dick?
        </p>
        <Link href="/students/advanced-crud" passHref>
          <button style={{
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            height: '50px',
            fontSize: '16px',
            borderRadius: '25px',
            padding: '0 40px',
            cursor: 'pointer'
          }}>
            Check out this awesome page!
          </button>
        </Link>
      </div>
    </div>
  );
}
