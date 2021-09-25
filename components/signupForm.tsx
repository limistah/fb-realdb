import React, { useState } from "react";
import { registerUser } from "../libs/firebaseApp";

function SignupForm() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
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
    // @ts-ignore
    return (
      formState.firstName &&
      formState.lastName &&
      formState.email &&
      formState.password
    );
  };

  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>): void => {
    setFormMessage("Signing Up");
    e.preventDefault();

    if (!canSubmit()) {
      setFormMessage("Please, all fields are required");
      return;
    }

    registerUser(formState)
      .then((res) => {
        // @ts-ignore
        if (!res.error) {
          setFormMessage("Signup successful. Continue to login");
        } else {
          // @ts-ignore
          if (res.errorCode === "auth/email-already-in-use") {
            setFormMessage("Email already in use, try logging in.");
          } else {
            // @ts-ignore
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
          name="firstName"
          placeholder="Firstname"
          className="p-3 w-full mb-3"
          defaultValue={formState.firstName}
          onChange={handleFormUpdate("firstName")}
        />
      </div>

      <div className="">
        <input
          name="lastName"
          placeholder="Lastname"
          className="p-3 w-full mb-3"
          defaultValue={formState.lastName}
          onChange={handleFormUpdate("lastName")}
        />
      </div>

      <div className="">
        <input
          name="email"
          type="email"
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
