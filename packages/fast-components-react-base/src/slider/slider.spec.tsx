import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import Slider, {
    SliderClassNameContract,
    SliderThumb,
    SliderUnhandledProps,
} from "./slider";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { DisplayNamePrefix } from "../utilities";
import { SliderMode, SliderOrientation } from "./slider.props";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const managedClasses: SliderClassNameContract = {
    slider: "slider",
    slider_layoutRegion: "slider_layoutRegion",
    slider_track: "slider_track",
    slider_backgroundTrack: "slider_backgroundTrack",
    slider_foregroundTrack: "slider_foregroundTrack",
    slider__horizontal: "slider__horizontal",
    slider__vertical: "slider__vertical",
    slider_thumb: "slider_thumb",
    slider_thumb__upperValue: "slider_thumb__upperValue",
    slider_thumb__lowerValue: "slider_thumb__lowerValue",
    slider__disabled: "slider__disabled",
    slider__rtl: "slider__rtl",
    slider__modeSingle: "slider__modeSingle",
    slider__modeAdjustLower: "slider__modeAdjustLower",
    slider__modeAdjustUpper: "slider__modeAdjustUpper",
    slider__modeAdjustBoth: "slider__modeAdjustBoth",
};

/* tslint:disable:no-string-literal */

describe("Slider", (): void => {
    const map: any = {};
    // tslint:disable-next-line:no-shadowed-variable
    window.addEventListener = jest.fn((event: string, callback: any) => {
        map[event] = callback;
    });

    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(Slider as any).name}`).toBe(Slider.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Slider />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: SliderUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<Slider {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("hidden input element has props populated", (): void => {
        const rendered: any = mount(<Slider name="testName" form="testForm" />);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("50");
        expect(input.prop("name")).toBe("testName");
        expect(input.prop("form")).toBe("testForm");
    });

    test("should have correct default values in default single value mode", (): void => {
        const rendered: any = mount(<Slider />);

        expect(rendered.state("upperValue")).toBe(50);
        expect(rendered.state("lowerValue")).toBe(50);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("50");
    });

    test("should have correct default values in adjust upper value mode", (): void => {
        const rendered: any = mount(<Slider mode={SliderMode.adustUpperValue} />);

        expect(rendered.state("upperValue")).toBe(50);
        expect(rendered.state("lowerValue")).toBe(0);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("50");
    });

    test("should have correct default values in adjust lower value mode", (): void => {
        const rendered: any = mount(<Slider mode={SliderMode.adustLowerValue} />);

        expect(rendered.state("upperValue")).toBe(100);
        expect(rendered.state("lowerValue")).toBe(50);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("50");
    });

    test("should have correct default values in adjust both values mode", (): void => {
        const rendered: any = mount(<Slider mode={SliderMode.adjustBoth} />);

        expect(rendered.state("upperValue")).toBe(60);
        expect(rendered.state("lowerValue")).toBe(40);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("[40,60]");
    });

    test("number as initial value prop is applied in single value mode", (): void => {
        const rendered: any = mount(
            <Slider initialValue={42} mode={SliderMode.singleValue} />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(42);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("42");
    });

    test("range as initial value prop is applied in single value mode", (): void => {
        const rendered: any = mount(
            <Slider
                initialValue={{ minValue: 24, maxValue: 42 }}
                mode={SliderMode.singleValue}
            />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(24);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("42");
    });

    test("number as initial value prop is applied in adjust upper value mode", (): void => {
        const rendered: any = mount(
            <Slider initialValue={42} mode={SliderMode.adustUpperValue} />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(0);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("42");
    });

    test("range as initial value prop is applied in adjust upper value mode", (): void => {
        const rendered: any = mount(
            <Slider
                initialValue={{ minValue: 24, maxValue: 42 }}
                mode={SliderMode.adustUpperValue}
            />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(24);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("42");
    });

    test("number as initial value prop is applied in adjust lower value mode", (): void => {
        const rendered: any = mount(
            <Slider initialValue={42} mode={SliderMode.adustLowerValue} />
        );

        expect(rendered.state("upperValue")).toBe(100);
        expect(rendered.state("lowerValue")).toBe(42);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("42");
    });

    test("range as initial value prop is applied in adjust lower value mode", (): void => {
        const rendered: any = mount(
            <Slider
                initialValue={{ minValue: 24, maxValue: 42 }}
                mode={SliderMode.adustLowerValue}
            />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(24);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("24");
    });

    test("number as initial value prop is applied in adjust both values mode", (): void => {
        const rendered: any = mount(
            <Slider initialValue={42} mode={SliderMode.adjustBoth} />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(42);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("[42,42]");
    });

    test("range as initial value prop is applied in adjust both values mode", (): void => {
        const rendered: any = mount(
            <Slider
                initialValue={{ minValue: 24, maxValue: 42 }}
                mode={SliderMode.adjustBoth}
            />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(24);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("[24,42]");
    });

    test("value is applied and overrides initial value (controlled mode)", (): void => {
        const rendered: any = mount(
            <Slider
                initialValue={{ minValue: 0, maxValue: 100 }}
                value={{ minValue: 24, maxValue: 42 }}
                mode={SliderMode.adjustBoth}
            />
        );

        expect(rendered.state("upperValue")).toBe(42);
        expect(rendered.state("lowerValue")).toBe(24);

        const input: any = rendered.find("input");
        expect(input.prop("value")).toEqual("[24,42]");
    });

    test("initial value respects step", (): void => {
        const rendered: any = mount(<Slider mode={SliderMode.singleValue} step={20} />);

        expect(rendered.state("upperValue")).toBe(40);
        expect(rendered.state("lowerValue")).toBe(40);
    });

    test("one thumb is rendered in singleValue mode", (): void => {
        const rendered: any = mount(
            <Slider managedClasses={managedClasses} mode={SliderMode.singleValue} />
        );

        const upperThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__upperValue}`
        );
        expect(upperThumb).toHaveLength(1);

        const lowerThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__lowerValue}`
        );
        expect(lowerThumb).toHaveLength(0);
    });

    test("only upper thumb is rendered in adjust upper value mode", (): void => {
        const rendered: any = mount(
            <Slider managedClasses={managedClasses} mode={SliderMode.adustUpperValue} />
        );

        const upperThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__upperValue}`
        );
        expect(upperThumb).toHaveLength(1);

        const lowerThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__lowerValue}`
        );
        expect(lowerThumb).toHaveLength(0);
    });

    test("only lower thumb is rendered in adjust lower value mode", (): void => {
        const rendered: any = mount(
            <Slider managedClasses={managedClasses} mode={SliderMode.adustLowerValue} />
        );

        const upperThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__upperValue}`
        );
        expect(upperThumb).toHaveLength(0);

        const lowerThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__lowerValue}`
        );
        expect(lowerThumb).toHaveLength(1);
    });

    test("two thumbs are rendered in adjustBoth mode", (): void => {
        const rendered: any = mount(
            <Slider managedClasses={managedClasses} mode={SliderMode.adjustBoth} />
        );

        const upperThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__upperValue}`
        );
        expect(upperThumb).toHaveLength(1);

        const lowerThumb: any = rendered.find(
            `.${managedClasses.slider_thumb__lowerValue}`
        );
        expect(lowerThumb).toHaveLength(1);
    });

    test("custom thumb render function is called", (): void => {
        const thumbRenderFn: any = jest.fn();
        thumbRenderFn.mockReturnValue("Test");

        const rendered: any = mount(
            <Slider thumb={thumbRenderFn} mode={SliderMode.adjustBoth} />
        );

        expect(thumbRenderFn).toHaveBeenCalledTimes(2);
    });

    test("horizontal orientation class applied by default", (): void => {
        const rendered: any = shallow(<Slider managedClasses={managedClasses} />);

        expect(rendered.prop("className")).toContain(managedClasses.slider__horizontal);
    });

    test("vertical orientation class applied when orientation set to vertical", (): void => {
        const rendered: any = shallow(
            <Slider
                orientation={SliderOrientation.vertical}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.prop("className")).toContain(managedClasses.slider__vertical);
    });

    test("single value mode class applied by default", (): void => {
        const rendered: any = shallow(<Slider managedClasses={managedClasses} />);

        expect(rendered.prop("className")).toContain(managedClasses.slider__modeSingle);
    });

    test("adjust upper value mode class applied when that mode is set", (): void => {
        const rendered: any = shallow(
            <Slider mode={SliderMode.adustUpperValue} managedClasses={managedClasses} />
        );

        expect(rendered.prop("className")).toContain(
            managedClasses.slider__modeAdjustUpper
        );
    });

    test("adjust lower value mode class applied when that mode is set", (): void => {
        const rendered: any = shallow(
            <Slider mode={SliderMode.adustLowerValue} managedClasses={managedClasses} />
        );

        expect(rendered.prop("className")).toContain(
            managedClasses.slider__modeAdjustLower
        );
    });

    test("adjust both values mode class applied when that mode is set", (): void => {
        const rendered: any = shallow(
            <Slider mode={SliderMode.adjustBoth} managedClasses={managedClasses} />
        );

        expect(rendered.prop("className")).toContain(
            managedClasses.slider__modeAdjustBoth
        );
    });

    test("disabled class applied when disabled prop is set", (): void => {
        const rendered: any = shallow(
            <Slider disabled={true} managedClasses={managedClasses} />
        );

        expect(rendered.prop("className")).toContain(managedClasses.slider__disabled);
    });

    test("arrow key presses start and stop incrementing", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(<Slider managedClasses={managedClasses} />, {
            attachTo: container,
        });

        const thumb: any = rendered.find(`.${managedClasses.slider_thumb__upperValue}`);
        expect(rendered.state("isIncrementing")).toBe(false);
        thumb.simulate("keydown", { keyCode: KeyCodes.arrowDown });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(-1);
        expect(rendered.state("activeThumb")).toBe(SliderThumb.upperThumb);
        map.keyup({ keyCode: KeyCodes.arrowDown });
        expect(rendered.state("isIncrementing")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.arrowRight });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(1);
        map.keyup({ keyCode: KeyCodes.arrowRight });
        expect(rendered.state("isIncrementing")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.arrowUp });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(1);
        map.keyup({ keyCode: KeyCodes.arrowUp });
        expect(rendered.state("isIncrementing")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.arrowLeft });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(-1);
        map.keyup({ keyCode: KeyCodes.arrowLeft });
        expect(rendered.state("isIncrementing")).toBe(false);

        document.body.removeChild(container);
    });

    test("page up/down key presses don't have an effect when no page step is set", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(<Slider managedClasses={managedClasses} />, {
            attachTo: container,
        });

        const thumb: any = rendered.find(`.${managedClasses.slider_thumb__upperValue}`);
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);
        thumb.simulate("keydown", { keyCode: KeyCodes.pageDown });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);
        map.keyup({ keyCode: KeyCodes.pageDown });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.pageUp });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);
        map.keyup({ keyCode: KeyCodes.pageUp });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);

        document.body.removeChild(container);
    });

    test("page up/down key presses start incrementing when page step is set", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);

        const rendered: any = mount(
            <Slider pageStep={10} managedClasses={managedClasses} />,
            {
                attachTo: container,
            }
        );

        const thumb: any = rendered.find(`.${managedClasses.slider_thumb__upperValue}`);
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.pageDown });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("usePageStep")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(-1);
        map.keyup({ keyCode: KeyCodes.pageDown });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);

        thumb.simulate("keydown", { keyCode: KeyCodes.pageUp });
        expect(rendered.state("isIncrementing")).toBe(true);
        expect(rendered.state("usePageStep")).toBe(true);
        expect(rendered.state("incrementDirection")).toBe(1);
        map.keyup({ keyCode: KeyCodes.pageUp });
        expect(rendered.state("isIncrementing")).toBe(false);
        expect(rendered.state("usePageStep")).toBe(false);

        document.body.removeChild(container);
    });

    test("convertPixelToPercent function test - horizontal", (): void => {
        const rendered: any = mount(
            <Slider
                orientation={SliderOrientation.horizontal}
                mode={SliderMode.adjustBoth}
                managedClasses={managedClasses}
            />
        );

        rendered.instance().barMinPixel = 0;
        rendered.instance().rangeInPixels = 1000;

        expect(rendered.instance()["convertPixelToPercent"](0)).toBe(0);
        expect(rendered.instance()["convertPixelToPercent"](100)).toBe(0.1);
        expect(rendered.instance()["convertPixelToPercent"](1000)).toBe(1);
    });

    test("convertPixelToPercent function test - vertical", (): void => {
        const rendered: any = mount(
            <Slider
                orientation={SliderOrientation.vertical}
                mode={SliderMode.adjustBoth}
                managedClasses={managedClasses}
            />
        );

        rendered.instance().barMinPixel = 1000;
        rendered.instance().rangeInPixels = 1000;

        expect(rendered.instance()["convertPixelToPercent"](0)).toBe(1);
        expect(rendered.instance()["convertPixelToPercent"](100)).toBe(0.9);
        expect(rendered.instance()["convertPixelToPercent"](1000)).toBe(0);
    });

    test("getConstrainedRange function test", (): void => {
        const rendered: any = mount(
            <Slider
                range={{
                    minValue: 0,
                    maxValue: 100,
                }}
                constrainedRange={{
                    minValue: 10,
                    maxValue: 90,
                }}
                mode={SliderMode.singleValue}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.instance()["getConstrainedRange"](false)).toStrictEqual({
            minValue: 10,
            maxValue: 90,
        });
    });

    test("valueAsRange function test - singleValue", (): void => {
        const rendered: any = mount(
            <Slider
                range={{
                    minValue: 0,
                    maxValue: 100,
                }}
                mode={SliderMode.singleValue}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.instance()["valueAsRange"](50)).toStrictEqual({
            minValue: 50,
            maxValue: 50,
        });
    });

    test("valueAsRange function test - lowerValue", (): void => {
        const rendered: any = mount(
            <Slider
                range={{
                    minValue: 0,
                    maxValue: 100,
                }}
                mode={SliderMode.adustLowerValue}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.instance()["valueAsRange"](50)).toStrictEqual({
            minValue: 50,
            maxValue: 100,
        });
    });

    test("valueAsRange function test - upperValue", (): void => {
        const rendered: any = mount(
            <Slider
                range={{
                    minValue: 0,
                    maxValue: 100,
                }}
                mode={SliderMode.adustUpperValue}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.instance()["valueAsRange"](50)).toStrictEqual({
            minValue: 0,
            maxValue: 50,
        });
    });

    // tslint:disable-next-line:no-shadowed-variable
    window.removeEventListener = jest.fn((event: string, callback: any) => {
        map[event] = callback;
    });
});
