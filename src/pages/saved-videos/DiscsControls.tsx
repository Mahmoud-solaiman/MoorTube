import { DiscsControlsProps, DiscType } from '../../../utils/types';
import './DiscsControls.scss';

export default function DiscsControls({ 
    discsRef, 
    videoId, 
    setOpenControls, 
    setOpenDiscs,
    handleErrorMessage
  }: DiscsControlsProps) {
  const currentDiscsStorage = localStorage.getItem('current-discs');
  const discStorage = localStorage.getItem('disc');
  const currentDiscs: DiscType[] = currentDiscsStorage && JSON.parse(currentDiscsStorage);
  const disc: DiscType = discStorage && JSON.parse(discStorage);
  const updatedCurrentDiscs = currentDiscs.filter(item => item.id !== disc.id);

  function addVideoToNewDisc(discId: string) {
    currentDiscs.map(currentDisc => {
      if (currentDisc.id === discId) {
        const video = currentDisc.items.find(item => item === videoId);

        if (!video) {
          currentDisc.items.unshift(videoId);
          handleErrorMessage('Added successfully!');
          localStorage.setItem('current-discs', JSON.stringify(currentDiscs));
        
        } else {
          handleErrorMessage('Video already exists in this disc!');
        }
      }
    })
    setOpenControls(null);
    setOpenDiscs(null);
  }
  return (
    <div className="discs-container" ref={discsRef}>
      {
        updatedCurrentDiscs.length 
          ? updatedCurrentDiscs.map(item => {
            return (
              <h3 
                title={item.name} 
                key={item.id}
                onClick={() => addVideoToNewDisc(item.id)}
              >{item.name.length >= 18 ? `${item.name.slice(0, 17)}...` : item.name }</h3>
            );
          })
          : "You have no other discs!"
      }
    </div>
  );
}