import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  FiMail,
  FiLock,
  FiPhone,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../utils/cn";

export default function Register() {
  const [form, setForm] = useState({
    ho: "",
    tendem: "",
    ten: "",
    email: "",
    password: "",
    password_confirmation: "",
    sdt: "",
    diachi: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { mergeCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      return showToast("Mật khẩu không khớp", "error");
    }

    setLoading(true);
    try {
      await register(form);
      await mergeCart();
      showToast("Đăng ký thành công", "success");
      navigate("/account");
    } catch {
      showToast("Lỗi đăng ký tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl">
              <FiUser />
            </div>
            <h1 className="text-2xl font-bold text-secondary">
              Tạo tài khoản
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Tham gia để nhận ưu đãi và quản lý đơn hàng
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                icon={<FiUser />}
                placeholder="Họ"
                value={form.ho}
                onChange={(v) => handleChange("ho", v)}
              />
              <Input
                placeholder="Tên đệm"
                value={form.tendem}
                onChange={(v) => handleChange("tendem", v)}
              />
              <Input
                placeholder="Tên"
                value={form.ten}
                onChange={(v) => handleChange("ten", v)}
              />
            </div>

            {/* CONTACT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                icon={<FiMail />}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(v) => handleChange("email", v)}
              />
              <Input
                icon={<FiPhone />}
                placeholder="Số điện thoại"
                value={form.sdt}
                onChange={(v) => handleChange("sdt", v)}
              />
            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                icon={<FiLock />}
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(v) => handleChange("password", v)}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                }
              />
              <Input
                icon={<FiLock />}
                type={showPassword ? "text" : "password"}
                placeholder="Xác nhận"
                value={form.password_confirmation}
                onChange={(v) =>
                  handleChange("password_confirmation", v)
                }
              />
            </div>

            {/* ADDRESS */}
            <textarea
              rows="2"
              placeholder="Địa chỉ"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              value={form.diachi}
              onChange={(e) => handleChange("diachi", e.target.value)}
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Đăng ký <FiArrowRight />
                </>
              )}
            </button>

            {/* LOGIN */}
            <p className="text-center text-sm text-slate-500">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===== INPUT ===== */

function Input({ icon, rightIcon, onChange, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}

      <input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border border-slate-200 rounded-lg py-2.5 text-sm outline-none transition",
          "focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "bg-white hover:border-slate-300",
          icon ? "pl-9" : "px-3",
          rightIcon && "pr-9"
        )}
      />

      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          {rightIcon}
        </span>
      )}
    </div>
  );
}