function Balance(){
    const ctx = React.useContext(UserContext);
    let balance;

    const getBalance = () => {
        for (let i = 0; i < ctx.users.length; i++){
            if (ctx.users[i].current === true){
                balance = JSON.stringify(ctx.users[i].balance);
                console.log(balance);
            } else {
                let error = `Log in to see your account information`;
                balance = error.replace(/"/g, '');
            }
        }
        
    }
    getBalance();
    return(
        <div><h1>Balance:</h1><h3>{balance}</h3></div>
    )

}

