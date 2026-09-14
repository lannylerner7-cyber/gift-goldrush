import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/trade")({
  component: () => (
    <ComingSoon
      title="Trade a card"
      body="Brand, region, value and upload steps land in the next build phase."
    />
  ),
});
