import { useState } from "react";
import { useCookies } from "react-cookie";
import dotenv from 'dotenv'


interface Props {
  ReactServerHost: string;
}
interface authData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth = ({ ReactServerHost }: Props) => {
  const [cockies, setCockies, removeCookie] = useCookies<string>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [authData, setAuthData] = useState<authData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const viewLogin = (status: boolean) => {
    setError(null);
    setIsLogin(status);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent, endpoint: string) => {
    e.preventDefault();
    if (!isLogin && authData.password !== authData.confirmPassword) {
      setError("Make sure passwords match");
      return;
    }
    const response = await fetch(`${ReactServerHost}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    });
    const data: any = await response.json();
    console.log(data);
    if (error) {
      setError(data.detail);
    } else {
      setCockies("Email", data.email);
      setCockies("AuthToken", data.authToken);

      window.location.reload();
    }
  };
  const isValid = authData.email && authData.password !== "";

  return (
    <div className="mx-auto w-2/4 mt-15 bg-white shadow-md pt-6 rounded-lg px-4 mb-4">
      <form action="submit" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-green-primary">
          {isLogin ? "Login" : "Register"}
        </h2>
        <input
          name="email"
          value={authData.email}
          type="text"
          placeholder="Email"
          className="border-2 border-green-ligth rounded-md p-2 "
          onChange={handleChange}
        />
        <input
          name="password"
          value={authData.password}
          type="password"
          placeholder="Password"
          className="border-2  rounded-md p-2 border-green-ligth"
          onChange={handleChange}
        />
        {!isLogin && (
          <input
            name="confirmPassword"
            value={authData.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="border-2 rounded-md p-2 border-green-ligth"
            onChange={handleChange}
          />
        )}
        <button
          type="submit"
          className={`${
            isValid && "hover:bg-green-primary"
          } p-2 rounded bg-green-ligth focus:bg-green-primary text-white`}
          {...(error && { disabled: true })}
          onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          disabled={!isValid}
        >
          Submit
        </button>
        {error && <p className="text-red-primary mx-2 mb-3">{error}</p>}
      </form>
      <div className="flex justify-around mt-3 pb-5">
        <button
          className={`w-1/2 py-1 ${
            !isLogin ? "bg-gray-primary" : "bg-white"
          } text-gray-dark rounded`}
          onClick={() => viewLogin(false)}
        >
          Sign Up
        </button>
        <button
          className={`w-1/2  ${
            isLogin ? "bg-gray-primary" : "bg-white"
          } text-gray-dark rounded`}
          onClick={() => viewLogin(true)}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Auth;
