function Uploader(displayPhoto, handleProfilePhoto, removeProfilePhoto) {
  return <>
    {displayPhoto == null ? (<><input type="file" name="photo" id="photo" onChange={handleProfilePhoto} /><label htmlFor='photo'><i class="fa-solid fa-image "></i></label></>) : (<><button id="photo" onClick={removeProfilePhoto} /><label htmlFor='photo'><i class="fa-solid fa-xmark "></i></label></>)}
  </>;
}
 export default Uploader;