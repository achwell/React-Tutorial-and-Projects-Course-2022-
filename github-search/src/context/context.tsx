import React, { useState, useEffect, createContext, FC } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import Repo from "../types/Repo";
import Owner from "../types/Owner";
import GithubUser from "../types/GithubUser";

const rootUrl = "https://api.github.com";

interface IContext {
  githubUser?: GithubUser;
  repos: Repo[];
  followers: Owner[];
  requests: number;
  error: { show: boolean; msg: string };
  searchGithubUser: (user: string) => void;
  isLoading: boolean;
}

const initialState = {
  githubUser: undefined,
  repos: [],
  followers: [],
  requests: 0,
  error: { msg: "", show: false },
  searchGithubUser(_: string): void {},
  isLoading: false,
};

const GithubContext = createContext<IContext>({
  ...initialState,
});

// Provider, Consumer - GithubContext.Provider

const GithubProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [githubUser, setGithubUser] = useState<GithubUser>(mockUser);
  const [repos, setRepos] = useState<Repo[]>(mockRepos);
  const [followers, setFollowers] = useState<Owner[]>(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user: string) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };

  //  check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  // error
  useEffect(checkRequests, []);
  // get initial user
  useEffect(() => {
    searchGithubUser("john-smilga");
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
