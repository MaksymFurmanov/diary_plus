const LoginForm = () => {
const submitHandler = (data) => {
        login(data.login, data.password);
    }
    
return (
<form onSubmit={handleSubmit(submitHandler, errorHandler)} className={"LogInPage"}>
                <div className="log-in-background v-center">
                    <h1>PRIHLÁSENIE</h1>
                    <div className={"white-outline login-inputs"}>
                        <div className={"login-input"}>
                            <label>Username</label>
                            <input type={"text"}
                                   autoComplete={"username"}
                                   {...register('login')}/>
                        </div>
                      <PasswordInput/>
                    </div>
                </div>
                <div className={"v-center"}>
                    <Button type={"submit"}>
                        PRIHLÁSIŤ SA
                    </Button>
                </div>
            </form>
);
}

export default LoginForm;