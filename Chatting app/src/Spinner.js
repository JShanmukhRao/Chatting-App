import React from 'react'

const { Dimmer, Loader } = require("semantic-ui-react");
const Spinner =()=>{
    return(
        <Dimmer active>
            <Loader size="massive" content="Preparing for Chat..."></Loader>
        </Dimmer>
    );
}
export default Spinner;