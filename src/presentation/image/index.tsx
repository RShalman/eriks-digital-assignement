import React from "react";

const Image = ({url, fullWidth}: {url: string; fullWidth?: boolean}): JSX.Element => (
    <img style={{width: fullWidth ? "100%" : "auto"}} src={url} />
);

export default Image;
