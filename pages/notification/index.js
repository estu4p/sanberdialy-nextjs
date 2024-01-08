import dynamic from "next/dynamic";
import { Dropdown } from "flowbite-react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import moment from "moment";
import Link from "next/link";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notification() {
  const router = useRouter();
  const { mutate } = useMutation();
  const { data: userMe } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
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

  return (
    <>
      <LayoutComponent title="Notification">
        <div className="min-h-screen">
          <section className="bg-white dark:bg-gray-900 py-8 lg:py-10 antialiased">
            <div className="mx-auto mb-4 pl-4 sm:w-1/2 sm:pl-0">
              <span className="text-2xl font-medium">
                <Link href="/" className="text-gray-600">
                  Home
                </Link>{" "}
                /{" "}
                <Link href="/notification" className="text-gray-600">
                  Notification
                </Link>{" "}
              </span>
            </div>
            <div className="max-w-2xl mx-auto px-4">
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
              {/* Comments */}
              <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                  {data?.data?.map((item) => (
                    <li key={item?.id}>
                      <span className="items-center flex p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img
                          className="w-10 h-10 mb-3 me-3 rounded-full sm:mb-0"
                          src="https://loremflickr.com/320/320/"
                          // alt="Bonnie Green image"
                        />
                        <div>
                          <div className="text-base font-normal text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {item?.user?.name}
                            </span>{" "}
                            {item?.remark} your Post
                          </div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                            {moment(item?.updated_at).fromNow()}
                          </span>
                        </div>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* End C0mments */}
            </div>
          </section>
          {/*  */}
        </div>
      </LayoutComponent>
    </>
  );
}
