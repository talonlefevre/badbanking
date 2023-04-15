function Deposit(){
  const ctx = React.useContext(UserContext);
  let disabledText = true;
  let [balance, setBalance] = React.useState(0);
  let [newBalance, setNewBalance] = React.useState();
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [transactions, setTransactions] = React.useState();
  let error = 'Log In to view your account';
  let user;

  const getBalance = () => {
      for (let i = 0; i < ctx.users.length; i++){
          if (ctx.users[i].current === true){
              disabledText = false;
              error = '';
              user = ctx.users[i];
              balance = parseFloat(user.balance).toFixed(2);
              console.log(newBalance);
              return;
          }
      }
      
  }
  function deposit () {
      user.balance = user.balance + newBalance;   
      setShow(false);
      setNewBalance(null);
      setDisabled(true);
      setTransactions(user.transactions.push(
          <p style={{fontSize: '16px'}}>
              <br></br>
              ----------------------------
              <br></br>
              You deposited ${parseFloat(newBalance).toFixed(2)} at
              <br></br>
              <br></br>
              -{new Date().toTimeString()}-<br></br>-{new Date().toDateString()}-
              <br></br>
              <br></br>
              Your new balance is ${parseFloat(user.balance).toFixed(2)}
              <br></br>
              ----------------------------
              <br></br>
              </p>
          ));
      return;
  }

      const handleKeyDown = e => {
          if (e.key === " ") {
            e.preventDefault();
          }
      }
  
  function clearForm() {
      setShow(true);
  }

  function depositValidate (value) {
          
      console.log(value);

      if (value === ''){
          setNewBalance(null);
          setDisabled(true);
          setStatus('Choose an amount to deposit');
          return;
      }

      if (value < 0.01){
          setDisabled(true);
          setStatus('Deposit amount must be at least $0.01')
          return;
      }
      
      
      
      if(value > 0){
          setDisabled(false);
          setStatus('');
          return;
      };
      
      if (value !== parseFloat(value)){
          setDisabled(true);
          setStatus('Amount input is not a number');
          return;
      };
}
  
  getBalance();

  return (
      <Card
      bgcolor="info"
      header={
        <div style={{ textAlign: 'center' }}>
          Deposit
        </div>
      }
      status={status}
      body={show ? (
          <>
              <h2>Balance: ${ parseFloat(balance).toFixed(2) }</h2>
              <input 
              onKeyDown={handleKeyDown}
              disabled={disabledText}
              className="form-control" 
              style={{width: '300px', margin:"5px"}} 
              onChange={(e) => {
                  setNewBalance(parseFloat(e.currentTarget.value));
                  depositValidate(e.currentTarget.value);
              }
              } 
          placeholder="How much would you like to deposit?"/>
              <button className="btn btn-dark" disabled={disabled} style={{margin:"5px"}} type="submit" onClick={deposit}  >Deposit</button>
              <h5>{ error }</h5>
          </>
          ):(
          <>
              <h3>Your new balance is ${ balance }</h3>
              <h5>Success!</h5>
              <button className="btn btn-dark" style={{margin:"5px"}} onClick={clearForm}>Make another transaction</button>
          </>         
          )}
      />
  )
}