function Home() {
  return (
    <Card
      bgcolor="info"
      txtcolor="white"
      header={
        <div style={{ textAlign: 'center' }}>
          Bad Bank Home Page
        </div>
      }
      title={
        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          Bank Smarter, Live Better:<br/>
          Your Financial Partner On-the-Go.
        </div>
      }
      text={<img src="bank.png" className="img-fluid" alt="Responsive Image" />}
    />
  );
}
