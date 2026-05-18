import { useEffect, useRef } from 'react';
import './Settings.scss';
import { SettingsProps } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function Settings({ setIsSettings, settingsBtnRef }: SettingsProps) {
  const settingsRef = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();

  useEffect(() => {
    const hideSettings = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!settingsRef.current?.contains(target) && !settingsBtnRef.current?.contains(target)) {
        setIsSettings(false);
      } 
    }

    document.addEventListener('pointerup', hideSettings);

    return () => document.removeEventListener('pointerup', hideSettings);
  }, []);

  return (
    <div ref={settingsRef} className="settings">
      <div className="profile-btn">Profile</div>
      <div className="settings-btn">Settings</div>
      <div className="chats-btn">Chats</div>
      <div className="chat-rooms-btn">Chat Rooms</div>
      <div className="logout-btn" onClick={() => {
        localStorage.removeItem('token');
        navigator('/login');
      }}>Log out</div>
    </div>
  );
}