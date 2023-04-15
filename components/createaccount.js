function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true)
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
      if(!field) {
          setStatus('Not a valid ' + label);
          setTimeout(() => setStatus(''), 3000);
          return false;
      }
      return true;
  }

  function validateEmail(email) {
      console.log(email);
      // check for @
      var atSymbol = email.indexOf("@");
      if(atSymbol < 1) return false;
  
      var dot = email.indexOf(".");
      if(dot <= atSymbol + 2) return false;
  
      // check that the dot is not at the end
      if (dot === email.length - 1) return false;

  
      return true;
  }

  function validatePassword(password) {
      if(password.length < 8){
          setStatus('Password must be at least 8 characters long')
          return false;
      }else{setStatus('');
          return true;}
  }

  function validateAll(name, email, password) {
      if (name !== '')return(
          setDisabled(false)
      );
      if(email !== '')return(
          setDisabled(false)
          );
      if(password !== '')return(
          setDisabled(false)
          );
  }

  function handleCreate() {
      console.log(name,email,password);
      if(!validate(name, 'name')) return;
      if(validateEmail(email) === false)return(
          setStatus('Not a valid email address'),
          setTimeout(() => setStatus(''), 3000)
          );
      if(validatePassword(password) !== true)return(
          setStatus('Not a valid password, remember that your password must be at least 8 characters long'),
          setTimeout(() => setStatus(''), 5000)
          );
      // if(!validate(email, 'email')) return;
      // if(!validate(password, 'password')) return;
      ctx.users.push({name,email,password,balance:100.00,current:false,transactions:[
          <p style={{fontSize: '16px'}}>
                  <br></br>
                  ----------------------------
                  <br></br>
                  Deposited $100.00 upon sign up at
                  <br></br>
                  <br></br>
                  -{new Date().toTimeString()}-<br></br>-{new Date().toDateString()}-
                  <br></br>
                  <br></br>
                  Your new balance is $100.00
                  <br></br>
                  ----------------------------
                  <br></br>
                  </p>
      ]});
      console.log(ctx.users);
      setShow(false);
  }

  function clearForm() {
     setName('');
     setEmail('');
     setPassword('');
     setShow(true);
     setDisabled(true); 
  }

  return (
      <Card
        bgcolor="info"
        header={
            <div style={{ textAlign: 'center' }}>
              Create Account
            </div>
          }
        status={status}
        body={show ? (
        <>
        Name<br/>
        <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => {setName(e.currentTarget.value); ; validateAll(e.currentTarget.value)}} /><br/>
        Email Address<br/>
        <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.currentTarget.value.toLowerCase()); validateAll(e.currentTarget.value.toLowerCase())}} /><br/>
        Password<br/>
        <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => {setPassword(e.currentTarget.value); validateAll(e.currentTarget.value); validatePassword(e.currentTarget.value)}} /><br/>
        <button type="submit" disabled={disabled} className="btn btn-dark" onClick={handleCreate}>Create Account</button>
        </>
      ):(
        <>
        <h5>Success!</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Add Another Account</button>
        </>         
      )}
      />
  )
}