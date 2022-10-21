import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import IUser from "../types/IUser";
import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";

const initialState = {
  id: "",
  lastName: "",
  location: "",
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [isMember, setIsMember] = useState(true);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IUser>({ defaultValues: initialState });

  const { user, isLoading } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  useEffect(() => {
    if (errors.name?.message) {
      toast.error(errors.name.message);
    }
  }, [errors.name]);

  useEffect(() => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
  }, [errors.password]);

  const onSubmit = (data: IUser) => {
    if (isMember) {
      dispatch(loginUser(data));
    } else {
      dispatch(registerUser(data));
    }
  };

  const toggleMember = () => {
    setIsMember(!isMember);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h3>{isMember ? "Login" : "Register"}</h3>
        {!isMember && (
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-input"
              {...register("name", { required: "Name is required" })}
            />
          </div>
        )}
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({
                id: "",
                lastName: "",
                location: "",
                name: "",
                email: "testUser@test.com",
                password: "secret",
              })
            )
          }
        >
          {isLoading ? "loading..." : "demo app"}
        </button>
        <p>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
