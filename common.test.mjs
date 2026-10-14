import assert from "node:assert/strict";
import test from "node:test";

import {
  getMostCommonForTesting,
  getLongestStreakForTesting,
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
