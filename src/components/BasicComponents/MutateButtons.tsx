import Button from "./Button";

const MutateButtons = ({id, deleteHandler}: {
    id: string | undefined,
    deleteHandler: (id: string) => void,
}) => {
    return (
        <div className={"MutateButtons"}>
            {id ? (
                <>
                    <Button onClick={() => deleteHandler(id)}>
                        DELETE
                    </Button>
                    <Button type={"submit"}>
                        EDIT
                    </Button>
                </>
            ) : (
                <Button type={"submit"}>
                    ADD
                </Button>
            )}
        </div>
    );
}

export default MutateButtons;