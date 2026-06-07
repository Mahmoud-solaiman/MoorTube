import { useRef, useState } from 'react';
import './NewSubDisc.scss';
import { NewSubDiscProps, SingleSubdiscResponse } from '../types/types';
import API from '../api/axios';
import { useParams } from 'react-router-dom';

export default function NewSubDisc({
  setIsAddSubdisc,
  setSubDiscs,
  handleErrorMessage
}: NewSubDiscProps) {
  const [ isDisabledBtn, setIsDisabledBtn ] = useState<boolean>(true)
  const [ inputValue, setInputValue ] = useState<string>('');
  const parentId = useParams().id;
  const subdiscAdder = useRef<HTMLElement>(null);

  const addNewSubdisc = async () => {
    try {
      const newSubdisc = await API.post<SingleSubdiscResponse>('/discs/create', {
        parentId,
        name: inputValue
      });

      setSubDiscs(prev => [...prev, newSubdisc.data.disc]);
      setIsAddSubdisc(false);
      handleErrorMessage('Subdisc has been created successfully');

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      handleErrorMessage(errorMessage)
    }
  }

  const hideSubdisc = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as Node;

    if (!subdiscAdder.current?.contains(target)) {
      setIsAddSubdisc(false);
    }
  }
    
  return (
    <div className="subdisc-adder-container" onPointerUp={hideSubdisc}>
      <section className="subdisc-adder" ref={subdiscAdder}>
        <div>
          <svg onClick={() => setIsAddSubdisc(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <title>Close</title>
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
          </svg>
        </div>

        <form onSubmit={e => {
          e.preventDefault();
          addNewSubdisc();
        }}>
          <input 
            type="text" 
            name="subdisc-input" 
            id="subdisc-input" 
            className="subdisc-input" 
            placeholder="Add a new subdisc"
            autoFocus
            autoComplete="off"
            value={inputValue}
            onChange={e => {
              if (e.currentTarget.value.length > 4) {
                setInputValue(e.currentTarget.value);
                setIsDisabledBtn(false);
              } else {
                setInputValue(e.currentTarget.value);
                setIsDisabledBtn(true);
              }
            }}
          />
          <div className="subdisc-btns-container">
            <button title="Cancel" type="button" onClick={() => setIsAddSubdisc(false)}>Cancel</button>
            <button title="Add" type="submit" disabled={isDisabledBtn}>Add</button>
          </div>
        </form>
      </section>
    </div>
  );
}