import { NextResponse } from "next/server";
export function GET() {
  try {
    const response = NextResponse.json({message:"Logout Successfull"}, { status: 200 });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
