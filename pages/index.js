import { useQueries } from "@/hooks/useQueries";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { Dropdown, Toast } from "flowbite-react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useState } from "react";
import Posts from "./posts";
import { HiCheck, HiExclamation } from "react-icons/hi";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Home() {
  const router = useRouter();
  const { mutate } = useMutation();
  const [isPost, setIsPost] = useState(false);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [isAllPost, setIsAllPost] = useState(true);

  const { data: userMe } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      Cookies.remove("user_token");
      router.push("/auth/login");
    }
  };

  const HandleCreatePost = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
      payload: payload,
    });
    if (!response?.success) {
      console.log("response : ", response);
      setIsPost(false);
    } else {
      setIsPost(true);
    }
  };

  return (
    <main>
      <LayoutComponent
        metaTitle="Home"
        metaDescription="Home Page Final Project Sanbercode"
      >
        <div className="min-h-screen">
          <section className="bg-white dark:bg-gray-900 py-8 lg:py-10 antialiased">
            <div className="mx-auto mb-4 pl-4 sm:w-1/2 sm:pl-0">
              <span className="text-2xl font-medium">
                <Link href="/" className="text-gray-600">
                  Home
                </Link>{" "}
                /{" "}
              </span>
            </div>
            <div className="max-w-2xl mx-auto px-4">
              {/* Toast error post */}
              {isPost && (
                <div className="w-full flex justify-center items-center">
                  <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                      <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                      Successfully added post.
                    </div>
                    <Toast.Toggle />
                  </Toast>
                </div>
              )}
              {/* Name User */}
              <div className="mb-3 flex w-full justify-end">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <span className="cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                      {userMe?.data?.name}{" "}
                      <svg
                        className="w-5 h-5 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{userMe?.data?.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {userMe?.data?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <Link href="/notification">Notification</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => HandleLogout()}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    value={payload?.description}
                    onChange={(event) =>
                      setPayload({
                        ...payload,
                        description: event.target.value,
                      })
                    }
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a post..."
                    required
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => HandleCreatePost()}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Send post
                  </button>
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="cursor-pointer inline-flex items-center py-2.5 px-3 font-medium text-center rounded-lg border text-sm text-gray-600 dark:text-gray-400">
                        {isAllPost ? "All Post" : "My Posts"}{" "}
                        <svg
                          className="w-5 h-5 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    )}
                  >
                    <Dropdown.Item onClick={() => setIsAllPost(true)}>
                      All Posts
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setIsAllPost(false)}>
                      My Post
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </form>
              {/* Post */}
              {isAllPost ? <Posts all={true} /> : <Posts all={false} />}
              {/* End Post */}
            </div>
          </section>
          {/*  */}
        </div>
      </LayoutComponent>
    </main>
  );
}
