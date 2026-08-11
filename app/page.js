import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validSession } from "../lib_auth";
import Dashboard from "./ui";

export default async function Page(){
  const c=await cookies();
  if(!validSession(c.get("truck_session")?.value)) redirect("/login");
  return <Dashboard/>;
}
