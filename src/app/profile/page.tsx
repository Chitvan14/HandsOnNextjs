"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import User from "@/models/userModel";
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);

  const router = useRouter();
  useEffect(() => {
    getUserData();
  }, []);

  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("onLogout failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getUserData = async () => {
    try {
      setLoading(true);
      const userInfo = await axios.get("/api/users/me");
      setData(userInfo.data.data);
    } catch (error: any) {
      console.log("getUserData failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      <Toaster position="top-center" reverseOrder={true} />{" "}
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
          <div className="space-y-12">

            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={data == null ? "" : data?.username}
                      readOnly
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      readOnly
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={data == null ? "" : data?.email}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Profile ID
                  </label>
                  <div className="mt-2">
                    {data == null ? (
                      "No Link"
                    ) : (
                      <Link
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href={`/profile/${data._id}`}
                      >
                        Let's Check
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
