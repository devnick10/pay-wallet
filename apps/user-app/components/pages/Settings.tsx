import { PersonalInfoCard } from "../PersonalInfoCard";
import UpdatePasswordCard from "../updatePassowordCard";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <PersonalInfoCard />
        <UpdatePasswordCard />
      </div>
    </div>
  );
}
