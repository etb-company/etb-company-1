import { useEffect, useRef, useState } from "react"

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
}
  
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ")

    return d;       
}

export default function Spiner({options}) {
    const svg = useRef(null)
    const svgStyle = {animation: `spinerAnim cubic-bezier(0.5, 0.15, 0.5, 0.85) ${options.speed}s infinite forwards`}
    
    const style = {
        width: options.width + 'px',
        height: options.width + 'px',
    }
    const spanStyle1 = {
        borderColor: options.circleColor,
        borderWidth: options.borderWidth
    }
    useEffect(() => {
        svg.current.setAttribute("d", describeArc(options.width/2, options.width/2, ((options.width - options.borderWidth) / 2), 0, ((options.length * 360) / 100)));
    }, [])

    return <div className="spiner" style={style}>
        <span style={spanStyle1}></span>
        <svg width={options.width} height={options.width} style={svgStyle}>
            <path ref={svg} fill="none" stroke={options.spinerColor} strokeWidth={options.borderWidth} strokeLinecap="round"/>
        </svg>
    </div>
}