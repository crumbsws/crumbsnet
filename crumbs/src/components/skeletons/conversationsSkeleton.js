import ProfilePicture from "../profilePicture";
function ConversationsSkeleton() {

    return (
        <>
            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                </div>

            </div>
            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait </h4>
                </div>

            </div>
            


        </>




    )
};

export default ConversationsSkeleton;