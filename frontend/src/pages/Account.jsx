import { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiPackage, FiKey, FiLogOut, FiEdit2, FiTrash2, FiPlus, FiMapPin, FiCalendar, FiPhone, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Account() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [profile, setProfile] = useState({
    ho: '',
    tendem: '',
    ten: '',
    sdt: '',
    ngaysinh: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      api.get('/profile').then(res => {
        const p = res.data.customer;
        setProfile({
          ho: p.ho || '',
          tendem: p.tendem || '',
          ten: p.ten || '',
          sdt: p.sdt || '',
          ngaysinh: p.ngaysinh ? p.ngaysinh.split(' ')[0] : ''
        });
        setAddresses(res.data.addresses || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.post('/profile/update', profile);
      toast.success('Cập nhật hồ sơ thành công');
    } catch (err) {
      toast.error('Lỗi cập nhật hồ sơ');
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await api.post(`/addresses/${editingAddress.dcgh_id}/update`, { diachi: newAddress });
        toast.success('Cập nhật địa chỉ thành công');
      } else {
        await api.post('/addresses/add', { diachi: newAddress });
        toast.success('Thêm địa chỉ mới thành công');
      }
      const res = await api.get('/profile');
      setAddresses(res.data.addresses);
      setShowAddressModal(false);
      setEditingAddress(null);
      setNewAddress('');
    } catch (err) {
      toast.error('Lỗi lưu địa chỉ');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
    try {
      await api.delete(`/addresses/${id}`);
      toast.success('Đã xóa địa chỉ');
      setAddresses(addresses.filter(a => a.dcgh_id !== id));
    } catch (err) {
      toast.error('Lỗi xóa địa chỉ');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 text-center bg-gray-50/50 border-b border-gray-50">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl shadow-green-100">
                {(profile.ho?.[0] || '') + (profile.ten?.[0] || '')}
              </div>
              <h2 className="font-black text-gray-900 italic text-xl">{profile.ho} {profile.tendem} {profile.ten}</h2>
              <p className="text-xs text-gray-400 font-bold italic mt-1">{user?.email}</p>
            </div>

            <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'info' ? 'bg-primary text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <FiUser className="text-lg" /> Thông tin tài khoản
              </button>
              <Link 
                to="/orders"
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3"><FiPackage className="text-lg" /> Đơn hàng của tôi</div>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">{addresses.length}</span>
              </Link>
              <button 
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'password' ? 'bg-primary text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <FiKey className="text-lg" /> Đổi mật khẩu
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all mt-4"
              >
                <FiLogOut className="text-lg" /> Đăng xuất
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          {activeTab === 'info' && (
            <div className="space-y-8">
              <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                  <h3 className="text-xl font-black text-gray-900 italic">Thông tin cá nhân</h3>
                </div>
                <div className="p-8 md:p-10">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Họ</label>
                        <input 
                          type="text" 
                          value={profile.ho} 
                          onChange={e => setProfile({...profile, ho: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                          placeholder="Họ"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tên đệm</label>
                        <input 
                          type="text" 
                          value={profile.tendem} 
                          onChange={e => setProfile({...profile, tendem: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                          placeholder="Tên đệm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tên</label>
                        <input 
                          type="text" 
                          value={profile.ten} 
                          onChange={e => setProfile({...profile, ten: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                          placeholder="Tên"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiPhone /> Số điện thoại</label>
                        <input 
                          type="tel" 
                          value={profile.sdt} 
                          onChange={e => setProfile({...profile, sdt: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                          placeholder="Số điện thoại"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCalendar /> Ngày sinh</label>
                        <input 
                          type="date" 
                          value={profile.ngaysinh} 
                          onChange={e => setProfile({...profile, ngaysinh: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold"
                        />
                      </div>
                    </div>

                    <button type="submit" className="bg-primary text-white font-black py-4 px-12 rounded-2xl shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-100 transition-all">
                      CẬP NHẬT HỒ SƠ
                    </button>
                  </form>
                </div>
              </section>

              <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-xl font-black text-gray-900 italic">Địa chỉ giao hàng</h3>
                  <button 
                    onClick={() => { setEditingAddress(null); setNewAddress(''); setShowAddressModal(true); }}
                    className="flex items-center gap-2 bg-primary/10 text-primary font-black py-2 px-4 rounded-xl hover:bg-primary hover:text-white transition-all text-xs"
                  >
                    <FiPlus /> THÊM MỚI
                  </button>
                </div>
                <div className="p-8">
                  {addresses.length === 0 ? (
                    <div className="py-12 text-center space-y-4">
                      <FiMapPin className="text-4xl text-gray-200 mx-auto" />
                      <p className="text-gray-400 font-bold italic">Chưa có địa chỉ giao hàng nào</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div key={addr.dcgh_id} className="p-6 rounded-3xl border-2 border-gray-50 hover:border-primary/20 transition-all group relative">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center text-lg group-hover:bg-primary group-hover:text-white transition-all">
                              <FiMapPin />
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => { setEditingAddress(addr); setNewAddress(addr.diachi); setShowAddressModal(true); }}
                                className="p-2 text-gray-400 hover:text-primary transition-colors"
                              ><FiEdit2 /></button>
                              <button 
                                onClick={() => handleDeleteAddress(addr.dcgh_id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              ><FiTrash2 /></button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 font-bold italic leading-relaxed line-clamp-2">{addr.diachi}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'password' && (
            <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-xl font-black text-gray-900 italic">Đổi mật khẩu</h3>
              </div>
              <div className="p-8 md:p-10">
                <form className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu hiện tại</label>
                    <input type="password" required className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Mật khẩu mới</label>
                    <input type="password" required className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Xác nhận mật khẩu mới</label>
                    <input type="password" required className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold" />
                  </div>
                  <button type="submit" className="bg-primary text-white font-black py-4 px-12 rounded-2xl shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-100 transition-all">
                    CẬP NHẬT MẬT KHẨU
                  </button>
                </form>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddressModal(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-modal-up">
            <h3 className="text-2xl font-black text-gray-900 italic mb-8">{editingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}</h3>
            <form onSubmit={handleSaveAddress} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Địa chỉ chi tiết</label>
                <textarea 
                  required 
                  rows="4"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold resize-none"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all"
                >HỦY</button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-100 transition-all"
                >LƯU ĐỊA CHỈ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
