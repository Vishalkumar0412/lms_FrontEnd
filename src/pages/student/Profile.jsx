import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";

const Profile = () => {
  const isLoading = false;
  const enrolledCourses=[]
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start my-5 gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full md:w-auto">
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Name:{" "}
              <span className="text-gray-700 dark:text-gray-100">Vishal Mern Stack</span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Email:{" "}
              <span className="text-gray-700 dark:text-gray-100">Vishal@gmail.com</span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-300">
              Role:{" "}
              <span className="text-gray-700 dark:text-gray-100">INSTRUCTOR</span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="Vishal Mern Stack" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo" className="text-right">
                    Profile Photo
                  </Label>
                  <Input id="photo" type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-xl mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => <CourseSkeleton key={i} />)
          ) : enrolledCourses.length === 0 ? (
            <p className="col-span-full text-gray-600 dark:text-gray-400">
              You are not enrolled in any courses.
            </p>
          ) : (
            enrolledCourses.map((course, i) => <Course key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
