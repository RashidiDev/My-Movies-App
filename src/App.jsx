import supabase from "./supabase";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import { useContext, useEffect, useState } from "react";
import BgEffects from "./components/BgEffects";
import Hero from "./components/Hero";
import SignIn from "./components/Signing/SignIn";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Signing/SignUp";
import { NewMovie } from "./pages/NewMovie/NewMovie";
import { isSignedInContext } from "./contexts/IsSignedInContext";
import Loading from "./components/Loading";

function App() {
  // function test() {
  //   document.documentElement.classList.add("dark");
  //   console.log("first");
  // }
  // test();
  const { isSignedIn, setIsSignedIn } = useContext(isSignedInContext);
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsSignedIn(true);
      if (user) {
        setUserData(user.user_metadata);
      } else {
        setUserData("");
        setIsSignedIn(false);
      }
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      setUserData("");
    }
  }, [isSignedIn]);

  const signInHandler = user => {
    setUserData(user);
  };

  const signOutAnimation = state => {
    setIsLoading(state);
  };

  return (
    <div className="relative h-dvh overflow-x-hidden dark:text-white">
      {isLoading && <Loading />}
      <Header
        userName={userData ? userData.Name : null}
        signOutAnimation={signOutAnimation}
      />
      <Routes>
        <Route path="" element={<Hero isSignedIn={isSignedIn} />} />

        <Route path="signIn" element={<SignIn onSignIn={signInHandler} />} />

        <Route path="signUp" element={<SignUp onSignIn={signInHandler} />} />
        {isSignedIn && <Route path="movies" element={<MovieList />} />}
        {true && <Route path="movies/new" element={<NewMovie />} />}
      </Routes>
      <BgEffects />
    </div>
  );
}

export default App;
