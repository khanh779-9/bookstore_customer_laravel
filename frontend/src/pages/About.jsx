import {
  FiBookOpen,
  FiTruck,
  FiShield,
  FiHeart,
  FiMapPin,
  FiGlobe,
  FiTool,
  FiZap,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto px-4 space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center overflow-hidden bg-gray-900 mx-4 mt-4 rounded-[2rem] shadow-2xl group">
        <img
          src="/assets/images/about_background.png"
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Câu chuyện về <span className="text-primary">BookZone</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-semibold">
            "Khai nguồn hứng sáng tạo"
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-dark/20"
            >
              Khám Phá Sản Phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Mission */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
            Sứ mệnh của chúng tôi
          </div>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            Chào mừng đến với BookZone, nơi mỗi sản phẩm không chỉ là một công
            cụ mà còn là nguồn cảm hứng cho sự sáng tạo và học hỏi. Chúng tôi
            tin rằng những vật dụng nhỏ bé trên bàn làm việc có sức mạnh to lớn
            để biến ý tưởng thành hiện thực.
          </p>
          <div className="w-24 h-1 bg-gray-100 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            Hành Trình Của Chúng Tôi
          </h2>

          <div className="relative space-y-12 before:absolute before:left-6 md:before:left-1/2 before:top-2 before:bottom-2 before:w-1 before:bg-gray-100 before:-translate-x-1/2">
            {[
              {
                year: "2015",
                title: "Thành lập cửa hàng",
                desc: "Cửa hàng nhỏ đầu tiên ra đời từ niềm đam mê về giấy và bút, mang đến những sản phẩm được chọn lọc kĩ lưỡng cho cộng đồng địa phương.",
                icon: <FiBookOpen />,
              },
              {
                year: "2018",
                title: "Mở chi nhánh thứ hai",
                desc: "Mở rộng quy mô để phục vụ được nhiều khách hàng hơn, đồng thời giới thiệu thêm nhiều dòng sản phẩm sáng tạo và độc đáo.",
                icon: <FiMapPin />,
              },
              {
                year: "2020",
                title: "Ra mắt website bán hàng",
                desc: "Đưa BookZone lên không gian số, giúp khách hàng trên cả nước dễ dàng tiếp cận và mua sắm tiện lợi hơn.",
                icon: <FiGlobe />,
              },
              {
                year: "2022",
                title: "Sự kiện cộng đồng đầu tiên",
                desc: "Tổ chức workshop calligraphy, tạo sân chơi sáng tạo và kết nối những người có cùng đam mê, khẳng định vai trò gắn kết cộng đồng.",
                icon: <FiStar />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-green-100 -translate-x-1/2 z-10 border-4 border-white">
                  {item.icon}
                </div>
                <div
                  className={`flex-1 bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-all ${i % 2 === 0 ? "md:mr-16" : "md:ml-16"}`}
                >
                  <span className="text-primary font-bold text-2xl block mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-900 py-24 rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Nền tảng vững chắc cho mọi hoạt động tại BookZone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShield />,
                title: "Chất Lượng",
                desc: "Chúng tôi cam kết cung cấp những sản phẩm có chất lượng tối ưu, được lựa chọn kỹ lưỡng từ nhà sản xuất uy tín trong và ngoài nước.",
              },
              {
                icon: <FiZap />,
                title: "Sáng Tạo",
                desc: "Luôn tìm kiếm và cập nhật những sản phẩm độc đáo, khơi nguồn cảm hứng sáng tạo cho người dùng trong công việc và học tập.",
              },
              {
                icon: <FiHeart />,
                title: "Tận Tâm",
                desc: "Khách hàng là trọng tâm trong mọi hoạt động. Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn một cách nhiệt tình nhất.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg p-10 rounded-[2.5rem] border border-white/10 text-center group hover:bg-primary transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto mb-8 bg-primary/20 text-primary rounded-3xl flex items-center justify-center text-3xl group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-white/90 transition-colors font-light">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 text-center py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Sẵn sàng để sáng tạo cùng chúng tôi?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl">
            Khám phá bộ sưu tập sản phẩm đa dạng và tìm kiếm nguồn cảm hứng mới
            ngay hôm nay.
          </p>
          <div className="pt-6">
            <Link
              to="/products"
              className="inline-block bg-primary text-white font-black py-5 px-14 rounded-2xl hover:bg-green-500 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-100 text-lg tracking-tight"
            >
              XEM TẤT CẢ SẢN PHẨM
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
