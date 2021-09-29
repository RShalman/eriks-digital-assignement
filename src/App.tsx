import React from "react";

const App = (): JSX.Element => (
    <>
        <h1>Hello World</h1>

        <hr />

        <h3 className={"2xl:bg-green-300"}>Environmental variables:</h3>
        <p>
            process.env.PRODUCTION: <b></b>
        </p>
        <p>
            process.env.NAME: <b></b>
        </p>
        <p>
            process.env.VERSION: <b></b>
        </p>
    </>
);

export default App;
