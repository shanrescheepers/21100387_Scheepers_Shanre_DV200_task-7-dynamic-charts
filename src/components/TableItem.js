
import React from "react";
import Button from '@mui/material/Button';

const TableItem = (props) => {
    let baseUrl = "https://www.youtube.com/watch?v=";
    let youTubeLink = props.vidLink;
    let newLink = baseUrl + youTubeLink;
    let articleUrl = "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html";
    let wikilink = "https://en.wikipedia.org/wiki/DemoSat";


    return (
        <div className="tableItem" key={props.id}>
            <ul> <img src={props.imgUrl} />
                <p>Flight Name: {props.fname}</p>
                <p>Flight Number: {props.fnum}</p>
                <div className="buttonContainer">
                    <li>
                        <Button variant="contained"> <p><a target="_blank" href={newLink}>View Launch</a></p></Button></li>
                    <li> <Button variant="outlined"> <p><a target="_blank" href={props.article}>Read Article</a></p></Button></li>
                    <li> <Button variant="text"> <p><a target="_blank" href={props.article}>Wiki Link</a></p></Button></li>
                </div>
            </ul>
        </div>
    );
}
export default TableItem;