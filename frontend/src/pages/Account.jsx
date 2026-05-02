import { useEffect, useMemo, useState, useCallback } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import {
  FiUser, FiPackage, FiKey, FiLogOut, FiPhone, FiCalendar, FiSave, FiMapPin, FiHeart
} from "react-icons/fi";
import { cn } from "../utils/cn";
import { Loading, Input } from "@/shared/ui";
import AddressManager from "../components/Account/AddressManager";

export default function Account() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("info");
  const [profile, setProfile] = useState({ ho: "", tendem: "", ten: "", sdt: "", ngaysinh: "" });
  const [addresses, setAddresses] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const [accountRes, addrRes, orderRes] = await Promise.all([
        api.get("/account"), api.get("/addresses"), api.get("/orders"),
      ]);
      const p = accountRes.data.data || accountRes.data || {};
      setProfile({
        ho: p.ho || "", tendem: p.tendem || "", ten: p.ten || "",
        sdt: p.phone || p.sdt || "", ngaysinh: p.birthday ? p.birthday.split(" ")[0] : "",
      });
      setAddresses(Array.isArray(addrRes.data) ? addrRes.data : []);
      setOrderCount(orderRes.data.meta?.total || orderRes.data.length || 0);
    } catch {
      showToast("Lỗi đồng bộ dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) return <Loading message="Đang mở hồ sơ của bạn..." />;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <AccountSidebar 
              user={user} 
              profile={profile} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              orderCount={orderCount}
              onLogout={logout}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {activeTab === "info" && (
              <>
                <ProfileSection profile={profile} setProfile={setProfile} onUpdate={fetchData} />
                <AddressManager addresses={addresses} onRefresh={fetchData} />
              </>
            )}

            {activeTab === "password" && <PasswordSection />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* --- Internal Components --- */

function AccountSidebar({ user, profile, activeTab, onTabChange, orderCount, onLogout }) {
  const initials = `${profile.ho?.[0] || ""}${profile.ten?.[0] || ""}`.toUpperCase();
  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-xl shadow-slate-200/50 lg:sticky lg:top-24">
      <div className="p-8 text-center border-b border-slate-50">
        <div className="w-24 h-24 mx-auto bg-slate-900 text-white flex items-center justify-center text-3xl font-black rounded-sm mb-4 shadow-lg">
          {initials || <FiUser />}
        </div>
        <h2 className="text-xl font-black text-secondary uppercase tracking-tight truncate">{profile.ho} {profile.ten}</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 truncate">{user?.email}</p>
      </div>

      <nav className="p-4 space-y-2">
        <SidebarBtn active={activeTab === "info"} onClick={() => onTabChange("info")} icon={<FiUser />} label="Thông tin cá nhân" />
        <Link to="/orders" className="w-full flex items-center justify-between p-4 rounded-sm text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition">
          <span className="flex items-center gap-3"><FiPackage size={18} /> Đơn hàng của tôi</span>
          <span className="bg-slate-100 px-2 py-1 rounded-sm">{orderCount}</span>
        </Link>
        <SidebarBtn active={activeTab === "password"} onClick={() => onTabChange("password")} icon={<FiKey />} label="Bảo mật tài khoản" />
        <Link to="/wishlist" className="w-full flex items-center gap-3 p-4 rounded-sm text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition">
          <FiHeart size={18} /> Sản phẩm yêu thích
        </Link>
        <div className="h-px bg-slate-50 my-2" />
        <button onClick={onLogout} className="w-full flex items-center gap-3 p-4 rounded-sm text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all cursor-pointer">
          <FiLogOut size={18} /> Đăng xuất
        </button>
      </nav>
    </div>
  );
}

function ProfileSection({ profile, setProfile, onUpdate }) {
  const { showToast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/account/profile", profile);
      showToast("Cập nhật hồ sơ thành công", "success");
      onUpdate();
    } catch { showToast("Lỗi cập nhật hồ sơ", "error"); }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">Thông tin cá nhân</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cập nhật hồ sơ để nhận nhiều ưu đãi hơn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Họ" value={profile.ho} onChange={e => setProfile({...profile, ho: e.target.value})} className="bg-slate-50 border-none font-bold" />
          <Input label="Tên đệm" value={profile.tendem} onChange={e => setProfile({...profile, tendem: e.target.value})} className="bg-slate-50 border-none font-bold" />
          <Input label="Tên" value={profile.ten} onChange={e => setProfile({...profile, ten: e.target.value})} className="bg-slate-50 border-none font-bold" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Số điện thoại" icon={FiPhone} value={profile.sdt} onChange={e => setProfile({...profile, sdt: e.target.value})} className="bg-slate-50 border-none font-bold" />
          <Input label="Ngày sinh" icon={FiCalendar} type="date" value={profile.ngaysinh} onChange={e => setProfile({...profile, ngaysinh: e.target.value})} className="bg-slate-50 border-none font-bold" />
        </div>
        <button type="submit" className="btn-dark px-10 py-4 flex items-center gap-3">
          <FiSave /> Cập nhật hồ sơ
        </button>
      </form>
    </section>
  );
}

function PasswordSection() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ old_password: "", password: "", password_confirmation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) return showToast("Mật khẩu không khớp", "error");
    try {
      await api.put("/account/password", form);
      showToast("Đổi mật khẩu thành công", "success");
      setForm({ old_password: "", password: "", password_confirmation: "" });
    } catch (err) { showToast(err.response?.data?.message || "Lỗi đổi mật khẩu", "error"); }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-sm shadow-sm p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-secondary uppercase tracking-tight">Bảo mật tài khoản</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Sử dụng mật khẩu mạnh để bảo vệ tài khoản</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <Input label="Mật khẩu hiện tại" type="password" value={form.old_password} onChange={e => setForm({...form, old_password: e.target.value})} className="bg-slate-50 border-none font-bold" />
        <Input label="Mật khẩu mới" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="bg-slate-50 border-none font-bold" />
        <Input label="Xác nhận mật khẩu mới" type="password" value={form.password_confirmation} onChange={e => setForm({...form, password_confirmation: e.target.value})} className="bg-slate-50 border-none font-bold" />
        <button type="submit" className="btn-dark px-10 py-4 flex items-center gap-3"><FiSave /> Đổi mật khẩu</button>
      </form>
    </section>
  );
}

function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={cn(
      "w-full flex items-center gap-3 p-4 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer",
      active ? "bg-slate-900 text-white shadow-xl" : "text-slate-500 hover:bg-slate-50"
    )}>
      <span className={active ? "text-primary" : "text-slate-300"}>{icon}</span>
      {label}
    </button>
  );
}
