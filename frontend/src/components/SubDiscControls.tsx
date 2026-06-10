import { useEffect, useRef } from 'react';
import './SubDiscControls.scss';
import { SubDiscControlsProps } from '../types/types';
import API from '../api/axios';

export default function SubDiscControls({
  setIsControls,
  controlsBtnRef,
  subdiscId,
  setSubDiscs,
  setIsEditSubdisc
}: SubDiscControlsProps) {
  const controlsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hideControls = (e: PointerEvent) => {
      const target = e.target as Node;

      if (!controlsRef.current?.contains(target) && !controlsBtnRef.current?.contains(target)) {
        setIsControls(false);
      }
    }

    document.addEventListener('pointerup', hideControls);

    return () => document.removeEventListener('pointerup', hideControls);
  }, []);

  const deleteSubdisc = async () => {
    try {
      await API.delete(`/discs/delete/${subdiscId}`);

      setSubDiscs(prev => prev.filter(item => item._id !== subdiscId));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      console.log(errorMessage);
    }
  }

  return (
    <section className="subdisc-controls" ref={controlsRef}>
      <div className="control" onClick={deleteSubdisc}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
        </svg>
        <span>Delete</span>
      </div>
      <div className="control" onClick={() => {
        setIsControls(false);
        setIsEditSubdisc(true);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" />
        </svg>
        <span>Rename</span>
      </div>
      <div className="control">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z" />
        </svg>
        <span>Save to disc</span>
      </div>
      <div className="control" onClick={() => {
        navigator.share({ url: window.location.href});
        setIsControls(false);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M371.8 82.4C359.8 87.4 352 99 352 112L352 192L240 192C142.8 192 64 270.8 64 368C64 481.3 145.5 531.9 164.2 542.1C166.7 543.5 169.5 544 172.3 544C183.2 544 192 535.1 192 524.3C192 516.8 187.7 509.9 182.2 504.8C172.8 496 160 478.4 160 448.1C160 395.1 203 352.1 256 352.1L352 352.1L352 432.1C352 445 359.8 456.7 371.8 461.7C383.8 466.7 397.5 463.9 406.7 454.8L566.7 294.8C579.2 282.3 579.2 262 566.7 249.5L406.7 89.5C397.5 80.3 383.8 77.6 371.8 82.6z" />
        </svg>
        <span>Share</span>
      </div>
    </section>
  );
}