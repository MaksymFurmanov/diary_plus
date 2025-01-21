const EmpoyeeForm = () => {
    const navigate = useNavigate();

    const [employee, setEmployee] = useEmployeeInput();

    const deleteHandler = () => {
        deleteEmployee(employee);
        navigate("/admin");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (existing) {
            if (employee.manager) setManager(employee.id, employee.department_id);
            updateEmployee(employee);
        } else {
            createEmployee(employee);
        }

        navigate("/admin");
    }
  
  return (
<form className={"EmployeeInfo"}
              onSubmit={submitHandler}
              >
            <Input name={"name"}
                   value={employee.name}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Name and surname:
            </Input>
            <Input name={"date_of_birth"}
                   value={employee.date_of_birth}
                   size={2}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Date of birth:
            </Input>
            
            <DepartmentInput/>
            
            <div className={"h-center"} style={{gap: "2em"}}
            >
                <PositionInput/>
                <Input name={"manager"}
                       type={"checkbox"}
                       size={0}
                       position={"close"}
                       setter={setEmployee}
                       state={employee}
                       checked={employee.manager}>
                    Manager:
                </Input>
            </div>
            
            <div className={"h-end"}>
                <div className={"authorization-data"}>
                    <h2>
                    Login data:
                    </h2>
                    <Input name={"login"}
                           value={employee.login}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Login:
                    </Input>
                    <Input name={"password"}
                           value={employee.password}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Password:
                    </Input>
                </div>
              <MutateButtons deleteHandler={deleteHandler}
              />
                </div>
            </div>
        </form>
    );
}