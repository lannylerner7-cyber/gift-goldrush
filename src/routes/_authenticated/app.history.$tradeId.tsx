import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/history/$tradeId")({
  component: () => (
    <ComingSoon
      title="Trade details"
      body="The full trade timeline, admin note and chat land in the next build phase."
    />
  ),
});
