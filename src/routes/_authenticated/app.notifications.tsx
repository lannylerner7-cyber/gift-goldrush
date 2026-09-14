import { createFileRoute } from "@tanstack/react-router";

import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/notifications")({
  component: () => (
    <ComingSoon
      title="Notifications"
      body="Trade updates, wallet credits and announcements land here in a later build phase."
    />
  ),
});
