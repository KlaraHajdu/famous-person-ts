import React from "react";
import { render } from "@testing-library/react";
import SvgCircle from "./SvgCircle";

describe("SvgCircle component", () => {
    it("renders without crashing", () => {
        render(<SvgCircle />);
    });
});
