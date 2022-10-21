import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IUser from "../../types/IUser";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { isLoading, user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  let initialState = {
    id: user?.id || "",
    password: user?.password || "",
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  };
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IUser>({ defaultValues: initialState });

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
    if (errors.lastName?.message) {
      toast.error(errors.lastName.message);
    }
  }, [errors.lastName]);

  useEffect(() => {
    if (errors.location?.message) {
      toast.error(errors.location.message);
    }
  }, [errors.location]);

  const onSubmit = (data: IUser) => {
    dispatch(updateUser(data));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3>profile</h3>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-input"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            className="form-input"
            {...register("lastName", { required: "Last Name is required" })}
          />
        </div>
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
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            className="form-input"
            {...register("location", { required: "Location is required" })}
          />
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "save changes"}
        </button>
      </form>
    </Wrapper>
  );
};
export default Profile;
