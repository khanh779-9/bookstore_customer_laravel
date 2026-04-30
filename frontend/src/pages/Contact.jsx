import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Input from "../components/Common/Input";
import TextArea from "../components/Common/TextArea";
import Checkbox from "../components/Common/Checkbox";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Tin nhắn đã được gửi thành công!");
    setSubmitted(true);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
          Chúng tôi luôn sẵn lòng lắng nghe! Đừng ngần ngại liên hệ nếu bạn có
          bất kỳ câu hỏi hay góp ý nào.
        </p>
        <div className="w-24 h-2 bg-primary mx-auto rounded-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-10 shadow-none border border-gray-100 h-full">
            <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <span className="w-10 h-10 bg-primary/10 text-primary rounded-none flex items-center justify-center">
                <FiMapPin />
              </span>
              Thông tin cửa hàng
            </h2>

            <div className="space-y-8">
              <InfoItem icon={<FiMapPin />} title="Địa chỉ">
                180 Cao Lỗ, Quận 8, TP.HCM
              </InfoItem>

              <InfoItem icon={<FiPhone />} title="Điện thoại">
                <a
                  href="tel:0239482958"
                  className="hover:text-primary font-bold"
                >
                  (+84) 0239 482 958
                </a>
              </InfoItem>

              <InfoItem icon={<FiMail />} title="Email">
                <a
                  href="mailto:contact@bookzone.vn"
                  className="hover:text-primary font-bold"
                >
                  contact@bookzone.vn
                </a>
              </InfoItem>

              <InfoItem icon={<FiClock />} title="Giờ làm việc">
                Thứ Hai - Chủ Nhật: 8:00 - 22:00
              </InfoItem>
            </div>

            {/* Map */}
            <div className="mt-12 pt-12 border-t border-gray-100">
              <h3 className="font-black text-gray-900 mb-6 italic">
                Tìm chúng tôi trên bản đồ
              </h3>
              <div className="rounded-none overflow-hidden shadow-none aspect-video">
                <iframe
                  src="https://www.google.com/maps?q=Trường+Đại+Học+Công+Nghệ+Sài+Gòn&output=embed"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7">
          <div className="bg-white p-10 md:p-12 shadow-none border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-3">
              <FiSend className="text-primary" /> Gửi tin nhắn
            </h2>

            {submitted ? (
              <SuccessBlock onReset={() => setSubmitted(false)} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Họ và tên"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Nhập họ tên"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Số điện thoại"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0123 456 789"
                  />
                  <Input
                    label="Tiêu đề"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Hỏi về đơn hàng..."
                    required
                  />
                </div>

                <TextArea
                  label="Nội dung"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Nhập nội dung..."
                  required
                />

                <Checkbox
                  label="Tôi đồng ý để cửa hàng liên hệ lại."
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  required
                />

                <button className="w-full bg-primary text-white font-black py-5 rounded-none flex items-center justify-center gap-3 hover:scale-105 transition-all">
                  <FiSend /> GỬI NGAY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENT PHỤ */

function InfoItem({ icon, title, children }) {
  return (
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-gray-50 rounded-none flex items-center justify-center text-2xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm uppercase mb-1">
          {title}
        </h3>
        <div className="text-gray-500">{children}</div>
      </div>
    </div>
  );
}

function SuccessBlock({ onReset }) {
  return (
    <div className="py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-green-50 text-green-500 rounded-none flex items-center justify-center text-5xl mx-auto">
        <FiCheckCircle />
      </div>
      <h3 className="text-2xl font-bold">Gửi thành công!</h3>
      <p className="text-gray-500">
        Chúng tôi sẽ phản hồi bạn sớm nhất có thể.
      </p>
      <button
        onClick={onReset}
        className="bg-gray-900 text-white px-8 py-3 rounded-none"
      >
        Gửi lại
      </button>
    </div>
  );
}



