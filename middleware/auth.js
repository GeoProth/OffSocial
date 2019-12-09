export default function AuthMiddleware(context) {
  const strategies = [
    {
      test: ({ store }) => store.getters["user/isLoggedIn"] === false,
      action: ({ store, redirect }) => redirect(307, "/")
    }
  ];
  // eslint-disable-next-line
  for (let strategy of strategies) {
    if (strategy.test(context)) strategy.action(context);
  }
}
