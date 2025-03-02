import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Display from "../../components/display";
import Loading from "../../components/loading";
import { PopupTrigger } from "../../components/popup";
function Board() {
    const [value, setValue] = useState('Publish');
    const [pinTitle, setPinTitle] = useState('');
    const [pinDescription, setPinDescription] = useState('');

    //optionals
    const [pinContext, setPinContext] = useState('');

    const { club } = useParams();




    const handleSubmit = async (e) => {
        e.preventDefault();
        setValue(<Loading />);

        const formData = new FormData();
        formData.append('title', pinTitle)
        formData.append('description', pinDescription)
        formData.append('context', pinContext)
        formData.append('club', club)
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/pin.php', {
                credentials: 'include',
                method: 'POST',
                body: formData
            })
            const data = await response.json();


            if (data.state === 'success') {
                setValue('Pin Added');
                setPinTitle('');
            }
        } catch (err) {
            console.log(err);
            setValue('An error occured');

        }
    }



    const currentClubs = useSelector((state) => state.user.clubs);
    const isClubJoined = Object.values(currentClubs).some(obj => obj.name === club);

    return (
        <>
            <div className="post" id="tip">
                <h1>Pin</h1>
                <p>Pin an event, announcement or a project to the board.</p>

            </div>


            <div className='post container' >
                {isClubJoined ? (
                    <div className="contained">
                        <PopupTrigger
                            content={
                                <>
                                    <h2>Pin To Club</h2>
                                    <div className='publish post'>
                          
                                    
                                    </div>
                                </>
                            }
                            bottom="Pins are club-specific">

                            <button id="add"><i class="fa-solid fa-plus fa-2x" aria-hidden="true"></i></button>
                        </PopupTrigger>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}



export default Board;