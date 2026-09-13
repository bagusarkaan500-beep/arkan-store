const express = require("express");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "data", "orders.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readOrders(){
  if(!fs.existsSync(DB_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(DB_FILE,"utf8")); } catch { return []; }
}
function writeOrders(orders){
  fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
}
function orderId(){ return "ARK-" + Math.floor(100000 + Math.random()*900000); }

app.post("/api/orders", (req,res)=>{
  const {service, price, name, gameid, detail} = req.body;
  if(!service || !name || !gameid) return res.status(400).json({error:"Data pesanan belum lengkap."});
  const orders=readOrders();
  const order={id:orderId(),service,price:Number(price)||0,name,gameid,detail:detail||"",
    payment_status:"pending",order_status:"menunggu_pembayaran",created_at:new Date().toISOString()};
  orders.push(order); writeOrders(orders);
  res.json(order);
});

app.get("/api/orders/:id",(req,res)=>{
  const order=readOrders().find(x=>x.id===req.params.id);
  if(!order) return res.status(404).json({error:"Pesanan tidak ditemukan."});
  res.json(order);
});

/*
 PAYMENT GATEWAY PLACEHOLDER
 ---------------------------
 Setelah akun merchant milik orang tua/wali sudah siap, letakkan kredensial
 payment gateway di environment variables SERVER-SIDE (JANGAN di frontend).
 Endpoint ini adalah tempat membuat transaksi pembayaran.

 Untuk Midtrans, server membuat transaksi/QRIS melalui API, lalu webhook
 provider memanggil endpoint webhook di bawah. Jangan mengubah status
 pembayaran hanya berdasarkan redirect browser.
*/
app.post("/api/payment/create",(req,res)=>{
  res.status(501).json({
    error:"Payment gateway belum dikonfigurasi.",
    next:"Tambahkan kredensial merchant di server dan implementasikan create transaction."
  });
});

app.post("/api/payment/webhook",(req,res)=>{
  // TODO: verifikasi signature/webhook dari payment provider,
  // lalu ubah payment_status menjadi "paid" dan order_status menjadi "diproses".
  console.log("Webhook received:", req.body);
  res.json({ok:true});
});

app.listen(PORT,()=>console.log(`ARKAN STORE running at http://localhost:${PORT}`));
