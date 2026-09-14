import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/withdraw")({
  component: () => (
    <ComingSoon
      title="Withdraw to your bank"
      body="Saved bank details, the flat ₦300 fee and payout tracking arrive in the next build phase."
    />
  ),
});
