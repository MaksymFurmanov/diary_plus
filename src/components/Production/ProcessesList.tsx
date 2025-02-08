import {Fragment} from "react";
import {ReactSVG} from 'react-svg'
import Process from "./Process";
import {ProductionProcess} from "../../types";

const ProcessesList = ({production_processes, orderId, lastDoneId}: {
    production_processes: ProductionProcess[],
    orderId: string,
    lastDoneId: string | null
}) => {
    const lastProcess = production_processes.length;

    const lastDoneProcess = lastDoneId !== null
        ? production_processes.find((production_processes: ProductionProcess) =>
            production_processes.id === lastDoneId
        )
        : undefined;

    const nextProcess = lastDoneProcess
        ? production_processes.find((production_processes) =>
        production_processes.queue === lastDoneProcess.queue + 1)
        : production_processes.find((production_processes) =>
            production_processes.queue === 0);

    return (
        <>
            {production_processes.map((production_process, index) => (
                <Fragment key={index}>
                    <Process
                        key={`process-${index}`}
                        orderId={orderId}
                        production_process={production_process}
                        nextProcessQueue={nextProcess?.queue}
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