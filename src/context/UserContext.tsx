import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "@/services/supabase";

type User = {
  id: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  session: unknown | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<unknown | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      if (data.session) {
        setSession(data.session);
        setIsAuthenticated(true);
        const { user } = data.session;
        if (user) {
          setUser({
            id: user.id,
            email: user.email!,
          });
        }
      }
      setLoading(false);
    };
    fetchSession();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email!,
      });

      if (data.session) {
        setSession(data.session);
        setIsAuthenticated(true);
      } else {
        console.log(
          "No session returned. Email confirmation might be required."
        );
      }
    }
  };

  const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email!,
      });

      if (data.session) {
        setSession(data.session);
        setIsAuthenticated(true);
      } else {
        console.log(
          "No session returned. Email confirmation might be required."
        );
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ session, user, isAuthenticated, login, signup, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
