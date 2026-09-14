import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/history")({
  component: () => (
    <ComingSoon
      title="Trade history"
      body="Your full trade list with live status arrives in the next build phase."
    />
  ),
});
