/**
 * The admin console is an unauthenticated mock prototype: any non-empty
 * credential signs in and every screen reads from `src/lib/mock-data.ts`.
 * It must not answer on a public production deployment.
 *
 * The opt-in flag has to be present at build time as well as at runtime,
 * because Next prerenders these routes — an unset flag therefore fails closed.
 */
export function isAdminConsoleLocked(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_PUBLIC_ADMIN !== "true"
  );
}
