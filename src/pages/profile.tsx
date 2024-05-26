import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: useToken
          ? { Authorization: "Bearer " + session?.access_token }
          : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      setResponse(error.message);
    }
  };

  if (status == "loading") {
    return <p>loading</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col m-8">
        <div className="flex flex-col">
          <p>PK: {session.user.pk}</p>
          <p>Username: {session.user.username}</p>
          <p>Email: {session.user.email || "Not provided"}</p>
          <code>{response}</code>
        </div>

        <div className="flex flex-row justify-center">
          <button className="bg-blue-400" onClick={() => getUserDetails(true)}>
            User details (with token)
          </button>
          <button
            className="bg-orange-400"
            onClick={() => getUserDetails(false)}
          >
            User details (without token)
          </button>
          <button
            className="bg-red-400"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <></>;
}
