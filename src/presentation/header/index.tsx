import React from "react";

const Header = ({amount}: {amount?: number | null}): JSX.Element => {
    return (
        <div className={"flex w-full"}>
            <h1 className={"text-blue-800 text-2xl mt-4 mb-6"}>
                {amount ? `${amount} producten vergelijken` : "Selecteer een product"}
            </h1>
        </div>
    );
};

export default Header;
