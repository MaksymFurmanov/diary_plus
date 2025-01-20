import {Fragment} from "react";
import ArrowImg from "../../../public/arrow_wave.svg";
import ProductionProcess from "./ProductionProcess";

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

    return production_processes.map((production_process, index) => (
        <Fragment key={index}>
            <ProductionProcess
                key={`process-${index}`}
                orderId={orderId}
                production_process={production_process}
                isDone={!!nextProcess && nextProcess.queue > production_process.queue}
            />
            {production_process.queue !== lastProcess - 1 &&
                <ArrowImg className={"arrow"}
                          key={`arrow-${index}`}/>
            }
        </Fragment>
    ));
}

export default ProcessesList;