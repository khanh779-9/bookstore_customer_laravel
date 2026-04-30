import { FiShield } from 'react-icons/fi';

export default function PolicyBaoMat() {
  return (
    <div className="policy-page">
      <div className="page-header">
        <h1><FiShield /> Chính Sách Bảo Mật</h1>
      </div>
      <div className="policy-content section">
        <h3>1. Mục đích và phạm vi thu thập thông tin</h3>
        <p>
          BookZone không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu thập trên trang web cho một bên thứ ba nào khác.
          Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty.
          Khi bạn liên hệ đăng ký dịch vụ, thông tin cá nhân mà BookZone thu thập bao gồm: Họ và tên, Địa chỉ, Điện thoại, Email.
          Ngoài thông tin cá nhân là các thông tin về dịch vụ: Tên sản phẩm, Số lượng, Thời gian giao nhận sản phẩm.
        </p>
        
        <h3>2. Phạm vi sử dụng thông tin</h3>
        <p>
          Thông tin cá nhân thu thập được sẽ chỉ được BookZone sử dụng trong nội bộ công ty và cho một hoặc tất cả các mục đích sau đây:
          - Hỗ trợ khách hàng
          - Cung cấp thông tin liên quan đến dịch vụ
          - Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web của chúng tôi theo yêu cầu của bạn
        </p>

        <h3>3. Thời gian lưu trữ thông tin</h3>
        <p>
          Đối với thông tin cá nhân, BookZone chỉ xóa đi dữ liệu này nếu khách hàng có yêu cầu, khách hàng yêu cầu gửi mail về support@bookzone.vn.
        </p>

        <h3>4. Cam kết bảo mật thông tin cá nhân khách hàng</h3>
        <p>
          Tại BookZone, việc bảo vệ thông tin cá nhân của bạn là rất quan trọng, bạn được đảm bảo rằng thông tin cung cấp cho chúng tôi sẽ được mật.
          BookZone cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ người nào khác.
        </p>
      </div>
    </div>
  );
}



