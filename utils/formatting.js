export function handleDuration(iso) {
  // Convert ISO 8601 duration (YouTube's format) to human-readable "YouTube style"
  // 1) Regex parse
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return '0:00'; // fallback for malformed input

  // 2) Extract numeric parts (default to 0)
  const hours = parseInt(match[1], 10) || 0;
  const minutes = parseInt(match[2], 10) || 0;
  const seconds = parseInt(match[3], 10) || 0;

  // 3) Format
  const ss = String(seconds).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  if (hours > 0) {
    // H:MM:SS (hours not padded)
    return `${hours}:${mm}:${ss}`;
  } else {
    // M:SS (minutes not padded beyond natural length; if 0 -> "0:SS")
    const minutesNoPad = String(minutes); // don't force 2 digits for minutes when no hours
    return `${minutesNoPad}:${ss}`;
  }
}

export function handleViewCount(views) {
  const viewsCount = Number(views);

  if (viewsCount < 1000) {
    return viewsCount;

  } if (viewsCount >= 1000 && viewsCount < 10000) {
    if ((viewsCount % 1000) < 100) {
      return `${(viewsCount / 1000).toFixed(0)}K`;

    } else {
      return `${Math.trunc((viewsCount / 1000) * 10) / 10}K`;

    }
  } if (viewsCount >= 10000 && viewsCount < 999999) {
    return `${Math.floor(viewsCount / 1000)}K`;

  } if (viewsCount >= 1000000 && viewsCount < 9999999) {
    if ((viewsCount % 1000000) < 100000) {
      return `${(viewsCount / 1000000).toFixed(0)}M`;

    } else {
      return `${Math.trunc((viewsCount / 1000000) * 10) / 10}M`;

    }
  } if (viewsCount >= 10000000 && viewsCount < 999999999) {
    return `${Math.floor(viewsCount / 1000000)}M`;

  } if (viewsCount >= 1000000000 && viewsCount < 9999999999) {
    if ((viewsCount % 1000000000) < 100000000) {
      return `${(viewsCount / 1000000000).toFixed(0)}B`;

    } else {
      return `${Math.trunc((viewsCount / 1000000000) * 10) / 10}B`;

    }
  } if (viewsCount >= 10000000000 && viewsCount < 999999999999) {
    return `${Math.floor(viewsCount / 1000000000)}B`;
  }
}

export function youtubeTimeAgo(publishedAt) {
  const now = new Date();
  const past = new Date(publishedAt);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      // YouTube uses singular/plural correctly
      return count === 1
        ? `1 ${unit} ago`
        : `${count} ${unit}s ago`;
    }
  }

  return "just now";
}

export function formatPrayerTime(prayerTime) {
  const [ hour, minute ] = prayerTime.split(':');
  Number(hour), Number(minute);

  if (hour >= 13) {
    return `0${hour - 12}:${minute}PM`;
  } else {
    return `${hour}:${minute}AM`;
  }
}

export function generateID() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';

  for (let i = 0; i < 15; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomNum);
  }

  return id;
}