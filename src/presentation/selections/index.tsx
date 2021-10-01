import React from "react";
import {useAppStore} from "../../providers/app-store-provider";

const Selections = (): JSX.Element => {
    const appStore = useAppStore();

    return (
        <div>
            <p className={"text-blue-800 font-bold"}>Je selectie</p>
            <ul style={{maxHeight: "330px", width: "260px"}} className={"overflow-y-auto"}>
                {appStore?.filters?.map((filter) => (
                    <li key={filter.name} className={"flex mt-4"}>
                        <input
                            className={"mt-1.5 mr-3.5 cursor-pointer"}
                            type="checkbox"
                            checked={filter.checked}
                            onChange={() => appStore.onSelect(filter.name)}
                        />
                        <p className={"leading-6 font-bold text-sm"}>{filter.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Selections;
