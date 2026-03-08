import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { formatPrayerTime } from '../../../formatting';
import './PrayerTimesPanel.scss';

function PrayerTimesPanel() {
  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const [ prayerTimesData, setPrayerTimesData ] = useState(null);
  const [ nextPrayer, setNextPrayer ] = useState(null);
  const [ hour, setHour ] = useState(0);
  const [ minute, setMinute ] = useState(0);
  const [ second, setSecond ] = useState(0);
  const [ coords, setCoords ] = useState({});

  const fetchNextPrayer = useCallback(async (location) => {
    const nextPrayerTime = await axios.get('https://api.aladhan.com/v1/nextPrayer?', {
      params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });

    setNextPrayer(nextPrayerTime.data.data);
  }, []);

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(fetchPrayerTimes);
    } else {
      console.log('not supported');
    }

    async function fetchPrayerTimes(location) {
      try {
        const prayerTimes = await axios.get(`https://api.aladhan.com/v1/timings?`, {
          params: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        }); 

        setPrayerTimesData(prayerTimes.data.data.timings);

        fetchNextPrayer(location);
        setCoords(location);

      } catch (error) {
        console.error(error);
      }

    }

  }, [fetchNextPrayer]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!nextPrayer) return;
      
      const now = new Date();

      const [ prayerHours, prayerMinutes ] = Object.values(nextPrayer.timings)[0].split(':').map(Number);

      const prayerDate = new Date();
      prayerDate.setHours(prayerHours, prayerMinutes, 0);

      if (prayerDate < now) prayerDate.setDate(prayerDate.getDate() + 1);

      const diff = prayerDate - now;

      if (diff <= 0) {
        fetchNextPrayer(coords);
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60)); 
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setHour(hrs);
      setMinute(mins);
      setSecond(secs);

    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer, coords, fetchNextPrayer]);

  return (
    <section className="prayer-card-container">
      {
        prayerTimesData && prayers.map((prayer, index) => {
          return (
            <div className={nextPrayer && Object.keys(nextPrayer.timings)[0] === prayer ? "prayer-card next-prayer" : "prayer-card"} key={index} >
              <div className="prayer-name" >{prayer}&#58;</div>
              <div className="prayer-time">{formatPrayerTime(prayerTimesData[prayer])}</div>
            </div>
          );
        })
      }
      {}
      <footer className="upcoming-prayer">
        <div>{nextPrayer && Object.keys(nextPrayer.timings)[0]} in&#58;</div>
        <div>0{hour}&#58;{String(minute).padStart(2, '0')}&#58;{String(second).padStart(2, '0')}</div>
      </footer>
    </section>
  );
}

export default PrayerTimesPanel;