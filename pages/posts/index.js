import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { Dropdown, Button, Modal } from "flowbite-react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";

export default function Posts({ all = true }) {
  const router = useRouter();
  const [openModalPost, setOpenModalPost] = useState(false);
  const [openModalReplies, setOpenModalReplies] = useState(false);
  const { mutate } = useMutation();
  const [payload, setPayload] = useState();
  const [dataReplies, setDataReplies] = useState([]);
  const [idReplies, setIdReplies] = useState();

  const { data: userData } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  // Post
  const HandleDelete = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      router.reload();
    }
  };

  const HandleModalUpdate = (item) => {
    setPayload(item);
    setOpenModalPost(true);
  };

  const HandleUpdatePost = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
      payload: { description: payload?.description },
    });
    if (!response?.success) {
      console.log("response : ", response);
    } else {
      router.reload();
    }
  };
  // End Post

  // Like
  const HandleLike = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("response : ", response);
    } else {
      router.reload();
    }
  };

  const HandleUnLike = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("response : ", response);
    } else {
      router.reload();
    }
  };
  // End Like

  // Replies
  const HandleModalReplies = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    setDataReplies(response);
    setIdReplies(id);
    setOpenModalReplies(true);
  };

  const HandleSubmitReplies = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
      payload: { description: payload?.description },
    });
    if (!response?.success) {
      console.log("response : ", response);
    } else {
      router.reload();
    }
  };

  const HandleDeleteReplies = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("response : ", response);
    } else {
      router.reload();
    }
  };
  // End Replies

  return (
    <>
      {/* Modal Replies */}
      <Modal
        dismissible
        show={openModalReplies}
        onClose={() => setOpenModalReplies(false)}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* Replies */}
            {dataReplies?.data?.length === 0 && (
              <div className="text-gray-600 dark:text-gray-400 text-center py-6">
                No replies
              </div>
            )}
            {dataReplies?.data?.map((item) => (
              <article className="bg-gray-100 p-4 mb-3 border-b border-l border-r ml-6 lg:ml-12 text-base rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="Jese Leos"
                      />
                      {item?.user?.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Feb. 12, 2022
                    </p>
                  </div>
                  {/* Dropdown */}
                  {item?.is_own_reply && (
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <button
                          id="dropdownComment1Button"
                          data-dropdown-toggle="dropdownComment1"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-gray-100 rounded-lg  dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                      )}
                    >
                      <Dropdown.Item
                        onClick={() => HandleDeleteReplies(item?.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  )}
                  {/* End Dropdown */}
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {item?.description}
                </p>
              </article>
            ))}
            {/* Form */}
            <form>
              <div className="  py-2 px-4 -mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
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
                  rows="1"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a replies..."
                  required
                ></textarea>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => HandleSubmitReplies(idReplies)}>
            Send a reply
          </Button>
          <Button color="gray" onClick={() => setOpenModalReplies(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Replies */}
      {/* Modal Update Post */}
      <Modal
        dismissible
        show={openModalPost}
        onClose={() => setOpenModalPost(false)}
      >
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form>
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
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => HandleUpdatePost(payload?.id)}>
            Edit Post
          </Button>
          <Button color="gray" onClick={() => setOpenModalPost(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End update post modal */}

      {userData?.data?.map((item) => {
        if (all) {
          return (
            <>
              <article
                key={item?.id}
                className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://loremflickr.com/320/320/"
                        alt="Bonnie Green"
                      />
                      {item?.user?.name}
                    </p>
                    <p className="text-sm mr-3 text-gray-600 dark:text-gray-400">
                      {moment(item?.updated_at).format("ddd, MMM DD, yyyy")}
                    </p>
                    {item?.created_at != item?.updated_at && (
                      <div>
                        <span className="text-xs font-medium text-gray-700 border p-[2px] bg-gray-200 rounded-sm">
                          Edited
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Dropdown */}
                  {item?.is_own_post && (
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <button
                          id="dropdownComment1Button"
                          data-dropdown-toggle="dropdownComment1"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                      )}
                    >
                      <Dropdown.Item onClick={() => HandleModalUpdate(item)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => HandleDelete(item?.id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  )}
                  {/* End Dropdown */}
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {item?.description}
                </p>
                {/* Like and Replies */}
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={() => {
                      item?.is_like_post
                        ? HandleUnLike(item?.id)
                        : HandleLike(item?.id);
                    }}
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className={
                        item?.is_like_post
                          ? "mr-1.5 w-3.5 h-3.5 fill-red-600"
                          : "mr-1.5 w-3.5 h-3.5"
                      }
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
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    {item?.likes_count || 0} Likes
                  </button>
                  <button
                    onClick={() => HandleModalReplies(item?.id)}
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    {item?.replies_count || 0} Replies
                  </button>
                </div>
              </article>
              {/* {item?.replies_count !== 0 && (
                
              )} */}
            </>
          );
        }
        if (!all) {
          if (item?.is_own_post === true) {
            return (
              <>
                <article
                  key={item?.id}
                  className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://loremflickr.com/320/320/"
                          alt="Bonnie Green"
                        />
                        {item?.user?.name}
                      </p>
                      <p className="text-sm mr-3 text-gray-600 dark:text-gray-400">
                        {moment(item?.updated_at).format("ddd, MMM DD, yyyy")}
                      </p>
                      {item?.created_at != item?.updated_at && (
                        <div>
                          <span className="text-xs font-medium text-gray-700 border p-[2px] bg-gray-200 rounded-sm">
                            Edited
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Dropdown */}
                    {item?.is_own_post && (
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 3"
                            >
                              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                            <span className="sr-only">Comment settings</span>
                          </button>
                        )}
                      >
                        <Dropdown.Item onClick={() => HandleModalUpdate(item)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => HandleDelete(item?.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                    )}
                    {/* End Dropdown */}
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item?.description}
                  </p>
                  {/* Like and Replies */}
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      onClick={() => {
                        item?.is_like_post
                          ? HandleUnLike(item?.id)
                          : HandleLike(item?.id);
                      }}
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className={
                          item?.is_like_post
                            ? "mr-1.5 w-3.5 h-3.5 fill-red-600"
                            : "mr-1.5 w-3.5 h-3.5"
                        }
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
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      {item?.likes_count || 0} Likes
                    </button>
                    <button
                      onClick={() => HandleModalReplies(item?.id)}
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      {item?.replies_count || 0} Replies
                    </button>
                  </div>
                </article>
                {/* {item?.replies_count !== 0 && (
                  
                )} */}
              </>
            );
          }
        }
      })}
    </>
  );
}
