import { getUserIDs } from "./data.mjs";
import { analyseUser } from "./common.mjs";

const userSelect = document.querySelector("#user-select");
const statistics = document.querySelector("#statistics");
const status = document.querySelector("#status");

function createElement(tagName, text) {
  const element = document.createElement(tagName);
  element.textContent = text;
  return element;
}

function addResultSection(title, items) {
  if (!items || items.length === 0) {
    return;
  }

  const section = document.createElement("section");
  const heading = createElement("h3", title);
  const list = document.createElement("ul");

  section.append(heading, list);

  for (const item of items) {
    list.append(createElement("li", item));
  }

  statistics.append(section);
}

function formatSongs(results, property) {
  return results.map((result) => {
    if (property === "count") {
      return `${result.song} (${result.count} listens)`;
    }

    if (property === "time") {
      return `${result.song} (${formatDuration(result.seconds)})`;
    }

    return result.song;
  });
}

function formatArtists(results, property) {
  return results.map((result) => {
    if (property === "count") {
      return `${result.artist} (${result.count} listens)`;
    }

    return `${result.artist} (${formatDuration(result.seconds)})`;
  });
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function displayResults(userId) {
  // Remove results from the previously selected user.
  statistics.replaceChildren();
  status.textContent = "";

  const results = analyseUser(userId);

  if (!results.hasData) {
    status.textContent = results.message;
    return;
  }

  addResultSection(
    "Most listened-to song by number of listens",
    formatSongs(results.mostListenedSongs, "count"),
  );

  addResultSection(
    "Most listened-to artist by number of listens",
    formatArtists(results.mostListenedArtists, "count"),
  );

  addResultSection(
    "Most listened-to song on Friday nights by number of listens",
    formatSongs(results.fridaySongs, "count"),
  );

  addResultSection(
    "Most listened-to song by listening time",
    formatSongs(results.mostListenedSongsByTime, "time"),
  );

  addResultSection(
    "Most listened-to artist by listening time",
    formatArtists(results.mostListenedArtistsByTime, "time"),
  );

  addResultSection(
    "Most listened-to Friday-night song by listening time",
    formatSongs(results.fridaySongsByTime, "time"),
  );

  addResultSection(
    "Longest repeated-song streak",
    results.longestStreak.map(
      (streak) => `${streak.song} (${streak.length} consecutive listens)`,
    ),
  );

  addResultSection(
    "Songs listened to every day",
    results.everyDaySongs.map((song) => song.song),
  );

  const genreCount = results.topGenres.length;

  let genreTitle = "Top genres";

  if (genreCount === 1) {
    genreTitle = "Top genre";
  } else if (genreCount > 1) {
    genreTitle = `Top ${genreCount} genres`;
  }

  addResultSection(
    genreTitle,
    results.topGenres.map((genre) => `${genre.genre} (${genre.count} listens)`),
  );

  // Handle a user whose events exist but produce no valid results.
  if (statistics.childElementCount === 0) {
    status.textContent = "No listening results are available for this user.";
  }
}

function populateUsers() {
  const userIds = getUserIDs();

  userSelect.replaceChildren();

  for (const userId of userIds) {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.append(option);
  }

  if (userIds.length === 0) {
    status.textContent = "No users are available.";
    userSelect.disabled = true;
    return;
  }

  userSelect.addEventListener("change", () => {
    displayResults(userSelect.value);
  });

  displayResults(userSelect.value);
}

populateUsers();
