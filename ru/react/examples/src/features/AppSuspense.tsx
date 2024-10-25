import { Suspense } from "react";

function DelayComponent() {
  let items = Array.from({ length: 10 }, (_, index) => index).map((i) => (
    <p key={`index-${i}`}>{i}</p>
  ));

  return <div>{items}</div>;
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export function AppSuspense() {
  return (
    <>
      <h1>Hi there</h1>
      <Suspense fallback={<Loading />}>
        <DelayComponent />
      </Suspense>
    </>
  );
}
