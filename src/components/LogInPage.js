import Button from "./Button";

const LogInPage = () => {
    return <div className={"LogInPage align-center"}>
        <div className="log-in-background">
            <h1>PRIHLÁSENIE</h1>
            <form>
                <div>
                    <label>Meno</label>
                    <input type={"text"}/>
                </div>
                <div>
                    <label>Heslo</label>
                    <input type={"text"}/>
                </div>
            </form>
        </div>
        <Button>PRIHLÁSIŤ SA</Button>
    </div>
}

export default LogInPage