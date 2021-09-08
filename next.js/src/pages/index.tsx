import type { NextPage } from "next";
import useSWR from "swr";
import { useAuthHttp } from "../hooks/useAuthHttp";

const Home: NextPage = () => {
  const { data: user, error } = useAuthHttp("user");
  //Context API
  return user ? <div>Hello World</div> : null;
};

export default Home;
