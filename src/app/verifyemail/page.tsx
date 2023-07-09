"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = React.useState(true);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token != undefined && token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
    } catch (error: any) {
      setIsVerified(false);
      console.log("verifyUserEmail failed ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {isVerified ? (
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
              <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
              <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <img
                  className="mx-auto h-12"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
                <figure className="mt-10">
                  <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>
                      Congratulations! Your email has been verified
                      successfully.
                    </p>
                  </blockquote>
                </figure>
              </div>
              <br />
              <div className="flex justify-center ">
                <Link
                  href="/login"
                  className="flex w-max justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </Link>
              </div>
            </section>
          ) : (
            "Token Caused Error"
          )}
        </div>
      )}
    </>
  );
}
