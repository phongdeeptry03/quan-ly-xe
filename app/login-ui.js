"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login(){
 const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const router=useRouter();
 async function submit(e){e.preventDefault();setLoading(true);setError("");const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});const d=await r.json();setLoading(false);if(!r.ok){setError(d.error||"Đăng nhập thất bại");return}router.replace("/");router.refresh();}
 return <main className="login"><form className="loginbox" onSubmit={submit}><h1>🚚 Quản lý chuyến xe</h1><p className="muted">Đăng nhập để quản lý doanh thu, chi phí và lợi nhuận.</p><div className="field"><label>Mật khẩu</label><input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nhập mật khẩu"/></div>{error&&<div className="error">{error}</div>}<button className="btn primary" disabled={loading}>{loading?"ĐANG ĐĂNG NHẬP...":"ĐĂNG NHẬP"}</button></form></main>
}
