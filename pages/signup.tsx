import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SignupForm from "../components/signupForm";

const Home: NextPage = () => {
  return (
    <div className="h-full w-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full w-full flex justify-center items-center bg-purple-200">
        <div>
          <h1 className="text-4xl text-center my-5 flex-1 border-b-2 font-bold">
            Signup For Doer
          </h1>

          <SignupForm />
        </div>
      </main>
    </div>
  );
};

export default Home;
