import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormPage from "@/components/FormPage";
import axios from "axios";
import { useRouter } from "next/router";

// Define the validation schema
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Define the form data type
interface FormData {
  username: string;
  email: string;
  password: string;
}

const SIGNUP_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "auth/register/";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log("REGISTERING WITH AXIOS", data);
    axios
      .post(SIGNUP_URL, {
        username: data.username,
        email: data.email,
        password1: data.password,
        password2: data.password,
      })
      .then((response) => {
        // TODO Display success toast
        router.push("/");
      })
      .catch((error) => {
        // TODO Display error occurred toast and set field errors
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormPage>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-white"
          >
            Select a username
          </label>
          <div className="mt-2">
            <input
              id="username"
              type="text"
              {...register("username")}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-theme-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-theme-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white"
          >
            Choose a password
          </label>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              {...register("password")}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-theme-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-theme-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-theme-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-500"
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-400">
        Already registered?{" "}
        <button
          onClick={() => signIn("credentials", { callbackUrl: "/profile" })}
          className="font-semibold leading-6 text-theme-300 hover:text-theme-300"
        >
          Sign in
        </button>
      </p>
    </FormPage>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect
  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
}
