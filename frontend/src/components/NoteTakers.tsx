import { useEffect, useState } from 'react';
import { NoteTakerType, NoteTakersProps, NoteTakerResponse, NoteTakersResponse } from '../types/types';
import './NoteTakers.scss';
import API from '../api/axios';
import { useSearchParams } from 'react-router-dom';

export default function NoteTakers({
  setIsNoteTakers,
  setIsSettings,
  setIsNote,
  setNote
}: NoteTakersProps) {
  const [noteName, setNoteName] = useState<string>('');
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const [noteTakers, setNoteTakers] = useState<NoteTakerType[]>([]);

  const addNoteTaker = async () => {
    try {
      if (noteName.trim()) {
        const newNoteTaker = await API.post<NoteTakerResponse>('/notes/create', {
          videoId,
          title: noteName
        });

        setNoteTakers([...noteTakers, newNoteTaker.data.note]);
        setNoteName('');
      }
    } catch (error) {
      console.log('Something went wrong when trying to connect to the server');
    }
  }

  const deleteNoteTaker = async (noteId: string) => {
    try {
      await API.delete(`/notes/delete/${noteId}`);
      const updatedNoteTakers = noteTakers.filter(noteTaker => noteTaker._id !== noteId);
      setNoteTakers(updatedNoteTakers);
    } catch (error) {
      console.log("Something went wrong when trying to connect to the server");
    }
  }

  useEffect(() => {
    const fetchNoteTakers = async () => {
      try {
        const noteTakers = await API.get<NoteTakersResponse>(`/notes/${videoId}`);

        setNoteTakers(noteTakers.data.notes);
      } catch (error) {
        console.log('Something went wrong when trying to connect to the server');
      }
    }

    fetchNoteTakers();
  }, [])

  return (
    <section className="notetakers-container">
      <header>
        <h4 onClick={() => {
          setIsNoteTakers(false);
          setIsSettings(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
          </svg>
          Notes
        </h4>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" onClick={() => setIsNoteTakers(false)}>
          <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
        </svg>
      </header>
      <section className="notetaker-adder-container">
        <form onSubmit={e => {
          e.preventDefault();
          addNoteTaker()
        }}>
          <input
            autoFocus
            type="text"
            name="notetaker"
            placeholder="Add a new notetaker"
            id="notetaker"
            value={noteName}
            autoComplete="off"
            onChange={e => setNoteName(e.currentTarget.value)}
            onBlur={e => {
              if (e.relatedTarget?.className === 'player-container') e.currentTarget.focus();
            }}
          />
        </form>
      </section>
      <ul className="notetakers-list-container">
        {
          (noteTakers && noteTakers.length)
            ? noteTakers.map(noteTaker => {
              return (
                <li key={noteTaker._id}>
                  <span onClick={() => {
                    setIsNote(true);
                    setIsNoteTakers(false);
                    setNote(noteTaker);
                  }}>{noteTaker.title}</span>
                  <div className="note-controls">
                    <svg className="edit-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" />
                    </svg>
                    <svg className="delete-btn" onClick={() => deleteNoteTaker(noteTaker._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                    </svg>
                  </div>
                </li>
              );
            })
            : "You don't have any notes for this video."
        }
      </ul>
    </section>
  );
}