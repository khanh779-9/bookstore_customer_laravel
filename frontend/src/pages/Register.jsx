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
import Input from "../components/Common/Input";
import TextArea from "../components/Common/TextArea";

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
    } catch (err) {
      showToast(err.response?.data?.message || "Lỗi đăng ký tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-none shadow-none p-6 md:p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-none bg-primary/10 flex items-center justify-center text-primary text-xl">
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
                icon={FiUser}
                placeholder="Họ"
                value={form.ho}
                onChange={(e) => handleChange("ho", e.target.value)}
              />
              <Input
                placeholder="Tên đệm"
                value={form.tendem}
                onChange={(e) => handleChange("tendem", e.target.value)}
              />
              <Input
                placeholder="Tên"
                value={form.ten}
                onChange={(e) => handleChange("ten", e.target.value)}
              />
            </div>

            {/* CONTACT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                icon={FiMail}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                icon={FiPhone}
                placeholder="Số điện thoại"
                value={form.sdt}
                onChange={(e) => handleChange("sdt", e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                icon={FiLock}
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="pr-12"
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-secondary transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                }
              />
              <Input
                icon={FiLock}
                type={showPassword ? "text" : "password"}
                placeholder="Xác nhận"
                value={form.password_confirmation}
                onChange={(e) =>
                  handleChange("password_confirmation", e.target.value)
                }
              />
            </div>

            {/* ADDRESS */}
            <TextArea
              rows="2"
              placeholder="Địa chỉ"
              value={form.diachi}
              onChange={(e) => handleChange("diachi", e.target.value)}
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-none font-semibold flex items-center justify-center gap-2 shadow-none hover:shadow-none  transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-none animate-spin" />
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


