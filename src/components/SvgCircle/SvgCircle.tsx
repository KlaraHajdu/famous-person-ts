import React from "react";
import { StyledPath, SvgCircleStyle } from "./styled";

export default function SvgCircle(props: any) {
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const describeArc = (x: number, y:number, radius: number, startAngle: number, endAngle: number) => {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

        return d;
    };

    return (
        <SvgCircleStyle>
            <svg className="countdown-svg">
                <StyledPath
                    d={describeArc(50, 50, 48, 0, props.radius)}
                />
            </svg>
        </SvgCircleStyle>
    );
}
