import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/services/supabase";

const EmailConfirmation: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get("access_token");

      if (!accessToken) {
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        access_token: accessToken,
      });

      if (error) {
        console.error("Email confirmation error:", error.message);
        setStatus("error");
      } else {
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "loading" && <p>Confirming your email...</p>}
      {status === "success" && (
        <p>Your email has been confirmed! Redirecting to the login page...</p>
      )}
      {status === "error" && (
        <p>
          There was an error confirming your email. Please try again or contact
          support.
        </p>
      )}
    </div>
  );
};

export default EmailConfirmation;
