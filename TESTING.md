# Testing

## 1. User Dropdown

- Open the website and check that the dropdown contains User 1, User 2, User 3 and User 4.
- Select each user and check that the displayed results update correctly.
- Check that changing users does not leave results from the previously selected user on the page.

**Method:** Manual browser testing.

## 2. Most Listened-to Song and Artist by Count

- Check the most listened-to song and artist for Users 1, 2 and 3.
- Compare the results with the expected output in the project rubric.
- Check that the song and artist names and listening counts are displayed correctly.

**Method:** Manual browser testing.

## 3. Friday-Night Listening

- Check the most listened-to song on Friday nights for each user with Friday-night listening data.
- Compare the results with the expected output in the project rubric.
- Check that the Friday-night questions are hidden when a user has no Friday-night listens.
- Check that the website does not display misleading results when there is no Friday-night listening data.

**Method:** Manual browser testing.

## 4. Listening Time

- Check that song listening times are calculated using the song durations from the supplied data.
- Check that artist listening times are calculated correctly from the listening events and song durations.
- Check that Friday-night listening times include only qualifying Friday-night listens.
- Compare the results for Users 1, 2 and 3 with the expected output in the project rubric.
- Check that listening times are displayed in hours, minutes and seconds where appropriate.

**Method:** Manual browser testing.

## 5. Longest Consecutive Streak

- Check that consecutive listens to the same song are counted as a streak.
- Check that a different song breaks the current streak.
- Check that repeated listens separated by another song are not counted as one continuous streak.
- Check that all songs tied for the longest streak are displayed.
- Check that an empty list of listening events returns an empty result.
- Compare the longest streaks for Users 1, 2 and 3 with the expected output in the project rubric.

**Method:** Unit tests in `common.test.mjs` and manual browser testing.

## 6. Songs Listened to Every Day

- Check that songs listened to on every calendar day are displayed correctly.
- Compare the results with the expected output in the project rubric.
- Check that a song missing from any calendar day is excluded.
- Check that the question is hidden when no song was listened to every day.

**Method:** Unit tests in `common.test.mjs` and manual browser testing.

## 7. Top Genres

- Check the top genres and their listening counts for Users 1, 2 and 3.
- Compare the results with the expected output in the project rubric.
- Check that no more than three genres are displayed.
- Check that fewer than three genres are displayed when fewer than three genres are available.
- Check that the website handles missing genre information without displaying incorrect results.

**Method:** Manual browser testing.

## 8. Empty or Missing Listening Data

- Select User 4 and verify that the user has no listening data.
- Check that an understandable message is displayed.
- Check that no listening questions or results are displayed.
- Check that the page does not display incorrect totals or errors for an empty user.

**Method:** Manual browser testing.

## 9. Unit Tests

- Run `npm test` in the terminal.
- Check that all unit tests pass.
- Check that the test suite covers the main functions, including most common items, longest streaks and songs listened to every day.
- Check that the tests include empty inputs, ties and consecutive events where applicable.

**Result:** All 11 tests passed, with 0 failures.

**Method:** Automated unit testing using `node --test` and `common.test.mjs`.

## 10. Accessibility

- Open Chrome DevTools and run Lighthouse in Desktop mode using Snapshot mode, if available.
- Check the page after selecting each user.
- Check that the user dropdown has an accessible label.
- Check that headings follow a logical structure.
- Check text contrast and keyboard focus.
- Check that the dropdown can be operated using the keyboard.
- Fix accessibility issues reported by Lighthouse where possible and rerun the audit.

**Method:** Manual accessibility testing and Lighthouse.

## 11. Deployment

- Commit and push the changes to GitHub.
- Merge the changes into the branch used for deployment, following the project's contribution workflow.
- Open the hosted website and check that the latest changes are available.
- Check the user dropdown and listening results on the deployed website.
- Check the browser console for errors.

**Method:** Manual deployment testing.
