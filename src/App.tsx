import React, {useEffect} from "react";
import {useGetProducts} from "./api/hooks";
import {useAppStore} from "./providers/app-store-provider";
import MainLayout from "./layouts/main-layout";

const App = (): JSX.Element => {
    const appStore = useAppStore();
    useGetProducts();

    useEffect(() => {
        if (appStore.products && !appStore.filters) {
            appStore.setSelections();
        }
    }, [appStore]);

    return <MainLayout />;
};

export default App;
