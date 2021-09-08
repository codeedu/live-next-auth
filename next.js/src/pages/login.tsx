import { FormEvent } from "react";
import styles from "../styles/LoginPage.module.css";
import { setCookie } from "../util/cookies";
import { http } from "../util/http";
import {useRouter} from 'next/router';

const LoginPage = () => {

  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;

    const { data } = await http.post("login", { username, password });
    setCookie("token", data.token);
    router.push('/private')
  }

  return (
    <form method="post" onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Usuário</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
