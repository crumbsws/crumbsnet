import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Display from "../../components/display";
import Loading from "../../components/loading";
import { PopupTrigger } from "../../components/popup";
function Board() {


    const { club } = useParams();



    return (
        <>
        <Display type='pins' club={club} />
        </>
    )
}



export default Board;