import User from "../../lib/models/User";
import connectMongoDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, email } = await req.json();
    const newUser = await User.create({ name, email, isDeleted: false });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });
    return NextResponse.json(newUser, { status: 201 }); // ✅ تأكد أنك ترجع البيانات الصحيحة
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  //   await connectMongoDB();
  const users = await User.find({ isDeleted: false });
  return NextResponse.json(users);
}

export async function PATCH(req) {
  //   await connectMongoDB();
  const { id, name, email } = await req.json();
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );
  return NextResponse.json(updatedUser);
}
export async function DELETE(req) {
  //   await connectMongoDB();
  const { id } = await req.json();
  await User.findByIdAndUpdate(id, { isDeleted: true });
  return NextResponse.json({ message: "User soft deleted" });
}
