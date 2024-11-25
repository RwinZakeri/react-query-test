"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Input } from "../components/ui/input";
import { loginForm } from "../types/type";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState<loginForm>({
    userName: "",
    userPassword: "",
  });

  const [userLoginStatus, setUserLoginStatus] = useState(false);

  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitData = () => {
    if (!formData.userName || !formData.userPassword) {
      return;
    }

    console.log(formData);
  };
  console.log("object");

  switch (2) {
    case 1:
      return (
        <>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you logged in?</AlertDialogTitle>
                <AlertDialogDescription>Please login</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Input
                  name="userName"
                  type="text"
                  value={formData.userName} // Bind value to the state
                  onChange={setInputValue}
                  placeholder="Username:"
                />
                <Input
                  name="userPassword"
                  type="password"
                  value={formData.userPassword} // Bind value to the state
                  onChange={setInputValue}
                  placeholder="Password:"
                />
                <Button
                  type="button"
                  onClick={submitData} // Trigger submit logic
                >
                  Login
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant={"ghost"}>
            <Link href="/">hello</Link>
          </Button>
        </>
      );

    case 2:
      return (
        <>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      );
    default:
      return <h1>not found</h1>;
  }
};

export default AuthGuard;
