import { useEffect, useRef, useState } from 'react';
import { NoteColorsProps } from '../types/types';
import './NoteColors.scss';
import API from '../api/axios';

/*
  NOTE CARD BACKGROUND COLORS:
    LIGHT MODE COLORS:
      [#FFF5EB, #FAFAD2, #EAEFEA, #F2F4F5, #E8D3D8, #E2DDF5, #E8DFD8]
    DARK MODE COLORS:
      [#1C2526, #141A29, #0D1F17, #1C1613, #1E121B, #182226, ]
*/

export default function NoteColors({ 
  noteRef, 
  setIsNoteColors, 
  noteId,
  noteTakers,
  setNoteTakers 
}: NoteColorsProps) {
  const colorsContainerRef = useRef<HTMLElement>(null);
  const [ selectedColor, setSelectedColor ] = useState<string | undefined>(noteRef.current?.dataset.bgColor);
  const colors: string[] = [
    "#285A48", 
    "#232F72", 
    "#202940", 
    "#4B4038", 
    "#1B3C53", 
    "#181C14", 
    "#141A29", 
    "#1C1613", 
    "#1E121B", 
    "#182226"
  ];

  useEffect(() => {
    const hideColorPicker = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !colorsContainerRef.current?.contains(target) && 
        !noteRef.current?.firstChild?.firstChild?.nextSibling?.contains(target)
      ) {
        setIsNoteColors(false);
      }
    }

    document.addEventListener('pointerdown', hideColorPicker);

    return () => document.removeEventListener('pointerdown', hideColorPicker);
  }, []);

  return (
    <section className="note-colors-container" ref={colorsContainerRef}>
      <h3>Pick a color</h3>
      <div className="colors">
        {
          colors.map((color, index) => {
            return (
              <div 
                key={index} 
                className={selectedColor === color ? "color selected" : "color"} 
                aria-label="note color"
                style={{backgroundColor: color}}
                onClick={() => {
                  if (noteRef.current) {
                    noteRef.current.style.backgroundColor = color;
                    noteRef.current.setAttribute('data-bg-color', color);
                    setSelectedColor(color);
                    const updatedNoteTakers = noteTakers.map(noteTaker => {
                      if (noteTaker._id === noteId) {
                        noteTaker.backgroundColor = color;
                        return noteTaker;
                      }

                      return noteTaker;
                    });
                    setNoteTakers([...updatedNoteTakers]);
                    API.put(`/notes/update/${noteId}`, {
                      backgroundColor: color
                    });
                  }
                }}
              ></div>
            )
          })
        }
      </div>
    </section>
  );
}