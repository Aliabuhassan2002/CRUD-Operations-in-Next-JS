import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ id: decoded.id, name: decoded.name });
  } catch (error) {
    return Response.json({ error: "Invalid Token" }, { status: 401 });
  }
}
