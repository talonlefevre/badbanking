function AllData(){
  const ctx = React.useContext(UserContext);
  let status;
  let name;
  let email;
  let password;
  let balance;
  let current;
  let transactions;

  const getData = () => {
      for (let i = 0; i < ctx.users.length; i++){
          if (ctx.users[i].current === true){
              name = ctx.users[i].name;
              email = ctx.users[i].email;
              password = ctx.users[i].password;
              balance = parseFloat(ctx.users[i].balance).toFixed(2);
              current = ctx.users[i].current;
              status = '';
              transactions= ctx.users[i].transactions;
          } if (ctx.users[i].current !== true){
              let error = `Log in to see your account information`;
              status = error.replace(/"/g, '');
          }
      }
      
  }

  getData();
  return (
      <Card
      bgcolor="info"
      header={
        <div style={{ textAlign: 'center' }}>
          Account Information
        </div>
      }
      status={status}
      body={
          <div>
          <h3>Name: {name}</h3>
          <h3>E-Mail: {email}</h3>
          <h3>Password: {password}</h3>
          <h3>Balance: {balance}</h3>
          <h3>Signed In: {JSON.stringify(current)}</h3><br></br><br></br>
          <h3>Recent Transactions:</h3>
          <h5>{transactions}</h5>
          </div>
                  
          }
      />
  )
}
