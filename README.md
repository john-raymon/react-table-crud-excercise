# React Table CRUD evaluation

- Fork this repository and build your solution in the fork. When you're done reach out to us with the link to your solution repository.

- The starting point code in this repo queries a list of all users and puts them on the screen as JSON.

- The schema you have to work with is in the repo as `schema.graphql`.

- You'll have to create an `env.js` file in the `src` directory with the content:

```js
export default {
  GRAPHQL_ENDPOINT: '',
  GRAPHQL_API_KEY: ''
};
```

- Fill in the endpoint and API key you received in the `env.js` file.

- You should have also received a link to Zeplin containing the design you have to implement.

- If you haven't received either of those things, reach out to us and we'll get you set up right away.

- There's a `resetUsers` mutation that you can use at any time to restore the original user data set.

## Guidelines

- **It doesn't have to be perfect -- it's completely fine to have rough edges with the styling or the functionality.**

- The sample code in the repo uses React hooks to interact with the GraphQL API, but if you aren't comfortable with hooks yet then feel free to use whatever other method you'd like. You can also use class components and lifecycle methods (`componentDidMount` instead of `useEffect` etc.). It won't impact our evaluation of you in any way.

- It's fine to render nothing for loading states for the purpose of this exercise.

- We also aren't expecting any sophisticated caching solutions, optimistic updates for mutations, or anything of the sort. The very basic features of Apollo are all you need.

- It's also fine to just refetch data after updates instead of updating the data yourself locally.

- We'd prefer if you implement the layouts yourself from scratch, without using any CSS frameworks like Bootstrap or Semantic UI. We've purposely made the design very minimal to facilitate this.

- You're free to use any styling solution you want -- whether that's regular CSS, CSS modules, or a CSS-in-JS solution like styled-components or emotion.

- You'll have to implement the two screens in the Zeplin design as separate routes, using client side routing.

## What we'll be evaluating you on

- General React knowledge (state and props, lifecycles methods / hooks, event handling, conditional rendering, lists and keys, etc.)
- How consistent your coding style is.
- How you choose to structure your components, and what you decide should be it's own component.
- How you structure your files.
- How you implement layouts and how clean your styles are.
- Adhering to the Prettier and ESLint config set up in the starter repository.
