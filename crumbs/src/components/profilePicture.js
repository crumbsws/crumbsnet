
function ProfilePicture(props) {
  
    const user = props.user;
    const size = props.size;
    const src = props.src;
        return (
            <img src={src} loading="lazy" className="rounded" id={size} />
        )
        }

export default ProfilePicture;