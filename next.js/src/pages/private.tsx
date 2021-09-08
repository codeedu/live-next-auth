import { NextPage } from "next";
import { withAuth } from "../hof/withAuth";
import { http } from "../util/http";

interface PrivatePageProps {
  name: string;
  payload: any;
}

const PrivatePage: NextPage<PrivatePageProps> = (props) => {
  console.log(props.payload);
  return <div>Pagina privada {props.name}</div>;
};

export default PrivatePage;

export const getServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
      console.log(cookies);
    const { data } = await http.get("test-auth", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    return {
      props: data,
    };
  }
);

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = parseCookies(ctx.req);

//   if (!cookies.token || isTokenExpired(cookies.token)) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   //try {
//     const { data } = await http.get("test-auth", {
//       headers: {
//         Authorization: `Bearer ${cookies.token}`,
//       },
//     });
// //   } catch (e) {
// //     if (
// //       axios.isAxiosError(e) &&
// //       (e.response?.status === 401 || e.response?.status === 403)
// //     ) {
// //       return {
// //         redirect: {
// //           permanent: false,
// //           destination: "/login",
// //         },
// //       };
// //     }

// //     throw e;
// //   }

//   return {
//     props: data,
//   };
// };
//JWT - tempo de vida - 60s
