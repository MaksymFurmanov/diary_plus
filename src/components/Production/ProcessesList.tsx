import {Fragment} from "react";
import {ReactSVG} from 'react-svg'
import Process from "./Process";
import {ProductionProcess} from "../../types";

const ProcessesList = ({production_processes, orderId, current_id}: {
    production_processes: ProductionProcess[],
    orderId: string,
    current_id: string | null
}) => {
    const lastProcess = production_processes.length;

    const nextProcess = current_id !== null
        ? production_processes.find((production_processes: ProductionProcess) =>
            production_processes.id === current_id
        )
        : null;

    return (
        <>
            {production_processes.map((production_process, index) => (
                <Fragment key={index}>
                    <Process
                        key={`process-${index}`}
                        orderId={orderId}
                        production_process={production_process}
                        isDone={!!nextProcess && nextProcess.queue > production_process.queue}
                    />
                    {production_process.queue !== lastProcess - 1 &&
                        <ReactSVG src={"../../assets/images/arrow_wave.svg"}
                                  className={"arrow"}
                                  key={`arrow-${index}`}
                        />
                    }
                </Fragment>
            ))}
        </>
    );
}

export default ProcessesList;