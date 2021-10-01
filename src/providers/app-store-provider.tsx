import React, {ReactElement, useCallback, useState} from "react";
import {IProduct, IProducts} from "../api/index.d";

type IAppState = ReturnType<typeof initialState>;
type IAppStateKeys = keyof IAppState;

type ISetField = <F extends IAppStateKeys, V extends IAppState[IAppStateKeys]>(
    fieldName: F,
    value: V
) => void;

export type IFilterTableData = {
    tag: string;
    values: string[] | string[][];
    isDifferent: boolean;
};

export type IAppContext = IAppState & {
    getSelectedProducts: () => IProduct[];
    getTableData: () => IFilterTableData[];
    setField: ISetField;
    setIsLoading: (v: boolean) => void;
    setProducts: (v: IAppState["products"]) => void;
    setSelections: () => void;
    onSelect: (n: string) => void;
};

const storeContext = React.createContext<IAppContext>(null as unknown as IAppContext);

const initialState = () => ({
    isLoading: false,
    filters: null as {name: string; checked: boolean}[],
    products: null as unknown as IProducts["products"]
});

const NOT_USED_PRODUCT_FIELDS = [
    "salePrice",
    "manufacturerName",
    "grossPrice",
    "BUP_UOM",
    "BUP_Value",
    "uom",
    "productImage",
    "BUP_Conversion",
    "minQuantity",
    "manufacturerImage",
    "name",
    "sku",
    "listPrice",
    "channel",
    "display",
    "atp"
];

export const AppStoreProvider = ({
    children
}: {
    children: ReactElement | ReactElement[];
}): ReactElement => {
    const [appState, setAppState] = useState<IAppState>(initialState());

    const getSelectedProducts = useCallback(() => {
        return appState?.products?.filter((product) => {
            return appState?.filters?.find((selection) => selection.name === product.name)?.checked;
        });
    }, [appState?.filters, appState?.products]);

    const getTableData = useCallback(() => {
        return (
            getSelectedProducts()?.reduce((acc, cur) => {
                const filteredKeys = Object.keys(cur)
                    .filter((key) => !NOT_USED_PRODUCT_FIELDS.includes(key))
                    .sort()
                    .sort((a) => (a !== "badges" ? 1 : -1));

                acc = !acc.length
                    ? filteredKeys.map((key) => ({
                          tag: key,
                          values: [key === "badges" ? cur[key].split("|") : cur[key]]
                      }))
                    : acc.map(({tag, values}) => ({
                          tag,
                          values: [...values, tag === "badges" ? cur[tag].split("|") : cur[tag]],
                          isDifferent: values.some((v) => v !== cur[tag])
                      }));
                return acc;
            }, []) ?? []
        );
    }, [getSelectedProducts]);

    const setField: ISetField = useCallback(
        (fieldName, value) =>
            setAppState((prev) => {
                const prevFieldValue = prev[fieldName];
                const comparablePrevValue = JSON.stringify(prevFieldValue);
                const comparableNewValue = JSON.stringify(value);

                return comparableNewValue === comparablePrevValue
                    ? prev
                    : {...prev, [fieldName]: value};
            }),
        [setAppState]
    );

    const setIsLoading = useCallback((value: boolean) => setField("isLoading", value), [setField]);

    const setProducts = useCallback(
        (value: IAppState["products"]) => setField("products", value),
        [setField]
    );

    const setSelections = useCallback(
        () =>
            setField(
                "filters",
                appState?.products?.map((product) => ({
                    name: product.name,
                    checked: false
                }))
            ),
        [appState?.products, setField]
    );

    const onSelect = useCallback(
        (name: string) => {
            setField(
                "filters",
                appState?.filters?.map((filter) =>
                    filter.name === name ? {...filter, checked: !filter.checked} : filter
                )
            );
        },
        [appState?.filters, setField]
    );

    return (
        <storeContext.Provider
            value={{
                ...appState,
                getSelectedProducts,
                getTableData,
                setField,
                setIsLoading,
                setProducts,
                setSelections,
                onSelect
            }}
        >
            {children}
        </storeContext.Provider>
    );
};

export const useAppStore = (): IAppContext | never => {
    const store = React.useContext(storeContext);
    if (!store) {
        throw new Error("useAppStore must be used within a AppStoreProvider.");
    }
    return store;
};
