import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/_authenticated/app/settings")({
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/login", replace: true });
  }

  return (
    <div className="space-y-4">
      <ComingSoon
        title="Settings"
        body="Profile, bank details, notification preferences and account deletion arrive in a later build phase."
      />
      <button
        type="button"
        onClick={signOut}
        className="border-destructive/40 text-destructive hover:bg-destructive/10 flex w-full items-center justify-center gap-2 rounded-full border py-3.5 text-sm font-semibold"
      >
        <LogOut className="h-4 w-4" /> Log out
      </button>
    </div>
  );
}
