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

    const user = useSelector((state) => state.user.data[0].name);

    function handlePinTitle(e) {
        setPinTitle(e.target.value);
    }
    function handlePinDescription(e) {
        setPinDescription(e.target.value);
    }
    function handlePinContext(e) {
        setPinContext(e.target.value);
    }


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
            <div className="post tip">
                <h1>Pin</h1>
                <p>Pin an event, announcement or a project to the board.</p>
            
            {isClubJoined ? (
                <>
                    <PopupTrigger
                        content={
                            <>
                                <h2>Pin To Club</h2>
                                <div className='publish post'>
                                    <form method="post">
                                        <input type="text" onChange={handlePinTitle} value={pinTitle} placeholder="Pin title" maxLength='25' required />
                                        <input type="text" onChange={handlePinDescription} value={pinDescription} placeholder="Pin description" maxLength='100' required />

                                        <input type="text" onChange={handlePinContext} value={pinContext} placeholder="Add additional context" />

                                        <input type="submit" value={value} onClick={handleSubmit} />
                                    </form>
                                </div>
                            </>
                        }
                        bottom="Pins are club-specific">

                        <button>Pin</button>
                    </PopupTrigger>
                </>
            ) : (<></>)}
            </div>

            <div className='post container' >
            <p>In development</p>
            </div>
        </>
    )
}



export default Board;