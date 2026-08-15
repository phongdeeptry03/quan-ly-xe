import { NextResponse } from "next/server";
import { signSession, validSession } from "../../../lib_auth";

export async function POST(req) {
  const {password} = await req.json();
  if (!process.env.APP_PASSWORD || password !== process.env.APP_PASSWORD) {
    return NextResponse.json({error:"Mật khẩu không đúng"}, {status:401});
  }
  const res = NextResponse.json({ok:true});
  res.cookies.set("truck_session", signSession(), {
    httpOnly:true, secure:true, sameSite:"lax", path:"/", maxAge:7*24*60*60
  });
  return res;
}

export async function DELETE(req) {
  const res = NextResponse.json({ok:true});
  res.cookies.set("truck_session","",{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:0});
  return res;
}

export async function GET(req) {
  const ok=validSession(req.cookies.get("truck_session")?.value);
  return NextResponse.json({authenticated:ok});
}
