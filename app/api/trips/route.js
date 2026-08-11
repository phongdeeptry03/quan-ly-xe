import { NextResponse } from "next/server";
import { db } from "../../../lib_db";
import { validSession } from "../../../lib_auth";

function auth(req){ return validSession(req.cookies.get("truck_session")?.value); }

export async function GET(req){
  if(!auth(req)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const sql=db();
  const rows=await sql`select id, created_at, date, customer, from_place, to_place, km, revenue, costs, cost, profit from trips order by date desc, created_at desc`;
  return NextResponse.json(rows);
}

export async function POST(req){
  if(!auth(req)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const x=await req.json(); const sql=db();
  const rows=await sql`
    insert into trips(date,customer,from_place,to_place,km,revenue,costs,cost,profit)
    values(${x.date},${x.customer||""},${x.from||""},${x.to||""},${Number(x.km)||0},${Number(x.revenue)||0},${JSON.stringify(x.costs||{})},${Number(x.cost)||0},${Number(x.profit)||0})
    returning *
  `;
  return NextResponse.json(rows[0],{status:201});
}

export async function PATCH(req){
  if(!auth(req)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const id=new URL(req.url).searchParams.get("id"); if(!id) return NextResponse.json({error:"Missing id"},{status:400});
  const x=await req.json(); const sql=db();
  const rows=await sql`
    update trips set date=${x.date},customer=${x.customer||""},from_place=${x.from||""},to_place=${x.to||""},km=${Number(x.km)||0},revenue=${Number(x.revenue)||0},costs=${JSON.stringify(x.costs||{})},cost=${Number(x.cost)||0},profit=${Number(x.profit)||0}
    where id=${Number(id)} returning *
  `;
  return NextResponse.json(rows[0]||null);
}

export async function DELETE(req){
  if(!auth(req)) return NextResponse.json({error:"Unauthorized"},{status:401});
  const id=new URL(req.url).searchParams.get("id"); if(!id) return NextResponse.json({error:"Missing id"},{status:400});
  const sql=db(); await sql`delete from trips where id=${Number(id)}`;
  return NextResponse.json({ok:true});
}
