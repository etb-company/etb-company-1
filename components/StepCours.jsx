import { useEffect, useState } from "react"

export default function StepCours({data}){
    const steps = []

    data.forEach((step, k) => {
        const st = <div key={k}>
            {step.complited === true? <span className="step-complited"></span>: <span className="step-uncomplited">{k + 1}</span>}
            <span>{step.name}</span>
        </div>
        steps.push(st)
    })

    return <div id="step-cours">
        {steps}
    </div>
}