import React from "react";
import Header from "../presentation/header";
import {useAppStore} from "../providers/app-store-provider";
import Table from "../presentation/table";
import Spinner from "../presentation/spinner";

const MainLayout = (): JSX.Element => {
    const appStore = useAppStore();
    const selectedProducts = appStore.getSelectedProducts();

    return (
        <main className={"w-full h-screen flex flex-row flex-wrap overflow-hidden"}>
            {appStore.isLoading ? (
                <div className={"w-full h-screen flex justify-center items-center"}>
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className={"w-full ml-12 mr-12 mb-5"}>
                        <Header amount={selectedProducts?.length} />
                        <Table />
                    </div>
                    <hr className={"w-full self-end border-b-4 border-blue-700"} />
                </>
            )}
        </main>
    );
};

export default MainLayout;
