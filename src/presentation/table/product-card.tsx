import React from "react";
import Image from "../image";
import {useAppStore} from "../../providers/app-store-provider";
import Trash from "../../assets/trash.svg";

const ProductCard = ({
    name,
    price,
    imgUrl,
    textForPriceTag
}: Record<string, string>): JSX.Element => {
    const appStore = useAppStore();

    return (
        <div style={{height: "420px"}} className={"w-full pr-7"}>
            <div
                className={"h-5 w-5 ml-auto mr-3 cursor-pointer"}
                onClick={() => appStore.onSelect(name)}
            >
                <Trash style={{fill: "var(--tw-ring-color)"}} />
            </div>
            <div style={{width: "240px", height: "240px"}}>
                <Image url={imgUrl} fullWidth />
            </div>
            <p className={"mt-6 text-sm font-bold text-blue-600"}>{name}</p>
            <div className={"pb-4 mt-5  mb-6  border-gray-300 border-b"}>
                <p className={"text-xl font-bold"}>{price}</p>
                <p className={"text-xs font-normal text-gray-300"}>{textForPriceTag}</p>
            </div>
        </div>
    );
};

export default ProductCard;
