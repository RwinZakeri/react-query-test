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
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { AXIOS } from "@/setting/axiosInterceptor";
import { loginForm, User } from "@/types/type";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState<loginForm>({
    userName: "",
    userPassword: "",
  });

  // Use the useLocalStorage hook at the top level of the component

  const [isLoggedInBefore, setIsLoggedInBefore] = useLocalStorage(
    "isLoggedIn",
    false
  );
  // Check login status and set the state accordingly
  const [userLoginStatus, setUserLoginStatus] = useState(false);

  //   const { data: users, isLoading } = useQuery({
  //     queryKey: ["test"],
  //     queryFn: () => {
  //       return queryFetcher("/users");
  //     },
  //   });

  useEffect(() => {
    console.log(userLoginStatus);
    if (isLoggedInBefore == true) {
      setUserLoginStatus(true);
      setIsOpen(false);
    }
  }, []);

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
    const fetch = async () => {
      try {
        const res = await AXIOS.get("/usasders");
        const users = res.data;
        const userIsValid = await users?.find((item: User) => {
          if (
            item.userName == formData.userName &&
            item.password == formData.userPassword
          ) {
            return item;
          }
        });
        if (userIsValid) {
          setIsLoggedInBefore(true);
          setUserLoginStatus(true);
        }
      } catch (err) {
        toast({
          title: "an error happend",
          description: "505",
        });
      }
    };
    fetch();
  };

  return !userLoginStatus ? (
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
  ) : (
    children // Render the children if the user is logged in
  );
};

export default AuthGuard;
