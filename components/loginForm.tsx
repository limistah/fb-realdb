import React, { useState } from "react";
import { loginUser } from "../libs/firebaseApp";
import router from "next/router";

function LoginForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [formMessage, setFormMessage] = useState("");

  const handleFormUpdate = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [key]: e?.currentTarget?.value,
      });
    };
  };

  const canSubmit = (): boolean => {
    return !!(formState.email && formState.password);
  };

  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>): void => {
    setFormMessage("Authenticating");
    e.preventDefault();

    if (!canSubmit()) {
      setFormMessage("Please, all fields are required");
      return;
    }

    loginUser(formState.email, formState.password)
      .then((res) => {
        if (!res.error) {
          setFormMessage("Signup successful. Continue to login");
          localStorage.setItem("uid", res.uid);
          router.push("/dashboard");
        } else {
          if (
            ["auth/user-not-found", "auth/wrong-password"].includes(
              res.errorCode
            )
          ) {
            setFormMessage("Invalid credentials, try again");
          } else {
            setFormMessage(res.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setFormMessage(err.message);
        console.log(err);
      });
  };

  return (
    <form className="container" onSubmit={handleSubmitForm}>
      <div className="">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 w-full mb-3"
          defaultValue={formState.email}
          onChange={handleFormUpdate("email")}
        />
      </div>

      <div className="">
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-3 w-full mb-3"
          defaultValue={formState.password}
          onChange={handleFormUpdate("password")}
        />
      </div>

      <div className="my-5 text-center bg-gray-600">{formMessage}</div>

      <div className="">
        <button
          type="submit"
          className="p-3 w-full mb-3 border-2 bg-pink-600 text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
