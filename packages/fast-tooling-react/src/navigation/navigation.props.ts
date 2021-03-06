import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { ChildOptionItem } from "../data-utilities";
import { NavigationClassNameContract } from "./navigation.style";

export enum NavigationDataType {
    object = "object",
    array = "array",
    children = "children",
    childrenItem = "childrenItem",
}

export interface NavigationState {
    /**
     * The navigation data
     */
    navigation: TreeNavigation;

    /**
     * The open items tracked by data location
     */
    openItems: string[];

    /**
     * The current active item
     */
    activeItem: null | string;
}

export interface TreeNavigation {
    /**
     * The navigation item text
     */
    text: string;

    /**
     * The data location of this item
     */
    dataLocation: string;

    /**
     * The data type, this will result in a different
     * icons used
     */
    type: NavigationDataType;

    /**
     * The items belonging to the text as a dropdown
     */
    items?: TreeNavigation[] | void;
}

export interface NavigationUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationHandledProps
    extends ManagedClasses<NavigationClassNameContract> {
    /**
     * The JSON schema
     */
    schema: any;

    /**
     * The data mapped to the schema
     */
    data: any;

    /**
     * The React child options
     */
    childOptions?: ChildOptionItem[];

    /**
     * The data location if the component is controlled
     */
    dataLocation?: string;

    /**
     * The location update
     */
    onLocationUpdate?: (dataLocation: string) => void;
}

export type NavigationProps = NavigationHandledProps & NavigationUnhandledProps;
