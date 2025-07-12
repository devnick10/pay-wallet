import { StoreBranding } from "@/components/StoreBranding";
import { StoreInfoCard } from "@/components/StoreInfoCard";

export default function StoreSettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground">
          Manage your store profile and preferences.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <StoreInfoCard />
        <StoreBranding />
      </div>
    </div>
  );
}
