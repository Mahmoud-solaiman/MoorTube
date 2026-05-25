import { useState } from 'react';
import { NoteProps } from '../types/types';
import './Note.scss';
import API from '../api/axios';

export default function Note({
  setIsNote,
  setIsNoteTakers,
  note
}: NoteProps) {
  const [ description, setDescription ] = useState<string | undefined>(note?.description);
  const [ savedDescription, setSavedDescription ] = useState<string | undefined>(note?.description);
  const [ isBtnDisabled, setIsBtnDisabled ] = useState<boolean>(true);

  const updateNote = async () => {
    try {
      await API.put(`/notes/update/${note?._id}`, {
        description
      });
      setSavedDescription(description);
      setIsBtnDisabled(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="note-container">
      <header>
        <h4 onClick={() => {
          setIsNote(false);
          setIsNoteTakers(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
          </svg>
          {note?.title}
        </h4>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" onClick={() => setIsNote(false)}>
          <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
        </svg>
      </header>
      <div className="note-field-container">
        <textarea 
          onBlur={e => {
          if (e.relatedTarget?.className === 'player-container') e.currentTarget.focus();
        }} 
        name="note" 
        id="note-field" 
        value={description} 
        onChange={e => {
          const newDescription = e.currentTarget.value; 
          setDescription(newDescription); 
          
          if (newDescription === savedDescription) {
            setIsBtnDisabled(true);
          } else {
            setIsBtnDisabled(false);
          }
        }} 
        placeholder="Write your notes here..."
        ></textarea>
        
        <button type="button" className="save-btn" onClick={updateNote} disabled={isBtnDisabled}>save</button>
      </div>
    </section>
  );
}