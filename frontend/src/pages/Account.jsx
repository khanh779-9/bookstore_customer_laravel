import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FiUser,
  FiPackage,
  FiKey,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiMapPin,
  FiCalendar,
  FiPhone,
  FiSave,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { cn } from "../utils/cn";
import Loading from "../components/Common/Loading";
import ConfirmModal from "../components/Common/ConfirmModal";
import Input from "../components/Common/Input";
import TextArea from "../components/Common/TextArea";

export default function Account() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("info");
  const [profile, setProfile] = useState({
    ho: "",
    tendem: "",
    ten: "",
    sdt: "",
    ngaysinh: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [confirmDeleteAddr, setConfirmDeleteAddr] = useState({ isOpen: false, id: null });

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!user) {
        if (mounted) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [accountRes, addrRes, orderRes] = await Promise.all([
          api.get("/account"),
          api.get("/addresses"),
          api.get("/orders"),
        ]);

        if (!mounted) return;

        const p = accountRes.data.data || accountRes.data || {};
        setProfile({
          ho: p.ho || "",
          tendem: p.tendem || "",
          ten: p.ten || "",
          sdt: p.phone || p.sdt || "",
          ngaysinh: p.birthday ? p.birthday.split(" ")[0] : "",
        });

        setAddresses(Array.isArray(addrRes.data) ? addrRes.data : []);
        setOrderCount(orderRes.data.data ? orderRes.data.data.length : (Array.isArray(orderRes.data) ? orderRes.data.length : 0));
      } catch {
        toast.error("Không tải được dữ liệu tài khoản");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [user]);

  const fullName = useMemo(() => {
    return [profile.ho, profile.tendem, profile.ten].filter(Boolean).join(" ");
  }, [profile.ho, profile.tendem, profile.ten]);

  const initials = useMemo(() => {
    const first = profile.ho?.[0] || "";
    const last = profile.ten?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [profile.ho, profile.ten]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...profile };
      if (user?.email) payload.email = user.email;

      await api.put("/account/profile", payload);
      toast.success("Cập nhật hồ sơ thành công");
    } catch {
      toast.error("Lỗi cập nhật hồ sơ");
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await api.put(`/addresses/${editingAddress.dcgh_id}`, {
          diachi: newAddress,
        });
        toast.success("Cập nhật địa chỉ thành công");
      } else {
        await api.post("/addresses", { diachi: newAddress });
        toast.success("Thêm địa chỉ mới thành công");
      }

      const res = await api.get("/addresses");
      setAddresses(Array.isArray(res.data) ? res.data : []);
      setShowAddressModal(false);
      setEditingAddress(null);
      setNewAddress("");
    } catch {
      toast.error("Lỗi lưu địa chỉ");
    }
  };

  const handleDeleteAddress = (id) => {
    setConfirmDeleteAddr({ isOpen: true, id });
  };

  const onConfirmDeleteAddr = async () => {
    const id = confirmDeleteAddr.id;
    try {
      await api.delete(`/addresses/${id}`);
      toast.success("Đã xóa địa chỉ");
      setAddresses((prev) => prev.filter((a) => a.dcgh_id !== id));
    } catch {
      toast.error("Lỗi xóa địa chỉ");
    } finally {
      setConfirmDeleteAddr({ isOpen: false, id: null });
    }
  };

  const openAddAddress = () => {
    setEditingAddress(null);
    setNewAddress("");
    setShowAddressModal(true);
  };

  const openEditAddress = (addr) => {
    setEditingAddress(addr);
    setNewAddress(addr.diachi || "");
    setShowAddressModal(true);
  };

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.password !== passwordForm.password_confirmation) {
      return toast.error("Mật khẩu xác nhận không khớp");
    }

    try {
      await api.put("/account/password", passwordForm);
      toast.success("Đổi mật khẩu thành công");
      setPasswordForm({
        old_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi đổi mật khẩu");
    }
  };

  if (loading) {
    return <Loading message="Đang chuẩn bị hồ sơ của bạn..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-24">
              <div className="p-6 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-primary/20">
                  {initials || <FiUser />}
                </div>

                <h2 className="mt-4 text-lg font-bold text-secondary">
                  {fullName || "Tài khoản"}
                </h2>
                <p className="text-xs text-slate-400 mt-1 break-all">
                  {user?.email}
                </p>
              </div>

              <nav className="p-3 space-y-1">
                <SidebarButton
                  active={activeTab === "info"}
                  onClick={() => setActiveTab("info")}
                  icon={<FiUser />}
                  label="Thông tin tài khoản"
                />

                <Link
                  to="/orders"
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-3">
                    <FiPackage className="text-slate-400" />
                    Đơn hàng của tôi
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                    {orderCount}
                  </span>
                </Link>

                <SidebarButton
                  active={activeTab === "password"}
                  onClick={() => setActiveTab("password")}
                  icon={<FiKey />}
                  label="Đổi mật khẩu"
                />

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition mt-2"
                >
                  <FiLogOut className="text-red-400" />
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-6">
            <div className="lg:hidden bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex gap-2 overflow-x-auto">
              <MobileTab
                active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
                icon={<FiUser />}
                label="Hồ sơ"
              />
              <MobileTab
                active={activeTab === "password"}
                onClick={() => setActiveTab("password")}
                icon={<FiKey />}
                label="Mật khẩu"
              />
              <Link
                to="/orders"
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-50"
              >
                Đơn hàng
              </Link>
            </div>

            {activeTab === "info" && (
              <div className="space-y-6">
                <SectionCard
                  title="Thông tin cá nhân"
                  subtitle="Cập nhật hồ sơ và thông tin liên hệ"
                >
                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Họ"
                        value={profile.ho}
                        onChange={(e) => setProfile({ ...profile, ho: e.target.value })}
                        placeholder="Họ"
                      />
                      <Input
                        label="Tên đệm"
                        value={profile.tendem}
                        onChange={(e) => setProfile({ ...profile, tendem: e.target.value })}
                        placeholder="Tên đệm"
                      />
                      <Input
                        label="Tên"
                        value={profile.ten}
                        onChange={(e) => setProfile({ ...profile, ten: e.target.value })}
                        placeholder="Tên"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Số điện thoại"
                        icon={FiPhone}
                        value={profile.sdt}
                        onChange={(e) => setProfile({ ...profile, sdt: e.target.value })}
                        placeholder="Số điện thoại"
                      />
                      <Input
                        label="Ngày sinh"
                        icon={FiCalendar}
                        type="date"
                        value={profile.ngaysinh}
                        onChange={(e) => setProfile({ ...profile, ngaysinh: e.target.value })}
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
                      >
                        <FiSave />
                        Cập nhật hồ sơ
                      </button>
                    </div>
                  </form>
                </SectionCard>

                <SectionCard
                  title="Địa chỉ giao hàng"
                  subtitle="Quản lý địa chỉ nhận hàng của bạn"
                  action={
                    <button
                      onClick={openAddAddress}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition"
                    >
                      <FiPlus />
                      Thêm mới
                    </button>
                  }
                >
                  {addresses.length === 0 ? (
                    <EmptyState
                      icon={<FiMapPin />}
                      title="Chưa có địa chỉ giao hàng nào"
                      desc="Thêm một địa chỉ để đặt hàng nhanh hơn."
                      action={
                        <button
                          onClick={openAddAddress}
                          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                        >
                          <FiPlus />
                          Thêm địa chỉ
                        </button>
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div
                          key={addr.dcgh_id}
                          className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/20 hover:shadow-sm transition"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition">
                              <FiMapPin />
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => openEditAddress(addr)}
                                className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-50 transition"
                                aria-label="Sửa địa chỉ"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAddress(addr.dcgh_id)}
                                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                                aria-label="Xóa địa chỉ"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed">
                            {addr.diachi}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </div>
            )}

            {activeTab === "password" && (
              <SectionCard
                title="Đổi mật khẩu"
                subtitle="Cập nhật mật khẩu để tăng bảo mật cho tài khoản"
              >
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-4 max-w-xl"
                >
                  <Input
                    label="Mật khẩu hiện tại"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    value={passwordForm.old_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                  />
                  <Input
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                  />
                  <Input
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={passwordForm.password_confirmation}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
                  >
                    <FiSave />
                    Cập nhật mật khẩu
                  </button>
                </form>
              </SectionCard>
            )}
          </main>
        </div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowAddressModal(false)}
          />

          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-secondary">
                  {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Nhập địa chỉ chi tiết để giao hàng chính xác hơn
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition flex items-center justify-center"
                aria-label="Đóng"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-5 space-y-4">
              <TextArea
                label="Địa chỉ chi tiết"
                rows={4}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:shadow-md transition"
                >
                  <FiSave />
                  Lưu địa chỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmDeleteAddr.isOpen}
        onClose={() => setConfirmDeleteAddr({ isOpen: false, id: null })}
        onConfirm={onConfirmDeleteAddr}
        title="Xóa địa chỉ"
        message="Bạn có chắc chắn muốn xóa địa chỉ giao hàng này không?"
        confirmText="Xóa ngay"
        type="danger"
      />
    </div>
  );
}

function SidebarButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
        active
          ? "bg-primary text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-50"
      )}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      {label}
    </button>
  );
}

function MobileTab({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition",
        active
          ? "bg-primary text-white"
          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
      )}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 md:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-secondary">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

function EmptyState({ icon, title, desc, action }) {
  return (
    <div className="py-10 text-center">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center text-xl">
        {icon}
      </div>
      <h4 className="mt-4 text-sm font-semibold text-secondary">{title}</h4>
      <p className="mt-2 text-sm text-slate-400">{desc}</p>
      {action}
    </div>
  );
}