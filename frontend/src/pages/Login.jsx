import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../utils/cn";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { mergeCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form.email, form.password);
      await mergeCart();
      showToast("Đăng nhập thành công", "success");
      navigate("/account");
    } catch {
      showToast("Email hoặc mật khẩu không đúng", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg">
              <FiLock />
            </div>
            <h1 className="text-2xl font-bold text-secondary">
              Đăng nhập
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Chào mừng bạn quay lại
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              icon={<FiMail />}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />

            <div>
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

              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

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
                  Đăng nhập <FiArrowRight />
                </>
              )}
            </button>

            {/* REGISTER */}
            <p className="text-center text-sm text-slate-500">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Đăng ký
              </Link>
            </p>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">Hoặc</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="w-full border border-slate-200 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              <FcGoogle />
              Tiếp tục với Google
            </button>
          </form>
        </div>

        {/* BACK */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            ← Quay lại trang chủ
          </Link>
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