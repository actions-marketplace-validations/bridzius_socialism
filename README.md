# `@bridzius/socialism` - social updater

Update your social media feed from you github commit messages.

This actions parses your GitHub commit body (the second+ line of your commit message) for a preprogrammed prefix

Currently supported social media platforms:

1. Mastodon - https://joinmastodon.org/

### Action setup

- The action should be added as a step to your workflow and uses the `prefix` input, which is set to what you want to parse for.
- Environment variables are used for passing the url of the social media you want to use and the access token.
- Example (Mastodon):

Action:

```yaml
- name: Post update
    uses: bridzius/socialism@1.0
    with:
        prefix: "post:"
    env:
        MASTODON_TOKEN: ${{ secrets.MASTODON_TOKEN }}
        MASTODON_URL: https://mastodon.social
```

Input commit message:

```text
feat: added some new feature to this thing here

post: Check out this nonsense.
```

Mastodon post:

> Check out this nonsense.

### Mastodon Setup

1. Getting your access token:
   1. Login to your Mastodon instance, for example https://mastodon.social.
   2. Go to `Settings -> Development`, click on `New Application`.
   3. Enter the name of the application and ONLY add the `write:statuses` scope.
   4. Submit it then click on the name of the application you've just created.
   5. Copy 'Your Access Token'.
2. Add your access token as a secret to your GitHub repository.
3. Provide the added secret as a `MASTODON_TOKEN` environment variable to the action.
4. Provide your instance domain as a `MASTODON_URL` env variable.

### Debugging

Set `ACTIONS_STEP_DEBUG` repository secret to `true` to enable debug logging.
