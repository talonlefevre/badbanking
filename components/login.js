function Login(){
  const [userEmail, setUserEmail] = React.useState('');
  const [disabled, setDisabled] = React.useState(true)
  const [userPassword, setUserPassword] = React.useState('');
  const [login, setLogin] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
      if(!field) {
          setStatus('Password is incorrect');
          setTimeout(() => setStatus(''), 3000);
          return false;
      }
      return true;
  }
 
  function validateEmail(email) {
      // check for @
      var atSymbol = email.indexOf("@");
      if(atSymbol < 1) return false;
      
      var dot = email.indexOf(".");
      if(dot <= atSymbol + 2) return false;
      
      // check that the dot is not at the end
      if (dot === email.length - 1) return false;
      
      return true;
  }
  
  function validateAll(email, password){
      if (userEmail !== '' && userPassword !== ''){
          setDisabled(false);
      }
  }

  function loginSubmit() {
      for(let i = 0; i < ctx.users.length; i++){
          let current = ctx.users[i].current;
          if(validateEmail(userEmail) === false)return(
              setStatus('Not a valid email address'),
              setTimeout(() => setStatus(''), 3000)
              );
          if(!validate(userPassword, 'user-password')) return;
          // Sets current log in status to false for all
          ctx.users[i].current = false;     
          //  Validates user info and changes current log in status to true
          if(ctx.users[i].email == userEmail && ctx.users[i].password === userPassword){
              setStatus('');
              ctx.users[i].current = true;
              setLogin(false);
              const loggedIn = ctx.users[i];
          }if(ctx.users[i].email !== userEmail && ctx.users[i].password !== userPassword){
              setStatus('Your email address or password is not valid')
              setTimeout(() => setStatus(''), 3000)
          }
          console.log(userEmail);
          console.log(userPassword);
          console.log(ctx.users);
          console.log(ctx.users[i].current);
      };
  }
      return (
          <Card
            bgcolor="info"
            header={
                <div style={{ textAlign: 'center' }}>
                  Log in
                </div>
              }
            status={status}
            body={ login ? (
            <>
            Email Address<br/>
            <input type="input" className="form-control" id="user-email" placeholder="Enter Email" value={userEmail} onChange={(e) => {setUserEmail(e.currentTarget.value.toLowerCase()); validateAll(e.currentTarget.value)}} /><br/>
            Password<br/>
            <input type="password" className="form-control" id="user-password" placeholder="Enter Password" value={userPassword} onChange={(e) => {setUserPassword(e.currentTarget.value); validateAll(e.currentTarget.value)}} /><br/>
            <button type="submit" disabled={disabled} className="btn btn-dark" onClick={loginSubmit}>Log In</button>
            </>):(
              <h5>You are now logged in</h5>
            )}
          />
          
      )
}