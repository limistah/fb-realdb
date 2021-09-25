import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import LoginForm from "../components/loginForm";

const Home: NextPage = () => {
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      router.push("/dashboard");
    }
  });

  return (
    <div className="h-full w-full">
      <Head>
        <title>Login | Doer</title>
        <meta name="description" content="Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full flex justify-center items-center bg-purple-200">
        <div>
          <h1 className="text-4xl text-center my-5 flex-1 border-b-2 font-bold">
            Login | Doer
          </h1>

          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Home;
