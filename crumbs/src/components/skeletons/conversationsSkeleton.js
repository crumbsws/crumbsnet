import ProfilePicture from "../profilePicture";
function ConversationsSkeleton() {

    return (
        <>
            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                    <p className='skeleton'>loading</p>
                </div>

            </div>
            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait wait</h4>
                    <p className='skeleton'>loading wait</p>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait</h4>
                    <p className='skeleton'>loading</p>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait wait</h4>
                    <p className='skeleton'>loading</p>
                </div>

            </div>

            <div className='post conversation-container' >
                <ProfilePicture size='xs' className='skeleton' />
                <div>
                    <h4 className='skeleton'>loading wait wait</h4>
                    <p className='skeleton'>loading wait</p>
                </div>

            </div>
            


        </>




    )
};

export default ConversationsSkeleton;