import {IProducts} from "./index.d";

export type IApi = ReturnType<typeof api>;

const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
});

const api = (): {getProducts} => ({
    async getProducts(): Promise<IProducts | Record<string, unknown>> {
        try {
            const response = await fetch(
                "https://5f993a3050d84900163b845a.mockapi.io/eriks/products/all",
                {headers}
            );
            return response.json();
        } catch (e) {
            console.error("GET_PRODUCTS_REQUEST", e);
            return {};
        }
    }
});

export default api;
