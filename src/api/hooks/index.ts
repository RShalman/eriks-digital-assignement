import {useCallback, useEffect} from "react";
import api from "../index";
import {IProducts} from "../index.d";
import {sleep} from "../../utils";
import {useAppStore} from "../../providers/app-store-provider";

export const useGetProducts = (): void => {
    const appStore = useAppStore();

    const getProductsAndSaveToStore = useCallback(async () => {
        if (!appStore.products) {
            appStore.setIsLoading(true);

            //Just to make alike real project delay behavior when obtaining data from backend
            await sleep(2000);
            const {products}: IProducts = await api().getProducts();
            if (products) appStore.setProducts(products);

            appStore.setIsLoading(false);
        }
    }, [appStore]);

    useEffect(() => {
        getProductsAndSaveToStore();
    }, [getProductsAndSaveToStore]);
};
