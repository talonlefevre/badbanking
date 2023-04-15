function Withdraw(){
  const ctx = React.useContext(UserContext);
  let balance = '0';
  let error = 'Log In to view your account';
  let user;
  let disabledText = true;
  const [newBalance, setNewBalance] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [transactions, setTransactions] = React.useState();

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
  
  function withdraw () {
      console.log(transactions);
      if(user.balance >= newBalance){
          user.balance = user.balance - newBalance;
          setShow(false);
          setNewBalance(null);
          setTransactions(user.transactions.push(
              <p style={{fontSize: '16px'}}>
                  <br></br>
                  ----------------------------
                  <br></br>
                  You withdrew ${parseFloat(newBalance).toFixed(2)} at
                  <br></br>
                  <br></br>
                  -{new Date().toTimeString()}-<br></br>-{new Date().toDateString()}-
                  <br></br>
                  <br></br>
                  Your remaining balance is ${parseFloat(balance - newBalance).toFixed(2)}
                  <br></br>
                  ----------------------------
                  <br></br>
                  </p>
              )
          );
          return parseFloat(balance).toFixed(2);
      }           
  }
  
      
      const handleKeyDown = e => {
          
          if (e.key === " ") {
            e.preventDefault();
          }
      }
      
      function clearForm() {
          setDisabled(true);
          setShow(true);
      }
      
      function withdrawValidate (value) {
          
          console.log(value);            
          
          if (value === ''){
              setNewBalance(null);
              setDisabled(true);
              setStatus('Choose an amount to withdraw');
              return;
          }
          
          if (value < 0.01){
              setDisabled(true);
              setStatus('Amount to withdraw must be at least $0.01')
              return;
          }
          
          if(user.balance >= value){
              setDisabled(false);
              setStatus('');
              return;
          };
          
          if (user.balance < value){
              setDisabled(true);
              setStatus('OVERDRAFT NOTICE: Not enough funds for this transaction');
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
              Withdraw
            </div>
          }
          status={status}
          body={show ? (
          <>
              <h2>Balance: ${ parseFloat(balance).toFixed(2) }</h2>
              <input 
              onKeyDown={handleKeyDown} 
              className="form-control"  
              disabled={disabledText}              
              style={{width: '320px', margin:"5px"}} 
              onChange={
                  (e) => {
                      setNewBalance(parseFloat(e.currentTarget.value).toFixed(2)); 
                      withdrawValidate(e.currentTarget.value);
                  }

              } 
              placeholder="How much would you like to withdraw?"/>
              <button className="btn btn-dark" style={{margin:"5px"}} type="submit" onClick={withdraw} disabled={disabled}>Withdraw</button><br></br>
              <h5 >{ error }</h5>
          </>
          ):(
          <>
          <h5>Success!</h5>
          <h3>Your new balance is ${ parseFloat(balance).toFixed(2) }</h3>
          <button className="btn btn-light" style={{margin:"5px"}} onClick={clearForm}>Make another transaction</button>
          </>         
          )}
      />
  )
}
