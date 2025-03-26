"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => router.push("/Users")); // ❌ إعادة التوجيه إذا لم يكن مسجلاً
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h1>Welcome, {user.name}!</h1>;
}
