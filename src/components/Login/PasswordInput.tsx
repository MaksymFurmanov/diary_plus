const PasswordInput = () => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  
  return (
      <div className={"password-input"}>
                            <label>Heslo</label>
                            <input type={passwordToggle ? "text" : "password"}
                                   autoComplete="current-password"
                                   {...register('password')}/>
                            <button onClick={() => setPasswordToggle(!passwordToggle)}>
                                {passwordToggle
                                    ? <IoMdEyeOff/>
                                    : <IoMdEye/>
                                }
                            </button>
                        </div>
    );
}