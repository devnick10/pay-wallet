"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { updateUser } from "@/actions/updateUser";

export const PersonalInfoCard = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  const handleUserUpdate = async () => {
    setIsLoading(true);
    try {
      const { message, success } = await updateUser(user);
      if (success) toast.success(message);
      setUser({ name: "", email: "" });
    } catch (error) {
      console.error(error);
      toast.error("User detailed failed to update.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={"fullName"}>Full Name</Label>
          <Input
            value={user.name || session.data?.user.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            id="fullName"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            value={user.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            id="email"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={session.data?.user.email} disabled />
          <p className="text-xs text-muted-foreground">
            Phone number cannot be changed
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUserUpdate}
          disabled={isLoading}
          className="ml-auto"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};
