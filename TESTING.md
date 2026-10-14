# Testing

## 1. User dropdown

- Open the website and check that the dropdown contains User 1, User 2, User 3 and User 4.
- Select each user and check that the displayed results update.

Method: Manual browser testing.

## 2. Most listened-to song and artist by count

- Compare the results for Users 1, 2 and 3 with the expected output in the project rubric.

Method: Manual browser testing.

## 3. Friday-night listening

- Check the Friday-night results against the expected output.
- Check that no Friday-night questions appear for a user with no Friday-night listens.

Method: Manual browser testing.

## 4. Listening time

- Check that song and artist totals use song durations from the supplied data.
- Check that the results match the expected output.

Method: Manual browser testing.

## 5. Longest consecutive streak

- Test repeated songs separated by other songs.
- Test ties between songs with equal longest streaks.

Method: Unit tests in common.test.mjs.

## 6. Songs listened to every day

- Check the results against the expected output.
- Check that the question is hidden when no song was listened to every day.

Method: Manual browser testing.

## 7. Top genres

- Check the results for Users 1, 2 and 3.
- Check that fewer than three genres are displayed when fewer than three genres exist.

Method: Manual browser testing.

## 8. Empty user

- Select User 4.
- Check that an understandable message appears and no listening questions are displayed.

Method: Manual browser testing.

## 9. Unit tests

- Run `npm test`.
- Check that all tests pass.

Method: Unit tests in common.test.mjs.

## 10. Accessibility

- Run Lighthouse in Chrome DevTools using Desktop mode and Snapshot mode.
- Check every user selection.
- Check the label for the dropdown, heading structure, text contrast and keyboard focus.
- Fix any issues reported by Lighthouse.

Method: Manual accessibility testing with Lighthouse.

## 11. Deployment

- Push a change to GitHub.
- Merge it into the deployment branch.
- Check that the hosted website updates successfully.

Method: Manual deployment testing.
