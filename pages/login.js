import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toast } from "flowbite-react";
import { HiExclamation, HiCheck } from "react-icons/hi";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { mutate } = useMutation();
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const ToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const HandleSubmitLogin = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload: {
        email: payload?.email,
        password: payload?.password,
      },
    });
    if (!response?.success) {
      setIsError(true);
      console.log("response : ", response);
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: response?.data?.expires,
        path: "/",
      });
      setIsError(false);
      router.push("/");
    }
  };

  const HandleSubmitRegister = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload: {
        name: payload?.name,
        email: payload?.email,
        password: payload?.password,
      },
    });
    if (!response?.success) {
      setIsError(true);
      setTextError(response?.message);
      console.log("payload : ", payload);
      console.log("response : ", response);
    } else {
      setIsLogin(!isLogin);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col">
        {/* Toast login */}
        <div className="mb-5">
          {isError && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiExclamation className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {isLogin ? "Check Your Email and Password" : textError}
              </div>
              <Toast.Toggle />
            </Toast>
          )}
          {/* <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Account created successfully.
            </div>
            <Toast.Toggle />
          </Toast> */}
        </div>
        {/* End toast login */}

        <div className="flex items-center justify-center">
          <div className="border p-10 rounded-lg">
            <h1 className="text-3xl font-bold mb-5">
              {isLogin ? "Login" : "Register"}
            </h1>
            {isLogin ? (
              <div className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={payload.email}
                    onChange={(event) => {
                      setPayload({ ...payload, email: event.target.value });
                    }}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    value={payload.password}
                    onChange={(event) => {
                      setPayload({ ...payload, password: event.target.value });
                    }}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your password"
                    required
                  />
                </div>
                <button
                  onClick={() => HandleSubmitLogin()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <div className="mt-4">
                  <p className="text-sm text-gray-800">
                    Don't have an account?{" "}
                    <button onClick={() => ToggleForm()} className="underline">
                      Register here
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    value={payload.name}
                    onChange={(event) => {
                      setPayload({ ...payload, name: event.target.value });
                    }}
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    value={payload.email}
                    onChange={(event) => {
                      setPayload({ ...payload, email: event.target.value });
                    }}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={payload.password}
                    onChange={(event) => {
                      setPayload({ ...payload, password: event.target.value });
                    }}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your password"
                    required
                  />
                </div>
                <button
                  onClick={() => HandleSubmitRegister()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
                <div className="mt-4">
                  <p className="text-sm text-gray-800">
                    Have an account?{" "}
                    <button onClick={() => ToggleForm()} className="underline">
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
