import { getListenEvents, getSong } from "./data.mjs";

function getSongDetails(songId) {
  return getSong(songId);
}

function formatSong(songId) {
  const song = getSongDetails(songId);

  if (!song) {
    return null;
  }

  return `${song.artist} - ${song.title}`;
}

function getMostCommon(items) {
  if (items.length === 0) {
    return [];
  }

  const counts = new Map();

  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }

  const highestCount = Math.max(...counts.values());

  return [...counts.entries()]
    .filter(([, count]) => count === highestCount)
    .map(([item, count]) => ({ item, count }));
}

function getMostByValue(items) {
  if (items.length === 0) {
    return [];
  }

  const totals = new Map();

  for (const { item, value } of items) {
    totals.set(item, (totals.get(item) || 0) + value);
  }

  const highestValue = Math.max(...totals.values());

  return [...totals.entries()]
    .filter(([, value]) => value === highestValue)
    .map(([item, value]) => ({ item, value }));
}

function getSongCount(events) {
  return getMostCommon(events.map((event) => event.song_id));
}

function getArtistCount(events) {
  const artists = events
    .map((event) => getSongDetails(event.song_id))
    .filter(Boolean)
    .map((song) => song.artist);

  return getMostCommon(artists);
}

function getSongListeningTime(events) {
  const listens = events
    .map((event) => {
      const song = getSongDetails(event.song_id);

      if (!song) {
        return null;
      }

      return {
        item: event.song_id,
        value: song.duration_seconds,
      };
    })
    .filter(Boolean);

  return getMostByValue(listens);
}

function getArtistListeningTime(events) {
  const listens = events
    .map((event) => {
      const song = getSongDetails(event.song_id);

      if (!song) {
        return null;
      }

      return {
        item: song.artist,
        value: song.duration_seconds,
      };
    })
    .filter(Boolean);

  return getMostByValue(listens);
}

function isFridayNight(event) {
  const date = new Date(event.timestamp);
  const day = date.getDay();
  const hour = date.getHours();

  return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
}

function getLongestStreak(events) {
  if (events.length === 0) {
    return [];
  }

  let currentSong = events[0].song_id;
  let currentLength = 1;
  let longestLength = 1;
  const longestSongs = new Set([currentSong]);

  for (let index = 1; index < events.length; index += 1) {
    const songId = events[index].song_id;

    if (songId === currentSong) {
      currentLength += 1;
    } else {
      currentSong = songId;
      currentLength = 1;
    }

    if (currentLength > longestLength) {
      longestLength = currentLength;
      longestSongs.clear();
      longestSongs.add(currentSong);
    } else if (currentLength === longestLength) {
      longestSongs.add(currentSong);
    }
  }

  return [...longestSongs].map((songId) => ({
    songId,
    length: longestLength,
  }));
}

function getSongsListenedToEveryDay(events) {
  if (events.length === 0) {
    return [];
  }

  const songsByDay = new Map();

  for (const event of events) {
    const date = event.timestamp.slice(0, 10);

    if (!songsByDay.has(date)) {
      songsByDay.set(date, new Set());
    }

    songsByDay.get(date).add(event.song_id);
  }

  const dates = [...songsByDay.keys()].sort();
  const firstDate = new Date(`${dates[0]}T00:00:00Z`);
  const lastDate = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
  const songsOnFirstDay = songsByDay.get(dates[0]);
  const songsListenedEveryDay = [];

  for (const songId of songsOnFirstDay) {
    let listenedEveryDay = true;

    for (
      let date = new Date(firstDate);
      date <= lastDate;
      date.setUTCDate(date.getUTCDate() + 1)
    ) {
      const dateString = date.toISOString().slice(0, 10);
      const songs = songsByDay.get(dateString);

      if (!songs || !songs.has(songId)) {
        listenedEveryDay = false;
        break;
      }
    }

    if (listenedEveryDay) {
      songsListenedEveryDay.push(songId);
    }
  }

  return songsListenedEveryDay;
}

function getTopGenres(events) {
  const counts = new Map();

  for (const event of events) {
    const song = getSongDetails(event.song_id);

    if (!song || !song.genre) {
      continue;
    }

    counts.set(song.genre, (counts.get(song.genre) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([genre, count]) => ({ genre, count }));
}

function getSongResults(results) {
  return results.map(({ item, count, value }) => ({
    songId: item,
    song: formatSong(item),
    ...(count !== undefined ? { count } : {}),
    ...(value !== undefined ? { seconds: value } : {}),
  }));
}

function getArtistResults(results) {
  return results.map(({ item, count, value }) => ({
    artist: item,
    ...(count !== undefined ? { count } : {}),
    ...(value !== undefined ? { seconds: value } : {}),
  }));
}

export function analyseUser(userId) {
  const originalEvents = [...getListenEvents(userId)];

  const events = [...originalEvents].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  if (events.length === 0) {
    return {
      hasData: false,
      message: "This user didn't listen to any songs.",
    };
  }

  const fridayEvents = events.filter(isFridayNight);

  const mostListenedSongs = getSongCount(events);
  const mostListenedArtists = getArtistCount(events);
  const mostListenedSongsByTime = getSongListeningTime(events);
  const mostListenedArtistsByTime = getArtistListeningTime(events);

  const fridaySongs = getSongCount(fridayEvents);
  const fridaySongsByTime = getSongListeningTime(fridayEvents);

  // Use the original data order to calculate the longest streak.
  const longestStreak = getLongestStreak(originalEvents);

  const everyDaySongs = getSongsListenedToEveryDay(events);
  const topGenres = getTopGenres(events);

  return {
    hasData: true,
    mostListenedSongs: getSongResults(mostListenedSongs),
    mostListenedArtists: getArtistResults(mostListenedArtists),
    mostListenedSongsByTime: getSongResults(mostListenedSongsByTime),
    mostListenedArtistsByTime: getArtistResults(mostListenedArtistsByTime),
    fridaySongs: getSongResults(fridaySongs),
    fridaySongsByTime: getSongResults(fridaySongsByTime),

    longestStreak: longestStreak.map((streak) => ({
      ...streak,
      song: formatSong(streak.songId),
    })),

    everyDaySongs: everyDaySongs
      .map((songId) => ({
        songId,
        song: formatSong(songId),
      }))
      .filter((song) => song.song !== null),

    topGenres,
  };
}

export function getMostCommonForTesting(items) {
  return getMostCommon(items);
}

export function getLongestStreakForTesting(events) {
  return getLongestStreak(events);
}

export function getSongsListenedToEveryDayForTesting(events) {
  return getSongsListenedToEveryDay(events);
}
