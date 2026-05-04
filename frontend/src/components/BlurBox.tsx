import { useRef, useState } from 'react';
import { BlurBoxProps } from '../../utils/types';
import './BlurBox.scss';

export default function BlurBox({ blurBoxes }: BlurBoxProps) {
  const blurBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  return (
    <div ref={containerRef} className="blur-box-container" aria-label="blur-box-container">
      {
        blurBoxes &&
        blurBoxes.map(blurBox => {
          return (
            <div 
              key={blurBox}
              className="blur-box" 
              aria-label="blur-box"
              onPointerDown={(e) => {
                blurBoxRef.current = e.currentTarget;
                isDraggingRef.current = true;
                e.currentTarget.style.cursor = 'grabbing';
              }}
              onPointerMove={e => {
                blurBoxRef.current = e.currentTarget;
                const boxRect = blurBoxRef.current.getBoundingClientRect();

                if (isDraggingRef.current) {
                  blurBoxRef.current.style.top = `${Math.floor(boxRect.y) + e.movementY}px`;
                  blurBoxRef.current.style.left = `${Math.floor(boxRect.x) + e.movementX}px`;
                }
              }}
              onPointerUp={e => {
                isDraggingRef.current = false;
                e.currentTarget.style.cursor = 'grab';
              }}
            ></div>
          );
        })
      }
    </div>
  );
}