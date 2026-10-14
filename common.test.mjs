import assert from "node:assert/strict";
import test from "node:test";

import {
  getMostCommonForTesting,
  getLongestStreakForTesting,
  getSongsListenedToEveryDayForTesting,
} from "./common.mjs";

test("getMostCommon returns the most frequent item and its count", () => {
  const result = getMostCommonForTesting([
    "song-1",
    "song-2",
    "song-1",
    "song-3",
    "song-1",
    "song-2",
  ]);

  assert.deepEqual(result, [{ item: "song-1", count: 3 }]);
});

test("getMostCommon returns all items when they tie", () => {
  const result = getMostCommonForTesting([
    "song-1",
    "song-2",
    "song-1",
    "song-2",
  ]);

  assert.deepEqual(result, [
    { item: "song-1", count: 2 },
    { item: "song-2", count: 2 },
  ]);
});

test("getMostCommon returns an empty array for no items", () => {
  assert.deepEqual(getMostCommonForTesting([]), []);
});

test("getLongestStreak counts consecutive listens, not total listens", () => {
  const events = [
    { song_id: "song-1" },
    { song_id: "song-1" },
    { song_id: "song-2" },
    { song_id: "song-1" },
    { song_id: "song-1" },
    { song_id: "song-1" },
  ];

  assert.deepEqual(getLongestStreakForTesting(events), [
    { songId: "song-1", length: 3 },
  ]);
});

test("getLongestStreak counts consecutive songs in event order", () => {
  const events = [
    { song_id: "A" },
    { song_id: "B" },
    { song_id: "A" },
    { song_id: "A" },
    { song_id: "A" },
  ];

  assert.deepEqual(getLongestStreakForTesting(events), [
    { songId: "A", length: 3 },
  ]);
});

test("getLongestStreak returns an empty array when there are no events", () => {
  assert.deepEqual(getLongestStreakForTesting([]), []);
});

test("getLongestStreak returns all songs tied for the longest streak", () => {
  const events = [
    { song_id: "A" },
    { song_id: "A" },
    { song_id: "B" },
    { song_id: "B" },
  ];

  assert.deepEqual(getLongestStreakForTesting(events), [
    { songId: "A", length: 2 },
    { songId: "B", length: 2 },
  ]);
});

test("getSongsListenedToEveryDay finds songs present on every listening day", () => {
  const events = [
    { song_id: "A", timestamp: "2026-08-01T10:00:00Z" },
    { song_id: "B", timestamp: "2026-08-01T11:00:00Z" },
    { song_id: "A", timestamp: "2026-08-02T10:00:00Z" },
    { song_id: "B", timestamp: "2026-08-02T11:00:00Z" },
    { song_id: "A", timestamp: "2026-08-03T10:00:00Z" },
  ];

  assert.deepEqual(getSongsListenedToEveryDayForTesting(events), ["A"]);
});

test("getSongsListenedToEveryDay excludes songs missing on a listening day", () => {
  const events = [
    { song_id: "A", timestamp: "2026-08-01T10:00:00Z" },
    { song_id: "B", timestamp: "2026-08-01T11:00:00Z" },
    { song_id: "A", timestamp: "2026-08-02T10:00:00Z" },
    { song_id: "B", timestamp: "2026-08-03T11:00:00Z" },
  ];

  assert.deepEqual(getSongsListenedToEveryDayForTesting(events), []);
});

test("getSongsListenedToEveryDay returns an empty array for no events", () => {
  assert.deepEqual(getSongsListenedToEveryDayForTesting([]), []);
});

test("getSongsListenedToEveryDay ignores days with no listening activity", () => {
  const events = [
    { song_id: "A", timestamp: "2026-08-01T10:00:00Z" },
    { song_id: "A", timestamp: "2026-08-03T10:00:00Z" },
  ];

  assert.deepEqual(getSongsListenedToEveryDayForTesting(events), ["A"]);
});
