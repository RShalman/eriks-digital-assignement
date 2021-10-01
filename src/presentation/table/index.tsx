import React from "react";
import {useAppStore} from "../../providers/app-store-provider";
import Image from "../image";
import Selections from "../selections";
import ProductCard from "./product-card";

const Table = (): JSX.Element => {
    const appStore = useAppStore();
    const [badges, ...restProducts] = appStore.getTableData();
    const hasSelections = !!appStore.getSelectedProducts()?.length;

    return (
        <div className={"overflow-x-auto"}>
            <table className={"w-full"}>
                <tbody>
                    <tr>
                        <th
                            style={{width: "260px"}}
                            className={`sticky left-0 font-normal leading-10 text-left bg-white border-gray-300 ${
                                !hasSelections ? "" : "border-r"
                            } align-baseline`}
                        >
                            <Selections />
                        </th>
                        {appStore.getSelectedProducts()?.map(({name, listPrice, productImage}) => (
                            <td key={name} className={"pl-3 pr-3"}>
                                <ProductCard
                                    name={name}
                                    price={listPrice}
                                    imgUrl={productImage}
                                    textForPriceTag={"per stuk / excl. btw"}
                                />
                            </td>
                        ))}
                    </tr>
                    {badges && (
                        <tr>
                            <th
                                style={{width: "260px"}}
                                className={
                                    "sticky left-0 font-normal leading-10 text-left bg-white border-gray-300 border-r"
                                }
                            >
                                Keurmerk
                            </th>
                            {badges.values?.map((val, idx) => (
                                <td key={idx} className={"pl-3"}>
                                    <div className={"flex"}>
                                        {val.map((badge, i) => (
                                            <div key={i + badge} className={"w-7 pr-1"}>
                                                <Image url={badge} />
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    )}
                    {[...restProducts]?.map((product) => {
                        return (
                            <tr
                                key={product.tag}
                                className={`${
                                    product.isDifferent ? "bg-gray-200" : "bg-white"
                                } border-gray-300 border-t`}
                            >
                                <th
                                    style={{width: "260px"}}
                                    className={`${
                                        product.isDifferent ? "bg-gray-200" : "bg-white"
                                    } sticky left-0 bg-white border-gray-300 border-t border-r font-normal leading-10 text-left`}
                                >
                                    {product.tag}
                                </th>
                                {product.values.map((val, idx) => (
                                    <td key={idx + val} className={"pl-3 font-bold"}>
                                        {val}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
