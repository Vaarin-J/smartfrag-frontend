"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    router.push("/dashboard");
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert("Google login failed: " + error.message);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".fade-container",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="bg-img14 min-h-screen flex items-center justify-center px-4">
      <div className="fade-container">
        <div className="auth-card">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-underline"
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-underline"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" className="btn-submit mt-2">Sign in</button>

            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-100">Remember me</label>
            </div>
          </form>

          <div className="divider mt-14 mb-8">ACCESS QUICKLY</div>

          <div className="flex justify-between gap-3 mt-6">
            <button type="button" onClick={signInWithGoogle} className="btn-social">Google</button>
            <button type="button" className="btn-social">LinkedIn</button>
            <button type="button" className="btn-social">SSO</button>
          </div>

          <p className="text-sm text-center text-gray-600 mt-14">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
